function Teachers($http, $location, AppSettings) {
  'ngInject';

  const service = {};

  service.load = {
    all: () => {
      let url = `${AppSettings.apiUrl}load-all-teachers`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      return $http.get(url).then(succesCallback, errorCallback);
    }
  }

  return service;

}

export default {
  name: 'Teachers',
  fn: Teachers
};
