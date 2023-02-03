import React, { useCallback, useEffect, useRef, useState } from "react";

const defaultLatLng = {
  lat: "37.24668244441506",
  lng: "127.06089155894465",
};
const sdkUrl = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakao_key}&libraries=services&autoload=false`;
window.kakao = null;

const KakaoMap = ({ className, keyword, latlng, onClick }) => {
  if (!kakao_key) {
    return <></>;
  }

  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setMarker] = useState(null);
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = sdkUrl;
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(
          defaultLatLng.lat,
          defaultLatLng.lng
        );
        const options = {
          center,
          level: 2,
        };
        const map = new kakao.maps.Map(container.current, options);
        const marker = new kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);
        setMarker(marker);
        if (onClick) {
          kakao.maps.event.addListener(map, "click", (mouseEvent) => {
            const latlng = mouseEvent.latLng;
            const position = {
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            };
            onClick(position);
          });
        }
        setKakaoMap(map);
      });
    };
  }, [container]);

  useEffect(() => {
    if (!kakaoMap || !latlng) {
      return;
    }
    const position = new kakao.maps.LatLng(latlng.lat, latlng.lng);
    setMarker((prevMarker) => {
      if (prevMarker) {
        prevMarker.setMap(null);
      }
      return new kakao.maps.Marker({ map: kakaoMap, position });
    });
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(position);
    kakaoMap.setBounds(bounds);
  }, [kakaoMap, latlng]);

  useEffect(() => {
    if (!kakaoMap || !keyword) {
      return;
    }
    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
        kakaoMap.setBounds(bounds);
      }
    };
    const ps = new kakao.maps.services.Places();
    const query = keyword ? keyword : " ";
    ps.keywordSearch(query, placesSearchCB);
  }, [kakaoMap, keyword]);

  return <div ref={container} className={`z-0 ${className}`}></div>;
};

export default KakaoMap;
