import { ToggleSwitch } from "flowbite-react";
import { UseControllerProps, Controller } from "react-hook-form";

type FormValues = {
  inputName: string;
};

function MirzaToggle(props: UseControllerProps<FormValues>) {
  //   const { field: checkbox, fieldState } = useController(props);

  return (
    <Controller
      // control={control}
      name={props.name}
      render={({ field: { value, onChange } }) => (
        <ToggleSwitch
          checked={value}
          onChange={onChange}
          label="پیج خصوصی باشه"
        />
      )}
    />
    // <div>
    //   <input {...checkbox} placeholder={props.name} />
    //   {/* <p>{fieldState.isTouched && "Touched"}</p>
    //   <p>{fieldState.isDirty && "Dirty"}</p>
    //   <p>{fieldState.invalid ? "invalid" : "valid"}</p> */}
    // </div>
  );
}

export default MirzaToggle;
