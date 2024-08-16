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
export default function UserProfile() {
  const [openModal, setOpenModal] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<FromValueProfile>();
  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <p className="font-bold text-mirza-black"> صفحه من</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <div className="h-[130px] w-[130px] rounded-full">
            <img
              src={picProfile}
              alt="pic profile"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="text-sm font-normal text-mirza-gold">@mahmz</p>
            <p className="text-xl font-bold text-mirza-black">مهشید منزه</p>
            <div className="flex flex-row items-center divide-x-2 divide-x-reverse border-mirza-black">
              <p className="px-2 text-sm font-normal text-mirza-orange">
                ۱۳ دنبال‌کننده
              </p>
              <p className="px-2 text-sm font-normal text-mirza-orange">
                ۷ دنبال‌شونده
              </p>
              <p className="px-2 text-sm font-normal text-mirza-black">
                19 پست
              </p>
            </div>
            <p>Lover, not a fighter, spreading ✌️all over the 🌎</p>
          </div>
        </div>
        <MirzaButton
          onClick={() => setOpenModal(true)}
          title="ویرایش پروفایل"
        />
      </div>
      <hr className="w-ful mb-8 mt-6 border" />
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
    </div>
  );
}
