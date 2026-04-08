import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { clientSchema, getZodErrorMessages } from "@/lib/schemas";

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

  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('createdAt', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ clients });
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
    const validated = clientSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: getZodErrorMessages(validated.error).join(', ') },
        { status: 400 }
      );
    }

    const newClient = {
      ...body,
      user_id: user.id,
      id: `cli_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('clients')
      .insert(newClient)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, client: data }, { status: 201 });
  } catch (error: any) {
    console.error("Client creation failed:", error);
    return NextResponse.json({ error: "An error occurred while creating the client. Please try again." }, { status: 500 });
  }
}
