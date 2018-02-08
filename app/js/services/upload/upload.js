function UploadFiles($http, $location, AppSettings) {
  'ngInject';

  const service = {};

  function generateKey(first, second) {
    let number;
    do { number = Math.floor(Math.random() * (second - first) + first); } while (number % 2 == 1);
    return number;
  }

  service.uploadImage = (file, path, type) => {
    let url = `${AppSettings.apiUrl}uploadImage`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };

    let fd = new FormData();
    fd.append('file', file);
    fd.append('path', path);
    fd.append('type', type);
    fd.append('nTySQf', generateKey(791, 860));

    return $http({
      url: url,
      method: 'POST',
      data: fd,
      headers: { 'Content-Type': undefined },
      transformRequest: angular.identity
    }).then(succesCallback, errorCallback);

  };

  return service;

}

export default {
  name: 'UploadFiles',
  fn: UploadFiles
};
