import React, { useCallback, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { addressSearch } from "../../../hooks/kakaoMap";
import Button from "../Button";

const sdkUrl = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakao_key}&libraries=services`;

const KakaoMapButton = ({ className, children, dest, address }) => {
  if (!kakao_key) {
    return <></>;
  }
  const results = useQueries({
    queries: [
      {
        queryKey: [`addressSearch/${address}`, address],
        queryFn: addressSearch,
        refetchOnMount: "always",
      },
    ],
  });
  const { data } = results[0];
  const x = data ? data[0].x : "";
  const y = data ? data[0].y : "";
  const url = `https://map.kakao.com/link/to/${dest},${y},${x}`;
  const onClickHandler = useCallback(() => {
    window.open(url, "_blank");
  }, [url]);
  useEffect(() => {
    if (document.querySelector(`script[src="${sdkUrl}"]`)) {
      return;
    }
    const script = document.createElement("script");
    script.src = sdkUrl;
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <Button className={className} onClick={onClickHandler}>
      {children}
    </Button>
  );
};

export default KakaoMapButton;
