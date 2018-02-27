function Specializations($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.load = {
    all: () => {
      let url = `${AppSettings.apiUrl}load-all-specializations`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      return $http.get(url).then(succesCallback, errorCallback);
    },
    one: (specializationIdent) => {
      let url = `${AppSettings.apiUrl}load-one-specialization`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let params = { specializationIdent: specializationIdent };
      return $http.get(url, { params: params }).then(succesCallback, errorCallback);
    }
  };

  service.specialization = {
    delete: (specializationIdent) => {
      let url = `${AppSettings.apiUrl}delete-specialization`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let params = { specializationIdent: specializationIdent, 'token': $rootScope.userData.token };
      return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
    },
    edit: (specializationData) => {
      let url = `${AppSettings.apiUrl}edit-specialization`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let data = JSON.stringify({ data: specializationData, 'token': $rootScope.userData.token });
      return $http.put(url, data).then(succesCallback, errorCallback);
      
    },
    add: (specializationData) => {
      let url = `${AppSettings.apiUrl}add-specialization`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let data = JSON.stringify({ data: specializationData, 'token': $rootScope.userData.token });
      return $http.post(url, data).then(succesCallback, errorCallback);
    }
  };
  return service;
}

export default {
  name: 'Specializations',
  fn: Specializations
};
