export default function MirzaAuthLinks(props: {
  title: string;
  onClick: () => void;
  icon: string;
}) {
  return (
    <div
      dir="rtl"
      className="flex cursor-pointer items-center gap-1 pb-5 text-xs leading-5"
    >
      <img src={props.icon} className="object-covers bg-transparent"></img>
      <p onClick={() => props.onClick()} className="text-sm text-mirza-red">
        {props.title}
      </p>
    </div>
  );
}
