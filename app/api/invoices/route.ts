import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { invoiceSchema, getZodErrorMessages } from "@/lib/schemas";

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

  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ invoices });
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
    const validated = invoiceSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: getZodErrorMessages(validated.error).join(', ') },
        { status: 400 }
      );
    }

    const newInvoice = {
      ...body,
      user_id: user.id,
      id: `inv_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const { data, error } = await supabase
      .from('invoices')
      .insert(newInvoice)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, invoice: data }, { status: 201 });
  } catch (error: any) {
    console.error("Invoice creation failed:", error);
    return NextResponse.json({ error: "An error occurred while creating the invoice. Please try again." }, { status: 500 });
  }
}
