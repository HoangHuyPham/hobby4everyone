import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioButtonProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600 hover:text-gray-800">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
