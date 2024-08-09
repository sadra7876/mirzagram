import React from "react";

export default function MirzaMenuButton(props: {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode; // Optional icon prop
}) {
  return (
    <div
      onClick={() => props.onClick()}
      className="flex h-14 w-full flex-row items-center gap-x-4 text-nowrap rounded-3xl px-4 hover:bg-gray-400"
    >
      {props.icon && <div className="icon-container">{props.icon}</div>}
      <p className="text-base text-neutral-800">{props.title}</p>
    </div>
  );
}
