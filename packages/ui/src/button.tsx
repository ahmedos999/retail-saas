import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-secondary text-white hover:opacity-90",
  secondary: "bg-white text-secondary border border-secondary hover:opacity-90",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md transition-opacity cursor-pointer ${variantStyles[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
