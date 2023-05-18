import { Formik } from "formik";
import React, { type ReactNode } from "react";
import * as Yup from "yup";

import { Field, RatingInput } from "../utils";
import { type SubmitProps } from "./TestimonialModal";

type FormProps = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  submitTrigger: ReactNode;
  onSubmit: (values: SubmitProps) => void;
};

const schema = Yup.object().shape({
  opinion: Yup.string().required("Opinion is a required field"),
  rating: Yup.number()
    .min(1)
    .max(5)
    .required("Don't forget to rate us")
    .nullable(),
});

export default function TestimonialForm({
  name,
  email,
  image,
  submitTrigger,
  onSubmit,
}: FormProps) {
  const defaultValues = { opinion: "", rating: 5 };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        onSubmit({
          ...values,
          authorEmail: email ?? "",
          authorName: name ?? "",
          authorImage: image ?? undefined,
        });
        resetForm();
      }}
      enableReinitialize
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
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col px-2 pt-8">
          <RatingInput
            value={values.rating}
            onBlur={() => setFieldTouched("rating")}
            onChange={(val) => {
              setFieldValue("rating", val);
              setFieldTouched("rating");
            }}
            error={touched.rating && errors.rating}
          />
          <Field
            field="opinion"
            label="Opinion"
            className="mb-3"
            error={errors.opinion}
            touched={touched.opinion}
            horizontal={false}
          >
            <textarea
              id="opinion"
              placeholder="Share your thoughts"
              className={`input-bordered input input-sm h-20 w-full max-w-full ${
                touched.opinion && errors.opinion ? "border-error" : ""
              }`}
              value={values.opinion}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={3}
              disabled={isSubmitting}
            />
          </Field>
          {submitTrigger}
        </form>
      )}
    </Formik>
  );
}
