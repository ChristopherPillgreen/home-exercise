import { HoverMotion } from "../"
import {InputProps} from "../types";

interface AnimatedInputProps extends InputProps {
  additionalStyling?: string;
  placeholder?: string;
};

export default function AnimatedInput({
  voidChange,
  value,
  additionalStyling,
  placeholder,
}: AnimatedInputProps) {
  return (
    <HoverMotion>
      <input
        type="text"
        placeholder={placeholder}
        className={`h-full px-2 rounded-xl shadow-md hover:shadow-lg focus:outline-none text-sm ${additionalStyling}`}
        value={value}
        onChange={(e) => voidChange?.(e.target.value)}
      />
    </HoverMotion>
  );
}
