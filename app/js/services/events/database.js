function EventsDatabase($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.loadAllEvents = () => {
    let url = `${AppSettings.apiUrl}load-all-events`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    return $http.get(url).then(succesCallback, errorCallback);
  };

  service.loadOneEvent = (eventIdent) => {
    let url = `${AppSettings.apiUrl}load-one-event`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = { eventIdent: eventIdent };
    return $http.get(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.deleteEvent = (eventIdent) => {
    let url = `${AppSettings.apiUrl}delete-event`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = { eventIdent: eventIdent, 'token': $rootScope.userData.token };
    return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.addEvent = (eventData) => {
    let url = `${AppSettings.apiUrl}add-event`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: eventData, 'token': $rootScope.userData.token });
    return $http.post(url, data).then(succesCallback, errorCallback);
  };

  service.editEvent = (eventData) => {
    let url = `${AppSettings.apiUrl}edit-event`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: eventData, 'token': $rootScope.userData.token });
    return $http.put(url, data).then(succesCallback, errorCallback);
  };
  return service;
}

export default {
  name: 'EventsDatabase',
  fn: EventsDatabase
};
