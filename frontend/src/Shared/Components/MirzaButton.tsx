import React, { ButtonHTMLAttributes } from "react";

interface MirzaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // You can add additional custom props here if needed
  title: string;
  icon?: React.ReactNode;
}

export default function MirzaButton(props: MirzaButtonProps) {
  return (
    <button
      {...props}
      className="flex h-9 max-w-min flex-col items-center justify-center text-nowrap rounded-2xl bg-mirza-red px-4"
    >
      {props.icon && <div className="icon-container">{props.icon}</div>}
      <p className="text-sm text-white">{props.title}</p>
    </button>
  );
}
