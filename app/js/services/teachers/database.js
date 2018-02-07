function TeachersDatabase($http, $location, AppSettings) {
  'ngInject';

  const service = {};

  /*function generateKey(first, second) {
    let number;
    do { number = Math.floor(Math.random() * (second - first) + first); } while (number % 2 == 1);
    return number;
  }*/

  service.loadAllTeachers = () => {
    let url = AppSettings.apiUrl + 'loadAllTeachers';
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
