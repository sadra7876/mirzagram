import React from "react";

export default function MirzaButton(props: { title: string }) {
  return (
    <div className="bg-mirza-red flex h-9 min-w-max flex-col items-center justify-center text-nowrap rounded-2xl px-4">
      <p className="text-sm text-white">{props.title}</p>
    </div>
  );
}
