function News($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.load = {
    all: () => {
      let url = `${AppSettings.apiUrl}load-all-news`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      return $http.get(url).then(succesCallback, errorCallback);
    },
    one: (postIdent) => {
      let url = `${AppSettings.apiUrl}load-one-post`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let params = { postIdent: postIdent };
      return $http.get(url, { params: params }).then(succesCallback, errorCallback);
    }
  };

  service.post = {
    delete: (postIdent) => {
      let url = `${AppSettings.apiUrl}delete-post`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let params = { postIdent: postIdent, 'token': $rootScope.userData.token };
      return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
    },
    edit: (postData) => {
      let url = `${AppSettings.apiUrl}edit-post`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let data = JSON.stringify({ data: postData, 'token': $rootScope.userData.token });
      return $http.put(url, data).then(succesCallback, errorCallback);
    },
    add: (postData) => {
      let url = `${AppSettings.apiUrl}add-post`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let data = JSON.stringify({ data: postData, 'token': $rootScope.userData.token });
      return $http.post(url, data).then(succesCallback, errorCallback);
    }
  };
  return service;
}

export default {
  name: 'News',
  fn: News
};
