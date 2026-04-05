import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = await createClient();
  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single();
  
  if (invoice) {
    return NextResponse.json({ invoice });
  }
  return NextResponse.json({ error: error?.message || "Invoice not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
     const body = await request.json();
     const supabase = await createClient();
     
     const { data, error } = await supabase
       .from('invoices')
       .update(body)
       .eq('id', id)
       .select()
       .single();
       
     if (error) throw error;
     
     return NextResponse.json({ success: true, invoice: data });
  } catch (error: any) {
     return NextResponse.json({ error: error.message || "Update Failed" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = await createClient();
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id);
    
  if (!error) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Delete failed" }, { status: 404 });
}
