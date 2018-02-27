function Events($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.load = {
    all: () => {
      let url = `${AppSettings.apiUrl}load-all-events`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      return $http.get(url).then(succesCallback, errorCallback);
    },
    one: (eventIdent) => {
      let url = `${AppSettings.apiUrl}load-one-event`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let params = { eventIdent: eventIdent };
      return $http.get(url, { params: params }).then(succesCallback, errorCallback);
    }
  };

  service.event = {
    delete: (eventIdent) => {
      let url = `${AppSettings.apiUrl}delete-event`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let params = { eventIdent: eventIdent, 'token': $rootScope.userData.token };
      return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
    },
    edit: (eventData) => {
      let url = `${AppSettings.apiUrl}edit-event`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let data = JSON.stringify({ data: eventData, 'token': $rootScope.userData.token });
      return $http.put(url, data).then(succesCallback, errorCallback);
    },
    add: (eventData) => {
      let url = `${AppSettings.apiUrl}add-event`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let data = JSON.stringify({ data: eventData, 'token': $rootScope.userData.token });
      return $http.post(url, data).then(succesCallback, errorCallback);
    }
  };
  return service;
}

export default {
  name: 'Events',
  fn: Events
};
