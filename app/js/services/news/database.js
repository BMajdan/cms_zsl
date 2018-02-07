function NewsDatabase($http, $location, AppSettings) {
  'ngInject';

  const service = {};

  function generateKey(first, second) {
    let number;
    do { number = Math.floor(Math.random() * (second - first) + first); } while (number % 2 == 1);
    return number;
  }

  service.loadAllNews = () => {

    let url = AppSettings.apiUrl + 'loadAllNews';
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    return $http.get(url).then(succesCallback, errorCallback);
  };

  service.loadOneNews = (postIdent) => {

    let url = AppSettings.apiUrl + 'loadOneNews';
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = {
      postIdent: postIdent
    };
    return $http.get(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.deleteNews = (postIdent) => {
    let url = AppSettings.apiUrl + 'deleteNews';
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let params = {
      postIdent: postIdent,
      pHYcSW: generateKey(541, 600)
    };
    return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
  };

  service.addNews = (postData) => {
    let url = AppSettings.apiUrl + 'addNews';
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: postData, aYtCpO: generateKey(431, 500) });
    return $http.post(url, data).then(succesCallback, errorCallback);
  };

  service.editNews = (postData) => {
    let url = AppSettings.apiUrl + 'editNews';
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };
    let data = JSON.stringify({ data: postData, sncKox: generateKey(675, 987) });
    return $http.put(url, data).then(succesCallback, errorCallback);
  };

  return service;

}

export default {
  name: 'NewsDatabase',
  fn: NewsDatabase
};
