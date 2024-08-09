import React from "react";

export default function MirzaButton(props: {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode; // Optional icon prop
}) {
  return (
    <div
      onClick={() => props.onClick()}
      className="flex h-9 max-w-full flex-row-reverse items-center justify-center gap-x-1 text-nowrap rounded-2xl bg-mirza-red px-4"
    >
      {props.icon && <div className="icon-container">{props.icon}</div>}
      <p className="text-sm text-white">{props.title}</p>
    </div>
  );
}
