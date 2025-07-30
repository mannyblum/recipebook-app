import { XIcon } from '@primer/octicons-react';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  autoFocus?: boolean;
  onChange: (val: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TextField = ({
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
  ...rest
}: TextFieldProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown && e.key === 'Enter') {
      onKeyDown(e);
    }
  };

  const handleClearInput = () => {
    onChange('');
  };

  return (
    <div className=" py-2 w-full flex flex-col items-start">
      {label && (
        <label htmlFor={placeholder} className="text-sm py-1">
          {label}
        </label>
      )}
      <div id="input-wrapper" className="w-full relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={({ target: { value } }) => onChange(value)}
          className="border-2 border-black w-full rounded-md py-4 md:py-2 px-4 focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden bg-white"
          {...rest}
        />
        {value.length > 0 && (
          <div
            onClick={handleClearInput}
            className="z-10 absolute sm:top-4 md:top-2 right-4 p-1 flex items-center justify-center bg-red-400 active:bg-red-500 hover:bg-red-500 border-2 rounded-full cursor-pointer"
          >
            <XIcon size={16} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextField;
