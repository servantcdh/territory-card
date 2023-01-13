import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Input from "../../atoms/Input";
import Modal from "../../molecules/Modal";

const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 40,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

const ImageUpload = ({ htmlRef, aspect, onComplete, onLoading }) => {
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef();
  const [crop, setCrop] = useState();
  const onConfirmHandler = useCallback(async () => {
    const imgFile = await makeClientCrop(crop);
    onComplete(imgFile);
    setImgSrc(null);
  }, [crop, setImgSrc]);
  const onCancelHandler = useCallback(() => {
    setImgSrc(null);
  }, [setImgSrc]);
  const onInputFileChangeHandler = useCallback(
    (e) => {
      const selectFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(selectFile);
      onLoading(true);
      reader.addEventListener("load", () => {
        setImgSrc(reader.result);
        e.target.files = null;
        e.target.value = null;
      });
    },
    [setCrop, onLoading]
  );
  const onImageLoadedHandler = useCallback(
    (e) => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
      onLoading(false);
    },
    [setCrop, aspect, onLoading]
  );
  const onCropChangeHandler = useCallback(
    (crop) => {
      setCrop(crop);
    },
    [setCrop]
  );
  const makeClientCrop = useCallback(
    async (crop) => {
      if (imgRef.current && crop.width && crop.height) {
        const croppedImageBlob = await getCroppedImage(imgRef.current, crop);
        const imageFile = new File(
          [croppedImageBlob],
          `profile_${new Date().getTime()}.jpg`,
          {
            type: "image/jpeg",
          }
        );
        return imageFile;
      }
    },
    [imgRef, getCroppedImage]
  );
  const getCroppedImage = useCallback((image, crop) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = 1;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    ctx.save();
    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);
    ctx.scale(1, 1);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );
    ctx.restore();
    return new Promise((resolve) => {
      canvas.toBlob(resolve);
      canvas.remove();
    });
  }, []);
  return (
    <>
      {!!imgSrc && (
        <Modal
          className="bg-amber-200"
          title="영역을 선택하세요🤔"
          onConfirm={onConfirmHandler}
          buttonName="확인"
          onCancel={onCancelHandler}
          cancelName="취소"
        >
          <ReactCrop
            crop={crop}
            aspect={aspect}
            ruleOfThirds={true}
            circularCrop={true}
            onChange={onCropChangeHandler}
          >
            <img ref={imgRef} src={imgSrc} onLoad={onImageLoadedHandler} />
          </ReactCrop>
        </Modal>
      )}
      <Input
        htmlRef={htmlRef}
        type="file"
        multiple={false}
        accept="image/*"
        className="hidden"
        onChange={onInputFileChangeHandler}
      />
    </>
  );
};

export default ImageUpload;
