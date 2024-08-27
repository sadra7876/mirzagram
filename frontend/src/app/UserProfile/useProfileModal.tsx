import { useEffect, useState } from "react";
import MirzaInput from "../../Shared/Components/MirzaInput";
import { Controller, useForm } from "react-hook-form";
import UserIcon from "../../assets/images/Icons/user_icon.jpg";
import EmailIcon from "../../assets/images/Icons/gmail.jpg";
import KeyIcon from "../../assets/images/Icons/key.jpg";
import { ToggleSwitch, Label, Textarea } from "flowbite-react";
import { TbCameraPlus } from "react-icons/tb";
import { UploadFile } from "../../Shared/model/responseUpload.interface";
import { ImageFile } from "../../model/imageFile.interface";
import { UserProfileModel } from "../../model/userProfile.interface";
import { postUploadFile } from "./api/uploadFiles";
import { getProfile } from "./api/getProfile";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { putProfile } from "./api/editProfile";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
export default function UseProfileModal(props: {
  profile: UserProfileModel;
  onClose: () => void;
}) {
  const token = localStorage.getItem("token");
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileNames, setFileNames] = useState<UploadFile[]>([]);
  const [profilePicFile, setProfilePicFile] = useState<ImageFile>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<UserProfileModel>({
    defaultValues: {
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      email: props.profile.email,
      bio: props.profile.bio,
      isPrivate: props.profile.isPrivate,
    },
  });
  const editProfile = async (value: UserProfileModel) => {
    const profilePicture =
      fileNames.length > 0 && fileNames[0].fileName
        ? fileNames[0].fileName
        : props.profile.profilePicture;
    const dataToSend: UserProfileModel = {
      ...value,
      profilePicture,
    };
    const responseEditProfile = await putProfile(dataToSend);
    if (responseEditProfile) {
      props.onClose();
    }
  };

  const handleChangeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setLoadingFile(true);
    if (!selectedFile) {
      return;
    }

    setProfilePicFile({
      file: selectedFile,
      previewUrl: selectedFile.type.match("image.*")
        ? URL.createObjectURL(selectedFile)
        : null,
    });
    const formData = new FormData();
    formData.append("type", "profile");
    formData.append("file", selectedFile);
    upload(formData);
  };

  const upload = async (data: FormData) => {
    const response = await postUploadFile(data);
    if (response.isSuccess) {
      setFileNames(response.result);
    }
    setLoadingFile(false);
  };
  return (
    <form
      onSubmit={handleSubmit(editProfile)}
      className="flex flex-col items-center justify-center gap-y-6"
    >
      <div className="mb-8 mt-16">
        <p className="font-bold text-mirza-black">ویرایش حساب</p>
      </div>

      <div className="flex w-24 flex-col gap-y-2">
        <label className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-mirza-orange">
          {loadingFile ? (
            <p>loading..</p>
          ) : profilePicFile?.file ? (
            <img
              className="flex h-24 w-24 flex-col items-center justify-center rounded"
              src={profilePicFile.previewUrl ?? ""}
            />
          ) : (
            props.profile.profilePicture && (
              <img
                className="flex h-24 w-24 flex-col items-center justify-center rounded-full"
                src={props.profile.profilePicture}
              />
            )
          )}
          <>
            <TbCameraPlus className="text-3xl text-mirza-orange" />
            <input
              id=""
              {...register("profilePicture")}
              type="file"
              onChange={handleChangeUpload}
              className="hidden"
            />
          </>
        </label>
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
        placeholder={"ایمیل"}
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
              checked={value ?? false}
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
          className="text-right"
          id="comment"
          {...register("bio")}
          placeholder=""
          rows={4}
        />
      </div>
      <div className="flex w-full flex-row gap-x-5">
        <MirzaButton type="submit" title="ثبت تغییرات" />
        <button type="button" onClick={() => props.onClose()}>
          پشیمون شدم
        </button>
      </div>
    </form>
  );
}
