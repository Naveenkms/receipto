"use client";

import React from "react";

export function ClientComponent() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <div>Client Component</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>Count: {count}</div>
    </>
  );
}
