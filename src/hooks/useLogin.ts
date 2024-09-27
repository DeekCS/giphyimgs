// src/hooks/useLogin.ts

import { useFormik } from 'formik';
import { LoginRequest } from '../types/formTypes';
import { loginValidationSchema } from '../utils/validation';
import { loginService } from '../services/authService';
import { useState } from 'react';

type Props = {
  onSubmitForm: (data: LoginRequest) => void;
  initialState: LoginRequest;
};

const useLogin = ({ onSubmitForm, initialState }: Props) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<Partial<LoginRequest>>({
    validationSchema: loginValidationSchema,
    initialValues: initialState ?? { userName: '', password: '' },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      return onSubmitForm(values as LoginRequest);
    }
  });

  const getError = (key: keyof LoginRequest) => formik.errors?.[key] as string;

  const handleChange = async (value: string | null, key: keyof LoginRequest) => {
    formik.setFieldError(key, '');
    await formik.setFieldValue(key, value);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await formik.validateForm();
      if (formik.isValid) {
        await onSubmitForm(formik.values as LoginRequest);
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setLoading(false);
    }
  };


  return {
    values: formik.values,
    onSubmit,
    getError,
    handleChange,
    isDisabled: !formik.values.userName || !formik.values.password || loading,
    loading,
  };
};

export default useLogin;