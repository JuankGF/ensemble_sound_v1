import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const shapeClass = shape ? `btn-${shape} ` : "";
  const sizeClass = size ? ` btn-${size}` : "";
  const outlineClass = outline ? ` btn-outline` : "";
  const glassClass = glass ? ` btn-glass` : "";

  return (
    <button
      type={type}
      className={`btn btn-${variant.toString()} btn-md gap-2 text-white ${
        className ?? ""
      }${shapeClass}${sizeClass}${outlineClass}${glassClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {loading && (
        <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
      )}
    </button>
  );
}
