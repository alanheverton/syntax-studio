import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ clients });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newClient = {
      ...body,
      id: `cli_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('clients')
      .insert(newClient)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ success: true, client: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Invalid payload" }, { status: 400 });
  }
}
