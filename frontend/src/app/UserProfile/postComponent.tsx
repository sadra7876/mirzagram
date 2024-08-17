import React, { useEffect, useState } from "react";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { Textarea, TextInput } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";

interface ImageFile {
  file: File;
  previewUrl: string | null;
}

const steps = [
  { id: 0, label: "عکس" },
  { id: 1, label: "متن" },
  { id: 2, label: "تنظیمات" },
];
export default function PostComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<ImageFile[]>([]);
  const { handleSubmit, register } = useForm();

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };
  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      setFiles([]);
      return;
    }

    const newFiles: ImageFile[] = Array.from(selectedFiles).map((file) => ({
      file,
      previewUrl: file.type.match("image.*") ? URL.createObjectURL(file) : null,
    }));

    setFiles(newFiles);
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

      <form className="mt-9">
        {currentStep === 0 && (
          <div className="flex flex-col items-center">
            <p> عکس هاس مورد نظرت رو آپلود کن:</p>
            <div className="flex flex-wrap gap-2">
              <label className="flex w-24 flex-col gap-y-2">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-mirza-orange">
                  <p>aa</p>
                </div>
                <p className="font-medium text-mirza-black">عکس پروفایل</p>
                <input
                  multiple
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>

              {files.map((file) => {
                return (
                  <div key={file.file.name} className="h-28 w-28 rounded-3xl">
                    <img
                      src={file.previewUrl || ""}
                      alt="Selected Image"
                      className="rounded-3xl object-contain"
                    />
                  </div>
                );
              })}
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
            <Textarea />
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex w-full flex-col items-center gap-y-3">
            <p>اینجا میتونی دوستات رو منشن کنی</p>
            <TextInput className="w-full" />
          </div>
        )}
      </form>
      <div className="mt-6 flex flex-row gap-x-3">
        <MirzaButton
          onClick={() => next()}
          title={currentStep < steps.length - 1 ? "بعدی" : "ثبت و انتشار پست"}
        />
        <button>پشیمون شدم</button>
      </div>
    </div>
  );
}
