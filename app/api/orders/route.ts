import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { orderSchema, getZodErrorMessages } from "@/lib/schemas";

async function requireAuth(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  return user;
}

export async function GET() {
  const supabase = await createClient();
  const user = await requireAuth(supabase);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
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
  const supabase = await createClient();
  const user = await requireAuth(supabase);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate input against schema
    const validated = orderSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: getZodErrorMessages(validated.error).join(', ') },
        { status: 400 }
      );
    }

    const newOrder = {
      ...body,
      user_id: user.id,
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(newOrder)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, order: data }, { status: 201 });
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json({ error: "An error occurred while creating the order. Please try again." }, { status: 500 });
  }
}
