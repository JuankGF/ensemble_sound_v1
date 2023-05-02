import { format } from "date-fns";
import { Formik } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { useSession } from "next-auth/react";
import { ServiceType } from "@prisma/client";

import { Button, Field } from "../utils";

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  email: Yup.string().email().required("Email is a required field"),
  phone: Yup.string().optional(),
  booking_date: Yup.string().required("Booking date is a required field"),
  arrival_time: Yup.string().required("Time is a required field"),
  type: Yup.string().optional(),
  description: Yup.string().required("Description is a required field"),
});

type FormProps = {
  initialValues?: {
    email: string;
    name: string;
    phone: string;
    booking_date: string;
    arrival_time: string;
    type: string;
    description: string;
  };
};

export default function BookingForm({ initialValues }: FormProps) {
  const { data } = useSession();

  const { email, name } = data?.user ?? {};
  const defaultValues = {
    email: email ?? "",
    name: name ?? "",
    phone: "",
    booking_date: "",
    arrival_time: "",
    type: "",
    description: "",
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

  return (
    <Formik
      initialValues={initialValues ?? defaultValues}
      validationSchema={BookingSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 1000);
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
              className="input-bordered input input-sm w-full max-w-full"
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
              className="input-bordered input input-sm w-full max-w-full"
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
              className="input-bordered input input-sm w-full max-w-full"
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
            <input
              id="booking_date"
              type="date"
              placeholder="Enter date"
              className="input-bordered input input-sm w-full max-w-full"
              value={values.booking_date}
              onChange={handleChange}
              onBlur={handleBlur}
              min={format(new Date(), "yyyy-MM-dd")}
            />
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="absolute right-2.5 top-2.5 h-3 w-3 text-xs"
            />
          </Field>
          <Field
            field="arrival_time"
            label="Booking Time"
            className="mb-3"
            error={errors.arrival_time}
            touched={touched.arrival_time}
          >
            <Select
              id="arrival_time"
              placeholder="Enter booking time"
              isDisabled={values?.booking_date === undefined}
              isClearable
              onChange={(newVal) => {
                setFieldValue("arrival_time", newVal?.value);
              }}
              onBlur={handleBlur}
              options={[{ label: "10:00 PM", value: "22:00" }]}
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
              className="input-bordered input input-sm h-14 w-full max-w-full"
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
              disabled={isSubmitting || !isValid}
              className="mt-5"
              aria-label="On Click"
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
