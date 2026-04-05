import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newInvoice = {
      ...body,
      id: `inv_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('invoices')
      .insert(newInvoice)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ success: true, invoice: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Invalid payload" }, { status: 400 });
  }
}
