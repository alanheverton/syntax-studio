import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { clientUpdateSchema, getZodErrorMessages } from "@/lib/schemas";

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

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();
  
  if (client) {
    return NextResponse.json({ client });
  }
  return NextResponse.json({ error: error?.message || "Client not found" }, { status: 404 });
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
     const validated = clientUpdateSchema.safeParse(body);
     if (!validated.success) {
       return NextResponse.json(
         { error: getZodErrorMessages(validated.error).join(', ') },
         { status: 400 }
       );
     }

     const { data, error } = await supabase
       .from('clients')
       .update(body)
       .eq('id', id)
       .select()
       .single();

     if (error) throw error;

     return NextResponse.json({ success: true, client: data });
  } catch (error: any) {
     return NextResponse.json({ error: error.message || "Update Failed" }, { status: 400 });
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
    .from('clients')
    .delete()
    .eq('id', id);

  if (!error) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Delete failed" }, { status: 404 });
}
