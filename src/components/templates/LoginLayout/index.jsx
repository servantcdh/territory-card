import React, { useState } from "react";
import Card from "../../atoms/Card";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import Footer from "../../atoms/Footer";

const LoginLayout = ({ onSubmit, pending, error, success }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const isNameError = error ? error.toString().includes("사용자명") : false;
  const isPasswordError = error ? error.toString().includes("암호") : false;
  let isApiError = error && !isNameError && !isPasswordError;
  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(name, password);
  };
  return (
    <div className="w-screen">
      <Card className={`fixed inset-x-0 m-auto w-96 top-1/3 text-center border-4 border-amber-500 ${success ? "animate-hideLeft" : ""}`}>
        <div className="text-2xl mb-4">
          <h1>로그인</h1>
        </div>
        <div>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-1">
              <Input
                type="text"
                placeholder="이름을 입력해주세요 📛"
                onChange={onNameChangeHandler}
                disabled={pending}
                error={isNameError || isApiError}
              />
            </div>
            <div className="mb-5">
              <Input
                type="password"
                placeholder="암호를 입력해주세요 🔑"
                onChange={onPasswordChangeHandler}
                disabled={pending}
                error={isPasswordError || isApiError}
              />
            </div>
            <div>
              <Button
                type="submit"
                className="animate-bounce"
                disabled={!(name && password) || pending}
              >
                자동으로 로그인하기
              </Button>
            </div>
          </form>
          {isApiError && <p className="text-rose-500 b-3">서버와 통신을 할 수 없습니다.</p>}
        </div>
      </Card>
      <Footer className={`${success ? "animate-hideDown" : ""}`}/>
    </div>
  );
};

export default LoginLayout;
