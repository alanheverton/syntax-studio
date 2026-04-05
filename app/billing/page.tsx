import { createClient } from "@/utils/supabase/server";
import BillingPageClient from "./BillingPage";

export default async function BillingRoute() {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from('invoices')
    .select('*')
    .order('date', { ascending: false });

  return <BillingPageClient initialInvoices={invoices || []} />;
}
