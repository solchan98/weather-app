const getCurrentLocation = (): GeolocationCoordinates => {

  let location: GeolocationCoordinates = { latitude: 37.2221658, longitude: 127.1875067 } as GeolocationCoordinates; // BASE_LOCATION is myongi university in yongin

  const success = (position: GeolocationPosition) => {
    location = position.coords;
  };

  navigator.geolocation.getCurrentPosition(success);
  console.log(location)

  return location;
};

export default getCurrentLocation;