import React from "react";

import keyIcon from "../../../assets/images/Icons/key.jpg";
import GmailIcon from "../../../assets/images/Icons/gmail.jpg";
import Vector from "../../../assets/images/Icons/Vector.jpg";
import MirzaInput from "../../../Shared/Components/MirzaInput";
import MirzaButton from "../../../Shared/Components/MirzaButton";
import { useForm, SubmitHandler } from "react-hook-form";
interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mr-0 w-full content-center py-6"
    >
      <p
        dir="rtl"
        className="w-400 leading-24px text-right text-sm text-amber-950"
      >
        برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید:
      </p>
      <div className="flex flex-col justify-center gap-y-6 py-8">
        <MirzaInput
          name="username"
          register={register}
          placeholder="نام کاربری"
          inputIcon={Vector}
        />
        <MirzaInput
          name="email"
          register={register}
          placeholder="ایمیل"
          inputIcon={GmailIcon}
        />
        <MirzaInput
          type="password"
          name="password"
          register={register}
          placeholder="رمز عبور"
          inputIcon={keyIcon}
        />
        {errors.password && <span>رمز عبور الزامی است</span>}
        <MirzaInput
          type="password"
          name="confirmPassword"
          register={register}
          placeholder="تکرار رمز عبور"
          inputIcon={keyIcon}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>
      <MirzaButton title="ثبت نام " icon="" />
    </form>
  );
}
