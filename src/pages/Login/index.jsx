import React from "react";
import LoginLayout from "../../components/templates/LoginLayout";
import { useMutation } from "react-query";
import { loginApi } from "../../hooks/api/auth";
import { setAccessToken } from "../../hooks/storage";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigation = useNavigate();
  const loginMutation = useMutation(loginApi);
  const onSuccessLoginMutate = ({ accessToken }) => {
    setAccessToken(accessToken);
    setTimeout(() => {
      navigation("/");
    }, 500);
  };
  const onSubmitHandler = (name, password) => {
    loginMutation.mutate(
      { name, password },
      { onSuccess: onSuccessLoginMutate }
    );
  };
  return (
    <LoginLayout
      onSubmit={onSubmitHandler}
      pending={loginMutation.isLoading}
      error={loginMutation.error}
      success={loginMutation.isSuccess}
    />
  );
};

export default LoginPage;
