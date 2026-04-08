import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { orderUpdateSchema, getZodErrorMessages } from "@/lib/schemas";

async function requireAuth(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  return user;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const user = await requireAuth(supabase);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();
  
  if (order) {
    return NextResponse.json({ order });
  }
  return NextResponse.json({ error: error?.message || "Order not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const user = await requireAuth(supabase);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
     const body = await request.json();

     // Validate input against schema
     const validated = orderUpdateSchema.safeParse(body);
     if (!validated.success) {
       return NextResponse.json(
         { error: getZodErrorMessages(validated.error).join(', ') },
         { status: 400 }
       );
     }

     const { data, error } = await supabase
       .from('orders')
       .update(body)
       .eq('id', id)
       .eq('user_id', user.id)
       .select()
       .single();

     if (error) throw error;

     return NextResponse.json({ success: true, order: data });
  } catch (error: any) {
     console.error("Order update failed:", error);
     return NextResponse.json({ error: "An error occurred while updating the order. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const user = await requireAuth(supabase);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (!error) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Delete failed" }, { status: 404 });
}
