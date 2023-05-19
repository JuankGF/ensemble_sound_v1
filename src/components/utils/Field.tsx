import React, { type PropsWithChildren } from "react";

export type FieldProps = {
  field: string;
  label: string;
  className?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  horizontal?: boolean;
};

export default function Field({
  field,
  label,
  error,
  touched,
  className,
  children,
  horizontal = true,
}: PropsWithChildren<FieldProps>) {
  return (
    <div
      className={`${
        horizontal ? "grid grid-cols-3" : "block"
      } items-center sm:mt-3 md:mt-4 ${className ?? ""}`}
    >
      <label
        htmlFor={field}
        className={`${
          horizontal ? "col-span-1" : "pl-1"
        } block self-start text-sm font-medium leading-6 text-gray-900`}
      >
        {label}
      </label>
      <div
        className={`${
          horizontal ? "col-span-2" : ""
        } form-control min-h-max flex-1 flex-grow`}
      >
        {children}
        {error && touched && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    </div>
  );
}
