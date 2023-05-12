import { api } from "~/utils/api";

const useScheduledDates = () => {
  const { data: events } = api.events.getAll.useQuery();
  const dates = events?.reduce((prev, event) => {
    return [...prev, event.date];
  }, [] as Date[]);

  return { scheduledDates: dates };
};

export { useScheduledDates };
