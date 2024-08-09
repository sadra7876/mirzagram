import React from "react";
import { UseFormRegister } from "react-hook-form";

interface MirzaInputProps {
  name: string;
  register: UseFormRegister<any>;
  type?: string;
  placeholder?: string;
  inputIcon: string;
}
const MirzaInput: React.FC<MirzaInputProps> = ({
  name,
  register,
  type = "text",
  placeholder,
  inputIcon,
}) => {
  return (
    <div className="flex h-9 flex-row-reverse items-center gap-x-1 rounded-2xl bg-white px-3.5 text-right text-xs">
      <img src={inputIcon} className="h-4 w-4 object-cover"></img>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full text-right focus:outline-none"
      />
    </div>
  );
};
export default MirzaInput;
