function SpecializationsDatabase($http, $location, AppSettings) {
  'ngInject';

  const service = {};

  function generateKey(first, second) {
    let number;
    do { number = Math.floor(Math.random() * (second - first) + first); } while (number % 2 == 1);
    return number;
  }

  service.loadAllSpecializations = () => {
    let url = `${AppSettings.apiUrl}loadAllSpecializations`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    return $http.get(url).then(succesCallback, errorCallback);
  };

  service.loadOneSpecialization = (specializationIdent) => {
    let url = `${AppSettings.apiUrl}loadOneSpecializations`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = {
      specializationIdent: specializationIdent
    };
    return $http.get(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.deleteSpecialization = (specializationIdent) => {
    let url = `${AppSettings.apiUrl}deleteSpecialization`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = {
      specializationIdent: specializationIdent,
      pHYcSW: generateKey(541, 600)
    };
    return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.addSpecialization = (specializationData) => {
    let url = `${AppSettings.apiUrl}addSpecialization`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: specializationData, aYtCpO: generateKey(431, 500) });
    return $http.post(url, data).then(succesCallback, errorCallback);
  };

  service.editSpecialization = (specializationData) => {
    let url = `${AppSettings.apiUrl}editSpecialization`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: specializationData, sncKox: generateKey(675, 987) });
    return $http.put(url, data).then(succesCallback, errorCallback);
  };

  return service;

}

export default {
  name: 'SpecializationsDatabase',
  fn: SpecializationsDatabase
};
