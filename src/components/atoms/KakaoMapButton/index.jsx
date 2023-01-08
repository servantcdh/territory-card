import React, { useCallback } from "react";
import useAddressSearch from "../../../hooks/query/kakaoMap/useAddressSearch";
import Button from "../Button";

const KakaoMapButton = ({ className, children, dest, address }) => {
  const { data } = useAddressSearch(address);
  const x = data ? data[0].x : "";
  const y = data ? data[0].y : "";
  const url = `https://map.kakao.com/link/to/${dest},${y},${x}`;
  const onClickHandler = useCallback(() => {
    window.open(url, "_blank");
  }, [url]);
  return (
    <Button className={className} onClick={onClickHandler}>
      {children}
    </Button>
  );
};

export default KakaoMapButton;
