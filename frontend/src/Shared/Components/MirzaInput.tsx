import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactHTMLElement,
} from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons";

interface MirzaInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  register?: UseFormRegisterReturn<any>;
  type?: string;
  placeholder?: string;
  inputIcon?: string;
  options?: RegisterOptions<any, string>;
}
const MirzaInput: React.FC<MirzaInputProps> = ({
  register,
  type = "text",
  placeholder,
  inputIcon,
}) => {
  return (
    <div
      dir="ltr"
      className="mb-2 flex h-9 w-full flex-row items-center rounded-2xl border bg-white px-3.5 text-right text-xs"
    >
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full border-none bg-transparent text-right focus:border-transparent focus:outline-none focus:ring-0"
      />
      <img src={inputIcon} className="h-4 w-4 object-cover" />
    </div>
  );
};
export default MirzaInput;
