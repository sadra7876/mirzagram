import React from "react";

export default function MirzaMenuButton(props: {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode; // Optional icon prop
}) {
  return (
    <div
      onClick={() => props.onClick()}
      className="flex size-6 h-14 w-full flex-row items-center gap-x-4 text-nowrap rounded-3xl px-4 py-4 hover:bg-gray-200"
    >
      {props.icon && <div className="icon-container size-6">{props.icon}</div>}
      <p className="text-base text-neutral-800">{props.title}</p>
    </div>
  );
}
