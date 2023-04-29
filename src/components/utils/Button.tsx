import React, { type PropsWithChildren } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "link"
  | "info"
  | "success"
  | "warning"
  | "error";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  glass?: boolean;
  loading?: boolean;
  outline?: boolean;
  size?: "lg" | "sm" | "xs";
  shape?: "square" | "circle";
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  onClick?: () => void;
};

export default function Button({
  className,
  children,
  disabled,
  glass,
  loading,
  outline,
  onClick,
  size,
  shape,
  type = "button",
  variant = "primary",
}: PropsWithChildren<ButtonProps>) {
  const shapeClass = shape ? ` btn-${shape} ` : "";
  const sizeClass = size ? `btn-${size} ` : "";
  const outlineClass = outline ? `btn-outline ` : "";
  const loadingState = loading ? `btn-loading ` : "";
  const glassClass = glass ? `btn-glass ` : "";

  return (
    <button
      type={type}
      className={`btn-${variant.toString()} btn-md btn gap-2 text-white ${
        className ?? ""
      }${shapeClass}${sizeClass}${outlineClass}${loadingState}${glassClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
