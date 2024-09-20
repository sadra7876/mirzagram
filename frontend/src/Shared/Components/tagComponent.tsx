import React from "react";

import { RxCross2 } from "react-icons/rx";

export default function TagComponent({ title }: { title: string }) {
  return (
    <div className="flex w-20 items-center justify-between rounded-xl border border-red-500 px-2">
      <RxCross2 className="text-red-500" />
      <p className="truncate text-red-500">{title}</p>
    </div>
  );
}
