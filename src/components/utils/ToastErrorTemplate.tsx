import { TRPCClientError, TRPCClientErrorLike } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import React from "react";

type Props = {
  message: string;
  code?: number | string;
  name?: string;
};

export default function ToastErrorTemplate({ name, code, message }: Props) {
  return (
    <>
      <h3 className="font-semibold text-error">
        Error - {name}
        {code}
      </h3>
      <p className="text-error">{message}</p>
    </>
  );
}
