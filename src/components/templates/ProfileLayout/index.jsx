import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../../atoms/Body";
import Svg from "../../atoms/Svg";
import Button from "../../atoms/Button";
import Profile from "../../atoms/Profile";
import ImageUpload from "../../organisms/ImageUpload";

const ProfileLayout = ({ userData, isMyProfile, hasAuth, onUploadProfile }) => {
  const navigate = useNavigate();
  const [activeImageUpload, setActiveImageUpload] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const inputFileRef = useRef();
  const { live, car, guide, auth, baptize, ...profileData } = userData;
  const onInputFileChangeHandler = useCallback(
    (imageFile) => {
      setActiveImageUpload(false);
      onUploadProfile(imageFile).then(() => {
        setActiveImageUpload(true);
      });
    },
    [onUploadProfile, setActiveImageUpload]
  );
  const onUploadProfileClickHandler = useCallback(() => {
    inputFileRef.current.click();
  }, [inputFileRef]);
  const onModifyUserInfoClickHandler = useCallback(() => {
    navigate(`/setting/${isMyProfile ? "me" : userData.userIdx}`);
  }, [navigate, isMyProfile, userData]);
  const onLoadingImageHandler = useCallback(
    (isLoading) => {
      setIsLoadingImage(isLoading);
    },
    [setIsLoadingImage]
  );
  const onBackClickHander = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <Body className="animate-naviToProfile flex items-center font-display">
      <Svg
        onClick={onBackClickHander}
        className="absolute -ml-0.5 w-10 h-10 animate-shakeLeft"
        type="chevronLeft"
      />
      {activeImageUpload && (
        <ImageUpload
          htmlRef={inputFileRef}
          aspect={1 / 1}
          onComplete={onInputFileChangeHandler}
          onLoading={onLoadingImageHandler}
        />
      )}
      <div className="m-auto animate-scale">
        <div className="w-full max-w-sm border rounded-lg shadow-md bg-gray-800 border-gray-700">
          <div className="flex flex-col items-center p-10">
            <Profile className="w-24 h-24 mb-3" {...profileData} />
            <h5 className="mb-1 text-xl font-medium text-white">
              {userData.name}
              {userData.gender ? "👨🏻‍💼" : "👩🏻‍💼"}
            </h5>
            <span className="text-sm text-gray-300">
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
                  disabled={isLoadingImage}
                >
                  {!isLoadingImage ? "프로필 사진 변경" : "불러오는 중입니다"}
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
