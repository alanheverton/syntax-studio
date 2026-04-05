import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ 
    orders,
    stats: {
      totalOrders: orders.length,
      pending: orders.filter(o => o.status === "Pending").length,
      inProgress: orders.filter(o => o.status === "In Progress").length,
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = {
      ...body,
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('orders')
      .insert(newOrder)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ success: true, order: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Invalid payload" }, { status: 400 });
  }
}
