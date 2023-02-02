import React, { useCallback, useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { addressSearch } from "../../../hooks/kakaoMap";
import Button from "../Button";

const sdkUrl = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakao_key}&libraries=services&autoload=false`;
window.kakao = null;

const KakaoMapButton = ({ className, children, dest, address, latlng }) => {
  if (!kakao_key) {
    return <></>;
  }
  const [load, setLoad] = useState(false);
  const results = useQueries({
    queries: [
      {
        queryKey: [`addressSearch/${address}`, address],
        queryFn: addressSearch,
        enabled: !latlng && load,
        refetchOnMount: "always",
      },
    ],
  });
  const { data } = results[0];
  let x = "";
  let y = "";
  if (latlng) {
    x = latlng.lng;
    y = latlng.lat;
  } else if (data) {
    x = data[0].x;
    y = data[0].y;
  }
  const url = `https://map.kakao.com/link/to/${dest},${y},${x}`;
  const onClickHandler = useCallback(() => {
    window.open(url, "_blank");
  }, [url]);
  useEffect(() => {
    if (document.querySelector(`script[src="${sdkUrl}"]`)) {
      setLoad(true);
      return;
    }
    const script = document.createElement("script");
    script.src = sdkUrl;
    script.onload = () => {
      kakao.maps.load(() => {
        setLoad(true);
      });
    };
    document.body.appendChild(script);
  }, []);
  return (
    <Button className={className} onClick={onClickHandler}>
      {children}
    </Button>
  );
};

export default KakaoMapButton;
