import React, { ButtonHTMLAttributes } from "react";

interface MirzaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // You can add additional custom props here if needed
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function MirzaButton(props: MirzaButtonProps) {
  const { icon, title, className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`${className} flex items-center justify-center rounded-full bg-red-400 px-6 py-2 text-white hover:bg-red-500`}
    >
      {icon && <div className="icon-container">{icon}</div>}
      <p className="text-sm text-white">{title}</p>
    </button>
  );
}
