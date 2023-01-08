export const addressSearch = ({ queryKey }) => {
  const [_, address] = queryKey;
  if (!address) {
    throw new Error("address is empty.");
  }
  const geocoder = new kakao.maps.services.Geocoder();
  return new Promise((resolve) => {
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        resolve(result);
      }
    });
  });
};
