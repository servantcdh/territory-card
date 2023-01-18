import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../../atoms/Body";
import Container from "../../atoms/Container";
import Button from "../../atoms/Button";
import Search from "../../atoms/Search";
import TerritoryCard from "../../molecules/TerritoryCard";
import ProfileCard from "../../molecules/ProfileCard";

const UserLayout = ({ usersData, onSearchUser }) => {
  const navigate = useNavigate();
  const onSearchHandler = useCallback(
    (keyword) => {
      onSearchUser(keyword);
    },
    [onSearchUser]
  );
  const onCreateClickHandler = useCallback(
    () => {
      navigate("/user/new");
    },
    []
  );
  const onCardClickHandler = useCallback(
    (userIdx) => {
      navigate(`/profile/${userIdx}`);
    },
    [navigate]
  );
  return (
    <Body className="animate-naviToUser font-display">
      <Container className="h-[calc(90vh)]">
        <TerritoryCard
          className="my-0 animate-fade before:top-6 before:bg-red-700"
          childClassName="-top-0 bg-amber-100"
          titleClassName="text-primary-800"
          title="계정목록"
        >
          <div className="mt-3 h-[calc(100%-60px)] bg-gray-800 p-5 rounded-lg">
            <div className="w-full mx-auto h-10 mb-[60px]">
              <Search className="mb-2 rounded" onSubmit={onSearchHandler} />
              <Button
                className="rounded-lg text-black"
                onClick={onCreateClickHandler}
              >
                계정추가
              </Button>
            </div>
            <div className="mt-1 max-h-[calc(100%-100px)] overflow-y-scroll scrollbar-hide mb-2">
              {!!usersData.length &&
                usersData.map((u) => (
                  <ProfileCard
                    key={u.userIdx}
                    className="rounded w-full"
                    user={u}
                    checked={true}
                    onClick={onCardClickHandler.bind(null, u.userIdx)}
                  />
                ))}
            </div>
          </div>
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default UserLayout;
