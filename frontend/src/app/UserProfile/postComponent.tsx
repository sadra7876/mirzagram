import React, { useEffect, useState } from "react";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { Textarea, TextInput } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";

import { useForm } from "react-hook-form";
import { postUploadFile } from "./api/uploadFiles";
import { UploadFile } from "../../Shared/model/responseUpload.interface";
import { MirzaPost } from "../../Shared/model/post.interface";
import { postCreatePost } from "./api/createPost";
import { toast } from "../../Shared/Components/ToastComponent";
import { ImageFile } from "../../model/imageFile.interface";

const steps = [
  { id: 0, label: "عکس", filds: ["fileNames"] },
  { id: 1, label: "متن", filds: ["caption"] },
  { id: 2, label: "تنظیمات", filds: ["mentions"] },
];
interface PostValue {
  fileNames: string[];
  caption: string;
  mention: string[];
}
// Define the correct type for filds
type FieldType =
  | "fileNames"
  | "caption"
  | "mention"
  | `fileNames.${number}`
  | `mention.${number}`;

export default function PostComponent(props: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileNames, setFileNames] = useState<UploadFile[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [mentionInput, setMentionInput] = useState("");
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
  } = useForm<PostValue>();

  const next = async () => {
    const filds: FieldType[] = ["fileNames", "caption", "mention"];
    // const filds = steps[currentStep].filds;
    const output = await trigger(filds, { shouldFocus: true });
    if (!output) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    } else {
      handleSubmit(onSubmitCreatePost)();
    }
  };
  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    } else {
      props.onClose();
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    setIsLoading(true);
    if (!selectedFiles || selectedFiles.length === 0) {
      setFiles([]);
      return;
    }

    const newFiles: ImageFile[] = Array.from(selectedFiles).map((file) => ({
      file,
      previewUrl: file.type.match("image.*") ? URL.createObjectURL(file) : null,
    }));
    const formData = new FormData();
    formData.append("type", "post");
    for (let index = 0; index < selectedFiles.length; index++) {
      formData.append("file", selectedFiles[index]);
    }
    upload(formData).then(() => {
      setFiles(newFiles);
      setIsLoading(false);
    });
  };

  const upload = async (data: FormData) => {
    const response = await postUploadFile(data);
    if (response.isSuccess) {
      setFileNames(response.result);
    }
  };
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [files]);

  const onSubmitCreatePost = async (data: PostValue) => {
    const dataToSend: MirzaPost = {
      fileNames: fileNames ? fileNames.map((item) => item.fileName) : [],
      caption: data.caption,
      mentions: mentions,
    };

    const responseCreatePost = await postCreatePost(dataToSend);
    if (responseCreatePost.isSuccess) {
      responseCreatePost.messages.map((item: string) => toast.success(item));
      props.onClose();
    }
  };
  const handleMention = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMentionInput(value);

    if (value.endsWith(" ")) {
      const newMention = value.trim();
      if (newMention) {
        setMentions((prevMentions) => [...prevMentions, newMention]);
        setMentionInput("");
        setValue("mention", [""]); // Clear the input field in the form
      }
    }
  };
  const removeMention = (mentionToRemove: string) => {
    setMentions((prevMentions) =>
      prevMentions.filter((mention) => mention !== mentionToRemove),
    );
  };
  return (
    <div className="flex w-full flex-col justify-center px-[90px]">
      <ul className="relative flex flex-row gap-x-2">
        {steps.map((item) => {
          return (
            <li key={item.id} className="group flex-1 shrink basis-0">
              <div className="inline-flex min-h-7 w-full min-w-7 items-center align-middle text-xs">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${currentStep === item.id ? "border-black" : "border-mirza-dsiable"} bg-gray-100 font-medium text-gray-800 dark:bg-neutral-700 dark:text-white`}
                >
                  {currentStep <= item.id ? (
                    "."
                  ) : (
                    <FaCheckCircle className="size-7" />
                  )}
                </span>
                <div
                  className={`ms-2 h-px w-full flex-1 ${currentStep === item.id ? "bg-black" : "bg-gray-200"} group-last:hidden dark:bg-neutral-700`}
                ></div>
              </div>
              <div className="mt-3">
                <span
                  className={`block text-sm font-medium ${currentStep === item.id ? "text-black" : "text-mirza-dsiable"} dark:text-white`}
                >
                  {item.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleSubmit(onSubmitCreatePost)} className="mt-9">
        {currentStep === 0 && (
          <div className="flex flex-col items-center">
            <p> عکس هاس مورد نظرت رو آپلود کن:</p>
            <div className="flex flex-wrap gap-2">
              <label className="flex w-24 flex-col gap-y-2">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-mirza-orange">
                  <TbCameraPlus className="text-3xl text-mirza-orange" />
                </div>
                <p className="text-center font-medium text-mirza-black">عکس</p>
                <input
                  id="fileNames"
                  {...register("fileNames", {
                    required: "شما باید حداقل یک عکس انتخاب کنید",
                  })}
                  multiple
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                />
                {errors.fileNames && fileNames.length === 0 && (
                  <span className="w-48 text-center text-xs text-red-500">
                    {errors.fileNames.message}
                  </span>
                )}
              </label>

              {isLoading ? (
                <div className="flex h-28 w-28 items-center justify-center">
                  <div className="loader"></div>
                  {/* Add your loading spinner here */}
                </div>
              ) : (
                files.map((file) => {
                  return (
                    <div key={file.file.name} className="h-28 w-28 rounded-3xl">
                      <img
                        src={file.previewUrl || ""}
                        alt="Selected Image"
                        className="rounded-3xl object-contain"
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className="flex w-full flex-col items-center gap-y-3">
            <p>کپشن مورد نظرت روبنویس</p>
            <div className="flex w-full flex-row justify-between">
              <p>aa</p>
              <p>توضیحات</p>
            </div>

            <Textarea
              className="w-full text-right"
              id="caption"
              {...register("caption", {
                required: "کپشن وارد شود",
              })}
            />
            {errors.caption?.message && (
              <span className="text-xs text-red-500">
                {errors.caption.message}
              </span>
            )}
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex w-full flex-col items-center gap-y-3">
            <p>اینجا میتونی دوستات رو منشن کنی</p>
            <p className="text-xs">با یک فاصله ایدی دوستت اضافه میشه</p>
            <TextInput
              id="mention"
              className="w-full"
              value={mentionInput}
              {...register("mention")}
              onChange={handleMention}
            />
            <div className="flex flex-wrap gap-2">
              {mentions.map((mention, index) => (
                <div
                  key={index}
                  onClick={() => removeMention(mention)}
                  className="flex h-6 flex-row items-center justify-center rounded-full bg-blue-500 px-2 text-white"
                >
                  {mention}
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
      <div className="mt-6 flex flex-row gap-x-3">
        <MirzaButton
          onClick={() => prev()}
          title={currentStep > 0 ? "قبلی" : "بستن"}
        />
        <MirzaButton
          onClick={() => next()}
          title={currentStep < steps.length - 1 ? "بعدی" : "ثبت و انتشار پست"}
        />
      </div>
    </div>
  );
}
