import React from "react";

export default function MirzaAuthLinks(props: {
  title: string;
  onClick: () => void;
  icon: string;
}) {
  return (
    <div dir="rtl" className="flex items-center gap-1 pb-5 text-xs leading-5">
      <img src={props.icon} className="object-covers bg-transparent"></img>
      <p onClick={() => props.onClick()} className="text-mirza-red text-sm">
        {props.title}
      </p>
    </div>
  );
}
