function SpecializationsDatabase($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.loadAllSpecializations = () => {
    let url = `${AppSettings.apiUrl}load-all-specializations`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    return $http.get(url).then(succesCallback, errorCallback);
  };

  service.loadOneSpecialization = (specializationIdent) => {
    let url = `${AppSettings.apiUrl}load-one-specialization`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = { specializationIdent: specializationIdent };
    return $http.get(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.deleteSpecialization = (specializationIdent) => {
    let url = `${AppSettings.apiUrl}delete-specialization`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = { specializationIdent: specializationIdent, 'token': $rootScope.token };
    return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.addSpecialization = (specializationData) => {
    let url = `${AppSettings.apiUrl}add-specialization`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: specializationData, 'token': $rootScope.token });
    return $http.post(url, data).then(succesCallback, errorCallback);
  };

  service.editSpecialization = (specializationData) => {
    let url = `${AppSettings.apiUrl}edit-specialization`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: specializationData, 'token': $rootScope.token });
    return $http.put(url, data).then(succesCallback, errorCallback);
  };

  return service;

}

export default {
  name: 'SpecializationsDatabase',
  fn: SpecializationsDatabase
};
