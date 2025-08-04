import { Suspense } from "react";
import ServerServerCompCont from "./server-comp-cont";
import SuspenseServerCompCont from "./suspense-server-comp";

export const dynamic = "force-dynamic";

export default async function Instruments() {
  return (
    <>
      <h1>test page</h1>
      {/* <ServerServerCompCont /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <SuspenseServerCompCont />
      </Suspense>
    </>
  );
}
