import { createClient } from "@/utils/supabase/server";
import TimersPageClient from "./TimersPage";

export default async function TimersRoute() {
  const supabase = await createClient();
  const { data: timers } = await supabase
    .from('timers')
    .select('*')
    .order('createdAt', { ascending: false });

  return <TimersPageClient initialTimers={timers || []} />;
}
