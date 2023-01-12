import React, { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../../atoms/Body";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Profile from "../../atoms/Profile";

const ProfileLayout = ({ userData, isMyProfile, hasAuth, onUploadProfile }) => {
  const navigate = useNavigate();
  const inputFileRef = useRef();
  const { live, car, guide, auth, baptize, ...profileData } = userData;
  const onInputFileChangeHandler = useCallback(
    (e) => {
      const selectFile = e.target.files[0];
      onUploadProfile(selectFile);
      e.target.files = null;
      e.target.value = null;
    },
    [onUploadProfile]
  );
  const onUploadProfileClickHandler = useCallback(() => {
    inputFileRef.current.click();
  }, [inputFileRef]);
  const onModifyUserInfoClickHandler = useCallback(() => {
    navigate(`/setting/${isMyProfile ? "me" : userData.userIdx}`);
  }, [navigate]);
  return (
    <Body className="animate-naviToProfile flex items-center font-display">
      <Input
        htmlRef={inputFileRef}
        type="file"
        multiple={false}
        accept="image/*"
        className="hidden"
        onChange={onInputFileChangeHandler}
      />
      <div className="m-auto animate-scale">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center p-10">
            <Profile className="w-24 h-24 mb-3" {...profileData} />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {userData.name}
              {userData.gender ? "👨🏻‍💼" : "👩🏻‍💼"}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              <div className="mb-2">
                {!baptize && <span className="p-1 mr-1">미침례전도인🔰</span>}
                {!!guide && <span className="p-1 mr-1">인도자💼</span>}
                {!!auth && <span className="p-1 mr-1">관리자🧑🏻‍🔧</span>}
              </div>
              <div className="flex items-center">
                {!!live && (
                  <span className="block bg-green-500 rounded-xl m-auto text-white px-2">
                    접속중
                  </span>
                )}
                {!!car && (
                  <>
                    {" "}
                    <span className="block bg-green-500 rounded-xl m-auto text-white px-2">
                      차량가능🚗
                    </span>
                  </>
                )}
              </div>
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              {isMyProfile && (
                <Button
                  className="inline-flex items-center px-2 text-sm font-medium text-center border-0 text-white bg-gray-600 rounded-lg"
                  onClick={onUploadProfileClickHandler}
                >
                  프로필 사진 변경
                </Button>
              )}
              {(isMyProfile || hasAuth) && (
                <Button
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center border-0 text-white bg-gray-600 rounded-lg"
                  onClick={onModifyUserInfoClickHandler}
                >
                  계정정보 변경
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default ProfileLayout;
