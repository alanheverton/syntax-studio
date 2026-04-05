import { createClient } from "@/utils/supabase/server";
import OrdersPageClient from "./OrdersPage";

export default async function OrdersRoute() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('createdAt', { ascending: false });

  return <OrdersPageClient initialOrders={orders || []} />;
}
