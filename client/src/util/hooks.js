import { useState } from "react";

export const useFormValues = (callback, initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const onFormValueChange = (event) => setFormValues({
    ...formValues,
    [event.target.name]: event.target.value,
  });

  const onFormSubmit = (event) => {
    event.preventDefault();

    callback();
  };

  return {
    onFormValueChange,
    onFormSubmit,
    formValues,
  };
};
