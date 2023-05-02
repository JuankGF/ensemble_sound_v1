import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function LoadingView() {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="h-20 w-20 text-primary"
      />
    </div>
  );
}
