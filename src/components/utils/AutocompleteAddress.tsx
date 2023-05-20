import { useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Props = {
  fieldName: string;
  className?: string;
};

const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

export default function AutocompleteAddress({ fieldName, className }: Props) {
  const { setFieldValue } = useFormikContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "name"],
      types: ["address"],
    };

    const loader = new Loader({
      apiKey: GOOGLE_MAP_KEY as string,
      version: "weekly",
      libraries: ["places"],
      id: "google_places",
      ...options,
    });

    void loader
      .load()
      .then(async (google) => {
        const { Autocomplete } = (await google.maps.importLibrary(
          "places"
        )) as google.maps.PlacesLibrary;
        const autoComplete = new Autocomplete(
          inputRef.current as HTMLInputElement,
          options
        );

        autoComplete.addListener("place_changed", () => {
          const place = autoComplete.getPlace();

          setFieldValue(fieldName, place.formatted_address ?? "");
        });
      })
      .catch((err) => console.log(err));
  }, [fieldName, setFieldValue]);

  return (
    <input
      type="text"
      id="places"
      className={className}
      ref={inputRef}
      placeholder="Type your address"
    />
  );
}
