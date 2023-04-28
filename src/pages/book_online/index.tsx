import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import BookingForm from "~/components/booking/BookingForm";

export default function BookOnline() {
  const router = useRouter();
  return (
    <div>
      <div className="relative mb-3 mt-8 flex justify-between text-center">
        <FontAwesomeIcon
          icon={faArrowAltCircleLeft}
          className="ml-3 h-8 w-8 cursor-pointer text-primary hover:text-secondary"
          onClick={() => void router.back()}
        />
        <h1 className="m-auto text-xl font-semibold text-primary">
          Book a Session
        </h1>
      </div>
      <div className="px-12">
        <BookingForm />
      </div>
    </div>
  );
}
