import React, { useCallback, useEffect, useRef } from "react";

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

  const mapDivRef = useRef();

  const init = useCallback(() => {
    const mapContainer = mapDivRef.current; // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(
        latlng ? latlng.lat : defaultLatLng.lat,
        latlng ? latlng.lng : defaultLatLng.lng
      ), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    };

    // 장소 검색 객체를 생성합니다
    if (!latlng) {
      const ps = new kakao.maps.services.Places();
      const query = keyword ? keyword : " ";
      ps.keywordSearch(query, placesSearchCB);
    }

    // 지도를 클릭한 위치에 표출할 마커입니다
    const marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      const latlngData = {
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      };

      onClick(latlngData);
    });
  }, [keyword, latlng]);

  useEffect(() => {
    if (document.querySelector(`script[src="${sdkUrl}"]`)) {
      if (kakao) {
        init();
      }
      return;
    }
    const script = document.createElement("script");
    script.src = sdkUrl;
    script.async = true;
    script.onload = () => {
      kakao.maps.load(() => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          init();
        }, 100);
      });
    };
    document.body.appendChild(script);
  }, [keyword, latlng]);
  return <div ref={mapDivRef} className={`z-0 ${className}`}></div>;
};

export default KakaoMap;
