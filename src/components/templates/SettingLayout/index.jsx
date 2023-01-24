import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../../atoms/Body";
import Input from "../../atoms/Input";
import Container from "../../atoms/Container";
import TerritoryCard from "../../molecules/TerritoryCard";
import Modal from "../../molecules/Modal";
import Button from "../../atoms/Button";

const SettingLayout = ({ userData, onUpdate, onCreate, hasAuth, isMyInfo }) => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const genderMaleRef = useRef();
  const genderFemaleRef = useRef();
  const guideRef = useRef();
  const authRef = useRef();
  const baptizeRef = useRef();
  const driverRef = useRef();
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const setErrorHandler = useCallback(
    (field) => {
      setError((prev) => {
        if (prev.includes(field)) {
          return prev;
        } else {
          const cloned = [...prev];
          cloned.push(field);
          return cloned;
        }
      });
    },
    [error, setError]
  );
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const name = nameRef.current.value;
      const password = passwordRef.current.value;
      const passwordConfirm = passwordConfirmRef.current.value;
      const gender = !!genderMaleRef.current.checked;
      const guide = guideRef.current.checked;
      const auth = authRef.current.checked;
      const baptize = baptizeRef.current.checked;
      const driver = driverRef.current.checked;
      const data = {};
      const errors = [];
      setError([]);
      if (!userData || name !== userData.name) {
        if (name.length < 2) {
          setErrorHandler("name");
          errors.push("name");
        } else {
          data.name = name;
        }
      }
      if (password) {
        if (password.length < 4 || password !== passwordConfirm) {
          setErrorHandler("password");
          errors.push("password");
        } else {
          data.password = password;
        }
      }
      if (errors.length > 0) {
        return;
      }
      if (!userData || gender !== userData.gender) {
        data.gender = gender;
      }
      if (!userData || guide !== userData.guide) {
        data.guide = guide;
      }
      if (!userData || auth !== userData.auth) {
        data.auth = auth;
      }
      if (!userData || baptize !== userData.baptize) {
        data.baptize = baptize;
      }
      if (!userData || driver !== userData.driver) {
        data.driver = driver;
      }
      setFormData(data);
    },
    [error, setError, setErrorHandler, userData]
  );
  const onConfirmHandler = useCallback(async () => {
    try {
      if (onCreate) {
        await onCreate({ ...formData, status: true });
      } else {
        await onUpdate(formData);
      }
      setFormData(null);
      setActiveModal(true);
    } catch (e) {
      if (e.message.includes("Duplicate")) {
        setError("name");
      }
      setFormData(null);
    }
  }, [formData, setFormData, setError, setActiveModal, onUpdate, onCreate]);
  const onCancelHandler = useCallback(() => {
    setFormData(null);
    setActiveModal(null);
  }, [setFormData, setActiveModal]);
  const onConfirmModalHandler = useCallback(() => {
    setFormData(null);
    setActiveModal(null);
    if (isMyInfo) {
      navigate(`/profile/me`);
    } else {
      navigate("/user");
    }
  }, [setActiveModal, navigate, isMyInfo, userData, onCreate]);
  return (
    <Body className="animate-naviToSetting p-1">
      {!!formData && (
        <Modal
          className="bg-amber-200"
          title={`계정정보를 ${onCreate ? "전송" : "변경"}하시겠습니까?`}
          onConfirm={onConfirmHandler}
          buttonName={onCreate ? "전송하기" : "변경하기"}
          onCancel={onCancelHandler}
          cancelName="취소"
        ></Modal>
      )}
      {activeModal && (
        <Modal
          className="bg-amber-200"
          title={`${onCreate ? "전송" : "변경"}했습니다.`}
          onConfirm={onConfirmModalHandler}
          buttonName="확인"
        ></Modal>
      )}
      <Container className="h-[calc(90vh)]">
        <TerritoryCard
          className="my-0 animate-fade before:top-6 before:bg-primary-500"
          childClassName="-top-0 bg-gray-800"
          titleClassName="text-primary-200"
          title="계정정보"
        >
          <div className="bg-amber-200 text-primary-900 p-1 rounded mt-2">
            <div className="border border-dashed border-gray-500 p-3 text-[15px]">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                  <div className="text-[18px]">이름(아이디).</div>
                  <div className="pl-1">
                    <Input
                      htmlRef={nameRef}
                      error={error.includes("name")}
                      type="text"
                      value={userData ? userData.name : ""}
                      disabled={!hasAuth}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-[18px]">암호.</div>
                  <div className="pl-1">
                    <Input
                      htmlRef={passwordRef}
                      error={error.includes("password")}
                      type="password"
                      placeholder="네 자리 이상"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-[18px]">암호 확인.</div>
                  <div className="pl-1">
                    <Input
                      htmlRef={passwordConfirmRef}
                      type="password"
                      placeholder="암호 재입력"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-[18px]">성별.</div>
                  {!hasAuth && (
                    <div className="pl-1">
                      {userData.gender ? "형제👨🏻‍💼" : "자매👩🏻‍💼"}
                    </div>
                  )}
                  {hasAuth && (
                    <div className="pl-1">
                      <div className="flex items-center mb-4">
                        <Input
                          htmlRef={genderMaleRef}
                          id="default-radio-1"
                          type="radio"
                          value={true}
                          checked={userData ? userData.gender : false}
                          name="default-radio"
                          className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 focus:ring-2"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          형제👨🏻‍💼
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Input
                          htmlRef={genderFemaleRef}
                          id="default-radio-2"
                          type="radio"
                          value={false}
                          checked={userData ? !userData.gender : false}
                          name="default-radio"
                          className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 focus:ring-2"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          자매👩🏻‍💼
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="text-[18px]">침례여부.</div>
                  {!hasAuth && (
                    <div className="pl-1">
                      {userData.baptize ? "침례받은 전도인" : "미침례전도인🔰"}
                    </div>
                  )}
                  {hasAuth && (
                    <div className="pl-1">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <Input
                          htmlRef={baptizeRef}
                          type="checkbox"
                          className="sr-only peer"
                          checked={userData ? userData.baptize : false}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="text-[18px]">운전자🪪.</div>
                  <div className="pl-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <Input
                        htmlRef={driverRef}
                        type="checkbox"
                        className="sr-only peer"
                        checked={userData ? userData.driver : false}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                </div>
                {hasAuth && (
                  <>
                    <div className="mb-4">
                      <div className="text-[18px]">인도자💼.</div>
                      <div className="pl-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <Input
                            htmlRef={guideRef}
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData ? userData.guide : false}
                            disabled={!hasAuth}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-[18px]">관리자🧑🏻‍🔧.</div>
                      <div className="pl-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <Input
                            htmlRef={authRef}
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData ? userData.auth : false}
                            disabled={!hasAuth}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <Button type="submit">
                    {onCreate ? "전송하기" : "변경하기"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default SettingLayout;
