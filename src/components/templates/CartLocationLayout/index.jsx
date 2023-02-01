import React, { useCallback, useState } from "react";
import Body from "../../atoms/Body";
import Button from "../../atoms/Button";
import Container from "../../atoms/Container";
import KakaoMap from "../../atoms/KakaoMap";
import Search from "../../atoms/Search";
import TerritoryCard from "../../molecules/TerritoryCard";

const CartLocationLayout = ({ locations, onCreate, onUpdate, onDelete }) => {
  const [keyword, setKeyword] = useState("");
  const [latlng, setLatlng] = useState(null);
  const [editIdx, setEditIdx] = useState(0);
  const onEditModeChangeHandler = useCallback((location) => {
    const { idx, name, ...latlng } = location;
    setEditIdx((prevIdx) => (prevIdx === idx ? 0 : idx));
    setLatlng((prevLatlng) =>
      prevLatlng && prevLatlng.lat === latlng.lat ? null : latlng
    );
  }, []);
  const onSearchChangeHandler = useCallback((name) => {
    setLatlng(null);
    setKeyword(name);
  }, []);
  const onMapClickHandler = useCallback((latlng) => {
    setLatlng(latlng);
  }, []);
  const onUpdateClickHandler = useCallback(() => {
    const data = {
      cartLocationIdx: editIdx,
      lat: `${latlng.lat}`,
      lng: `${latlng.lng}`,
    };
    if (keyword) {
      data.name = keyword;
    }
    onUpdate(data);
    setEditIdx(0);
    setKeyword("");
    setLatlng(null);
  }, [editIdx, keyword, latlng]);
  const onDeleteClickHandler = useCallback(() => {
    onDelete({
      cartLocationIdx: editIdx,
    });
    setEditIdx(0);
    setKeyword("");
    setLatlng(null);
  }, [editIdx, keyword, latlng]);
  return (
    <Body className="animate-naviToUser font-display">
      <Container className="h-[calc(90vh)]">
        <TerritoryCard
          className="my-0 animate-fade before:top-6 before:bg-red-700"
          childClassName="-top-0 bg-amber-100"
          titleClassName="text-primary-800"
          title="전시대 구역관리"
        >
          <div className="h-[calc(100%-60px)] bg-gray-800 p-5 rounded-lg">
            <div className="w-full mx-auto">
              <Button className="rounded-lg text-black" onClick={onCreate}>
                구역등록
              </Button>
            </div>
            <div className="mt-1 h-[calc(32%)] p-2 bg-gray-900 rounded overflow-y-scroll scrollbar-hide mb-3">
              {!!locations.length &&
                locations.map((location) => {
                  const isEditMode = editIdx === location.idx;
                  return (
                    <div key={location.idx} className={` flex`}>
                      <div className="w-[235px]">
                        {isEditMode && (
                          <>
                            <Search
                              className="w-36 p-1 m-0 bg-gray-600"
                              value={location.name}
                              onSubmit={onSearchChangeHandler}
                            />
                            {!latlng && (
                              <span className="block text-xs ml-1">
                                (지도에서 위치를 선택하세요)
                              </span>
                            )}
                            {latlng && (
                              <span className="block text-xs ml-1">
                                (위도: {`${latlng.lat}`.substring(0, 8)}, 경도:{" "}
                                {`${latlng.lng}`.substring(0, 8)})
                              </span>
                            )}
                          </>
                        )}
                        {!isEditMode && (
                          <p
                            onClick={onEditModeChangeHandler.bind(
                              null,
                              location
                            )}
                            className="m-1"
                          >
                            {location.name}{" "}
                            <span className="block text-xs">
                              (위도: {location.lat.substring(0, 8)}, 경도:{" "}
                              {location.lng.substring(0, 8)})
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="mt-1">
                        {isEditMode && (
                          <>
                            <Button
                              className="text-xs border-0 px-1 mr-1 bg-gray-800 animate-pulse"
                              onClick={onUpdateClickHandler}
                              disabled={!latlng}
                            >
                              수정
                            </Button>
                            <Button
                              className="text-xs border-0 px-1 bg-gray-800 animate-pulse"
                              onClick={onDeleteClickHandler}
                            >
                              삭제
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <KakaoMap
              className="w-full h-72 rounded"
              keyword={keyword}
              latlng={latlng}
              onClick={onMapClickHandler}
            />
          </div>
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default CartLocationLayout;
