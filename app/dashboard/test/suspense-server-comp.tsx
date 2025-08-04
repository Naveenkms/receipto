import { ClientComponent } from "./client-component";
import { createClient } from "@/lib/supabase/server";

export default async function SuspenseServerCompCont() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  console.log("awaited 4 seconds");
  return (
    <>
      <h1>Suspensed Server Component</h1>
      <pre>{JSON.stringify(instruments, null, 2)}</pre>

      <ClientComponent />
    </>
  );
}
