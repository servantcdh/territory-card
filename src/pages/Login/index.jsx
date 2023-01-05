import React from "react";
import LoginLayout from "../../components/templates/LoginLayout";
import { useMutation } from "react-query";
import { loginApi } from "../../hooks/api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigation = useNavigate();
  const loginMutation = useMutation(loginApi);
  const onSubmitHandler = (name, password) => {
    loginMutation.mutate(
      { name, password },
      {
        onSuccess: ({ accessToken, refreshToken }) => {
          localStorage.setItem("a", accessToken);
          localStorage.setItem("r", refreshToken);
          setTimeout(() => {
            navigation("/");
          }, 500);
        },
      }
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
