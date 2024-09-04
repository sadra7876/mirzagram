import TopImage from "../../assets/images/404-top.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
export default function NotFoundPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="">
        <img src={TopImage} className="object-contain" />
      </div>
      <div className="mt-5 flex w-full flex-col items-center py-16 md:w-1/3 md:px-4">
        <p className="text-center text-4xl font-bold text-mirza-green">
          !وای اینجا چه خبره؟
        </p>
      </div>
      <div className="mx-2 flex w-3/4 flex-col items-center gap-y-8 md:my-8 md:px-16">
        <p className="text-center text-xl font-bold text-mirza-green">
          ظاهرا یک مشکلی وجود داره!
        </p>

        <p className="text-center text-base font-bold text-mirza-green">
          ما داریم تلاش می‌کنیم که برطرفش کنیم.لطفا چند دقیقه دیگه دوباره تلاش
          کن.
        </p>
        <div className="flex w-1/2 items-center justify-center">
          <MirzaButton
            title="بازگشت به صفحه قبلی"
            onClick={() => console.log("clickme")}
          />
        </div>
      </div>
    </div>
  );
}
