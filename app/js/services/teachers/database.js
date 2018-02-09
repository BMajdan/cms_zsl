function TeachersDatabase($http, $location, AppSettings) {
  'ngInject';

  const service = {};

  service.loadAllTeachers = () => {
    let url = `${AppSettings.apiUrl}load-all-teachers`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    return $http.get(url).then(succesCallback, errorCallback);
  };

  return service;

}

export default {
  name: 'TeachersDatabase',
  fn: TeachersDatabase
};
