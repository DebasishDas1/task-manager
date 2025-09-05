import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  type: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField = ({
  type,
  placeholder,
  registration,
  error,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        className="border-2 border-gray-300 p-2 rounded-lg"
        {...registration}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
