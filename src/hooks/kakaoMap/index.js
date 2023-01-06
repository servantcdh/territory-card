export const addressSearch = ({ queryKey }) => {
  const [_, address] = queryKey;
  const geocoder = new kakao.maps.services.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        reject(status);
      }
    });
  });
};
