import { Formik } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import { useSession } from "next-auth/react";
import { ServiceType } from "@prisma/client";
import { format } from "date-fns";

import { Button, DateTimeInput, Field } from "../utils";
import { useScheduledDates } from "./hooks/useScheduledDates";
import { api } from "~/utils/api";

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  email: Yup.string().email().required("Email is a required field"),
  phone: Yup.string().optional(),
  booking_date: Yup.date()
    .required("Booking date is a required field")
    .min(format(new Date(), "yyyy-MM-dd hh:mm zz"), "Date must be after now"),
  type: Yup.string().optional(),
  description: Yup.string().required("Description is a required field"),
});

type FormProps = {
  initialValues?: {
    email: string;
    name: string;
    phone: string;
    booking_date: Date | null;
    type: string;
    description: string;
    address: string;
  };
};

export default function BookingForm({ initialValues }: FormProps) {
  const { data } = useSession();
  const { scheduledDates } = useScheduledDates();
  const {
    isLoading,
    mutateAsync: sendRequest,
    isError,
    isSuccess,
    error,
  } = api.mailer.sendRequest.useMutation();

  const { email, name } = data?.user ?? {};
  const defaultValues = {
    email: email ?? "",
    name: name ?? "",
    phone: "",
    booking_date: null,
    arrival_time: "",
    type: "",
    description: "",
    address: "",
  };

  const typeOptions = [
    { label: "Type", value: "" },
    { label: "Anniversary", value: "anniversary" },
    { label: "Birthday", value: "birthday" },
    { label: "Engagement", value: "engagement" },
    { label: "Live Event", value: ServiceType.LIVE_EVENT },
    { label: "Equipment Rental", value: ServiceType.RENTAL },
    { label: "Studio", value: ServiceType.STUDIO },
    { label: "Sound Test", value: ServiceType.SOUND_TEST },
  ];

  const inputClass =
    "input-bordered input input-sm w-full max-w-full px-2 py-1";

  return (
    <Formik
      initialValues={initialValues ?? defaultValues}
      validationSchema={BookingSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await sendRequest(values);
        if (isLoading) setSubmitting(true);
        if (isSuccess || isError) setSubmitting(false);
        /* TODO!: Show error Toast notifications */
        if (isError) console.log("Error: ", error);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        isValid,
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col px-2 py-5">
          <Field
            field="name"
            label="Name"
            className="mb-3"
            error={errors.name}
            touched={touched.name}
          >
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              className={`${inputClass} ${
                touched.name && errors.name ? "border-error" : ""
              }`}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </Field>
          <Field
            field="email"
            label="Email"
            className="mb-3"
            error={errors.email}
            touched={touched.email}
          >
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              className={`${inputClass} ${
                touched.email && errors.email ? "border-error" : ""
              }`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field
            field="phone"
            label="Phone"
            className="mb-3"
            error={errors.phone}
            touched={touched.phone}
          >
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              className={inputClass}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field
            field="booking_date"
            label="Booking Date"
            className="relative mb-3"
            error={errors.booking_date}
            touched={touched.booking_date}
          >
            <DateTimeInput
              id="booking_date"
              timePicker
              disablePastDates
              disabledDates={scheduledDates}
              className={
                touched.booking_date && errors.booking_date
                  ? "input-error"
                  : undefined
              }
              value={values.booking_date}
              onChange={(value: Date | null) => {
                setFieldTouched("booking_date");
                setFieldValue("booking_date", value);
              }}
              onBlur={() => setFieldTouched("booking_date")}
            />
          </Field>
          <Field
            field="type"
            label="Event type"
            className="mb-3"
            error={errors.type}
            touched={touched.type}
          >
            <CreatableSelect
              id="type"
              placeholder="Enter event type"
              isClearable
              value={typeOptions.find(
                (val) => val.value === initialValues?.type
              )}
              isDisabled={initialValues?.type !== undefined}
              onChange={(newVal) => setFieldValue("type", newVal?.value ?? "")}
              onBlur={handleBlur}
              options={typeOptions}
              styles={{
                control(base) {
                  return {
                    ...base,
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                  };
                },
              }}
            />
          </Field>
          <Field
            field="description"
            label="Description"
            className="mb-3"
            error={errors.description}
            touched={touched.description}
          >
            <textarea
              id="description"
              placeholder="Enter a description"
              className={`input-bordered input input-sm h-14 w-full max-w-full ${
                touched.description && errors.description ? "border-error" : ""
              }`}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={3}
            />
          </Field>

          <div className="mt-5 flex w-full justify-center">
            <Button
              type="submit"
              disabled={!isValid}
              className="mt-5"
              aria-label="On Click"
              loading={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
