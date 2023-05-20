import {
  faCalendarDay,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { format } from "date-fns";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { toast } from "react-toastify";

import { api } from "~/utils/api";
import { LoadingView, ToastErrorTemplate } from "../utils";
import { useWindowSize } from "~/hooks/useWindowSize";

export default function EventsSection() {
  const { isMobile } = useWindowSize();
  const { data: upcomingEvents, isLoading } = api.events.getAllPublic.useQuery(
    undefined,
    {
      onError: (error) =>
        toast.error(
          <ToastErrorTemplate code={error.data?.code} message={error.message} />
        ),
    }
  );

  if (isLoading) return <LoadingView />;

  return upcomingEvents?.length === 0 ? (
    <></>
  ) : (
    <section
      id="events"
      className="xs:px-3 my-8 min-h-[12rem] w-full md:px-10 lg:px-16"
    >
      <div className="mb-8 flex w-full flex-col items-center px-3 text-center md:flex">
        <b className="flex-1 text-center text-2xl text-primary">
          Join us soon and enjoy the sound
        </b>
        <p>Assist to our public events and get fun with the music</p>
      </div>

      {upcomingEvents?.map(({ id, name, location, date, description }) => {
        const shortDate = format(date, "dd MMM");
        const formattedDate = format(date, "yyyy-MM-dd");
        const time = format(date, "HH:mm");
        return (
          <div
            key={id}
            className="mt-3 grid grid-flow-col grid-cols-3 items-center gap-3 border-b-2 border-secondary-content/10 px-2 py-2 last:border-none md:px-6"
          >
            <div>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="h-6 w-6 text-primary"
              />{" "}
              <span className="text-secondary-focus">{shortDate}</span>
              <p className="overflow-hidden text-ellipsis">{name}</p>
            </div>
            <div className="flex justify-center">
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className="h-6 w-6 text-primary"
              />{" "}
              {location}
            </div>
            <div className="flex justify-end">
              <AddToCalendarButton
                name={name}
                options={[
                  "Apple",
                  "Google",
                  "iCal",
                  "Microsoft365",
                  "MicrosoftTeams",
                  "Outlook.com",
                  "Yahoo",
                ]}
                location={location}
                startDate={formattedDate}
                endDate={formattedDate}
                startTime={time}
                endTime="23:59"
                timeZone="America/New_York"
                organizer="EduardoPerez|eddyensemble@gmail.com"
                hideTextLabelButton={isMobile}
                listStyle={isMobile ? "modal" : "dropdown"}
                hideCheckmark
                label="Add to Calendar"
                description={description}
                styleLight="--btn-background: #573065; --btn-text: #fff; --font: sans-serif;"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
