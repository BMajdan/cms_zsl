function EventsDatabase($http, $location, AppSettings) {
  'ngInject';

  const service = {};

  function generateKey(first, second) {
    let number;
    do { number = Math.floor(Math.random() * (second - first) + first); } while (number % 2 == 1);
    return number;
  }

  service.loadAllEvents = () => {

    let url = `${AppSettings.apiUrl}loadAllEvents`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    return $http.get(url).then(succesCallback, errorCallback);
  };

  service.loadOneEvent = (eventIdent) => {

    let url = `${AppSettings.apiUrl}loadOneEvent`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = {
      eventIdent: eventIdent
    };
    return $http.get(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.deleteEvent = (eventIdent) => {
    let url = `${AppSettings.apiUrl}deleteEvent`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = {
      eventIdent: eventIdent,
      pHYcSW: generateKey(541, 600)
    };
    return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.addEvent = (eventData) => {
    let url = `${AppSettings.apiUrl}addEvent`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: eventData, aYtCpO: generateKey(431, 500) });
    return $http.post(url, data).then(succesCallback, errorCallback);
  };

  service.editEvent = (eventData) => {
    let url = `${AppSettings.apiUrl}editEvent`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: eventData, sncKox: generateKey(675, 987) });
    return $http.put(url, data).then(succesCallback, errorCallback);
  };

  return service;

}

export default {
  name: 'EventsDatabase',
  fn: EventsDatabase
};
