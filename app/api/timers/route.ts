import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { timerSchema, getZodErrorMessages } from "@/lib/schemas";

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

  const { data: timers, error } = await supabase
    .from('timers')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ timers });
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
    const validated = timerSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: getZodErrorMessages(validated.error).join(', ') },
        { status: 400 }
      );
    }

    const newTimer = {
      ...body,
      id: `tim_${Date.now()}`,
      time: "00:00:00",
      seconds: 0,
      status: "Running",
      createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('timers')
      .insert(newTimer)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, timer: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Invalid payload" }, { status: 400 });
  }
}
