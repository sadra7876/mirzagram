import React from "react";

export default function MirzaButton(props: {
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={() => props.onClick()}
      className="bg-mirza-red flex h-9 max-w-min flex-col items-center justify-center text-nowrap rounded-2xl px-4"
    >
      <p className="text-sm text-white">{props.title}</p>
    </div>
  );
}
