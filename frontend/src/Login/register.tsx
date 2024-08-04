import React, { useState } from "react";

export default function RegisterPage() {
  const [login, setLogin] = useState<Boolean>(true);
  return (
    <div className="bg-background-auth w-full h-screen bg-cover flex flex-col justify-center items-center">
      <div className="flex flex-col rounded-3xl bg-neutral-100 w-1/3 h-3/4"></div>
    </div>
  );
}
