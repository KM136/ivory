import { Control, Controller } from "react-hook-form";
import Select, { SingleValue } from "react-select";

type Option = { value: string; label: string };

const Input = ({
  options,
  control,
}: {
  options: Option[];
  control: Control;
}) => {
  return (
    <Controller
      control={control}
      name="type"
      render={({ field: { value, onChange, ref } }) => (
        <Select
          ref={ref}
          value={options.find((el) => el.value === value)}
          onChange={(newValue: SingleValue<Option>) =>
            onChange(newValue?.value)
          }
          options={options}
        />
      )}
    />
  );
};

export default Input;
