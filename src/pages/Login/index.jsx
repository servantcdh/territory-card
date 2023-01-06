import React from "react";
import LoginLayout from "../../components/templates/LoginLayout";
import useLoginMutation from "../../hooks/query/auth/useLoginMutation";
import { setAccessToken } from "../../hooks/storage";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigation = useNavigate();
  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    error: loginError,
    isSuccess: isLoginSuccess,
  } = useLoginMutation();
  const onSuccessLoginMutate = ({ accessToken }) => {
    setAccessToken(accessToken);
    const timeout = setTimeout(() => {
      navigation("/");
      clearTimeout(timeout);
    }, 500);
  };
  const onSubmitHandler = (name, password) => {
    loginMutate({ name, password }, { onSuccess: onSuccessLoginMutate });
  };
  return (
    <LoginLayout
      onSubmit={onSubmitHandler}
      pending={loginLoading}
      error={loginError}
      success={isLoginSuccess}
    />
  );
};

export default LoginPage;
