import { useState } from "react";
import picProfile from "../../assets/images/picture_profile.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { Modal } from "flowbite-react";
import MirzaInput from "../../Shared/Components/MirzaInput";
import { Controller, useForm } from "react-hook-form";
import UserIcon from "../../assets/images/Icons/user_icon.jpg";
import EmailIcon from "../../assets/images/Icons/gmail.jpg";
import KeyIcon from "../../assets/images/Icons/key.jpg";
import { ToggleSwitch, Label, Textarea } from "flowbite-react";

interface FromValueProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isPrivate: boolean;
  bio: string;
}
import rahnemaLogo from "../../assets/images/rahnema-college-logo-fars1.png";

import profilePicture from "../../assets/images/Icons/picture frame.svg";
import PostComponent from "./postComponent";

export default function UserProfile() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalPost, setOpenModalPost] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<FromValueProfile>();
  return (
    <div className="px-78 flex h-full w-full flex-col gap-6">
      <div>
        <div className="flex pb-8">صفحه من</div>
        <div className="grid grid-cols-3 items-center gap-8 md:grid-cols-[0.5fr_2fr_1fr]">
          <div className="h-[8.33rem] w-[8.33rem]">
            <img src={profilePicture} className="rounded-full"></img>
          </div>
          <div
            dir="rtl"
            className="flex h-full w-full flex-col items-start gap-y-4"
          >
            <p className="font-normal text-mirza-gold">mahmz@</p>
            <p className="text-xl font-bold">مهشید منزه</p>
            <div className="flex flex-row gap-x-3">
              <p className="text-sm font-normal text-mirza-orange">
                12 دنبال کننده
              </p>
              <span className="text-gray-400">|</span>
              <p className="text-mirza-orange">7دنبال شونده</p>
              <span className="text-gray-400">|</span>
              <p>19 پست</p>
            </div>
            <div dir="ltr">
              Lover, not a fighter, spreading ✌️all over the 🌎
            </div>
          </div>
          <MirzaButton
            title="ویرایش پروفایل"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>

      <div className="h-full w-full flex-col gap-8 rounded-3xl border-2 text-sm font-normal">
        <div className="flex flex-col items-center gap-y-8 px-[298px] py-[222px] text-center">
          {" "}
          هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
          <MirzaButton
            onClick={() => setOpenModalPost(true)}
            className="gap-y-8"
            title="ایجاد پست جدید"
          ></MirzaButton>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="bg-neutral-100 px-[90px]">
          <form
            onSubmit={handleSubmit((data) => console.log("first", data))}
            className="flex flex-col items-center justify-center gap-y-6"
          >
            <div className="mb-8 mt-16">
              <p className="font-bold text-mirza-black">ویرایش حساب</p>
            </div>

            <div className="flex w-24 flex-col gap-y-2">
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-mirza-orange">
                <p>aa</p>
              </div>
              <p className="font-medium text-mirza-black">عکس پروفایل</p>
            </div>
            <MirzaInput
              name="firstName"
              placeholder="نام"
              inputIcon={UserIcon}
              register={register("firstName")}
            />
            <MirzaInput
              name="lastName"
              placeholder="نام خانوادگی"
              inputIcon={UserIcon}
              register={register("lastName")}
            />
            <MirzaInput
              name="email"
              placeholder="ایمیل"
              inputIcon={EmailIcon}
              register={register("email")}
            />
            <MirzaInput
              inputIcon={KeyIcon}
              name="password"
              placeholder="رمز عبور"
              type="password"
              register={register("password")}
            />
            <MirzaInput
              inputIcon={KeyIcon}
              name="confirmPassword"
              placeholder="تکرار رمز عبور"
              type="password"
              register={register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === watch("password") || "رمز عبور مطابقت ندارد",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
            <Controller
              control={control}
              defaultValue={false}
              name="isPrivate"
              render={({ field: { value, onChange } }) => (
                <div className="flex w-full flex-row justify-end gap-x-3">
                  <p>پیج خصوصی باشه</p>
                  <ToggleSwitch
                    className=""
                    checked={value}
                    onChange={onChange}
                  />
                </div>
              )}
            />
            <div className="flex w-full flex-col items-end">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="بایو" />
              </div>
              <Textarea
                id="comment"
                {...register("bio")}
                placeholder=""
                rows={4}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-neutral-100">
          <MirzaButton type="submit" title="ثبت تغییرات" />
          <button onClick={() => setOpenModal(false)}>پشیمون شدم</button>
        </Modal.Footer>
      </Modal>
      <Modal show={openModalPost} onClose={() => setOpenModalPost(false)}>
        <Modal.Body>
          <PostComponent />
        </Modal.Body>
      </Modal>
    </div>
  );
}
