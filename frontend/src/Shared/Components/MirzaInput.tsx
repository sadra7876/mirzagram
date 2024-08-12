import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface MirzaInputProps {
  name?: string;
  register: UseFormRegisterReturn<any>;
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
    <div className="mb-2 flex h-9 w-full flex-row items-center gap-x-1 rounded-2xl bg-white px-3.5 text-right text-xs">
      <img src={inputIcon} className="h-4 w-4 object-cover"></img>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full text-right focus:outline-none"
      />
    </div>
  );
};
export default MirzaInput;
