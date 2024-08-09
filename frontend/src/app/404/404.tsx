import TopImage from "../../assets/images/404-top.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <img src={TopImage} className="w-full object-contain" />
      </div>

      <div className="mt-5 flex w-1/3 flex-col items-center rounded-lg border px-4 py-16">
        <p className="text-center text-4xl font-bold text-mirza-green">
          !وای اینجا چه خبره؟
        </p>

        <div className="my-8 flex flex-col px-16">
          <div className="h-[70px]">
            <p className="text-center text-xl font-bold text-mirza-green">
              ظاهرا یک مشکلی وجود داره!
            </p>
          </div>
          <div className="h-[70px]">
            <p className="text-center text-base font-bold text-mirza-green">
              ما داریم تلاش می‌کنیم که برطرفش کنیم.لطفا چند دقیقه دیگه دوباره
              تلاش کن.
            </p>
          </div>
        </div>
        <MirzaButton
          title="بازگشت به صفحه قبلی"
          onClick={() => console.log("clickme")}
        />
      </div>
    </div>
  );
}
