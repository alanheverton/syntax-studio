import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user?.id)
    .order('createdAt', { ascending: false });

  const stats = {
      totalOrders: orders?.length || 0,
      pending: orders?.filter(o => o.status === "Pending").length || 0,
      inProgress: orders?.filter(o => o.status === "In Progress").length || 0,
  };

  return <DashboardClient initialData={{ orders: orders || [], stats }} />;
}
