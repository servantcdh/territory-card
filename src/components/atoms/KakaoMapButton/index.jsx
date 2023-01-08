import React, { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { addressSearch } from "../../../hooks/kakaoMap";
import Button from "../Button";

const KakaoMapButton = ({ className, children, dest, address }) => {
  const results = useQueries({
    queries: [
      {
        queryKey: [`addressSearch/${address}`, address],
        queryFn: addressSearch,
        refetchOnMount: "always",
        suspense: false,
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
  return (
    <Button className={className} onClick={onClickHandler}>
      {children}
    </Button>
  );
};

export default KakaoMapButton;
