import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

import BookingForm from "~/components/booking/BookingForm";
import { LoadingView } from "~/components/utils";
import { api } from "~/utils/api";

export default function BookService() {
  const router = useRouter();
  const { serviceId } = router.query;
  const { data: session } = useSession();
  const { data, isLoading } = api.services.getById.useQuery({
    id: serviceId as string,
  });

  if (isLoading) return <LoadingView />;

  return (
    <div className="min-h-screen">
      <div className="relative mb-3 mt-8 flex justify-between text-center">
        <FontAwesomeIcon
          icon={faArrowAltCircleLeft}
          className="ml-3 h-8 w-8 cursor-pointer text-primary hover:text-secondary"
          onClick={() => void router.back()}
        />
        <h1 className="m-auto text-xl font-semibold text-primary">
          Booking {data?.name}
        </h1>
      </div>
      <div className="px-12">
        <BookingForm
          initialValues={{
            arrival_time: "",
            booking_date: "",
            description: data?.description ?? "",
            type: data?.type ?? "",
            email: session?.user.email ?? "",
            phone: "",
            name: session?.user.name ?? "",
          }}
        />
      </div>
    </div>
  );
}
