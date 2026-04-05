import { createClient } from "@/utils/supabase/server";
import ClientPage from "./ClientPage";

export default async function ClientsRoute() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('createdAt', { ascending: false });

  // Render the interactive component, instantly hydrating with the Supabase arrays
  return <ClientPage initialClients={clients || []} />;
}
