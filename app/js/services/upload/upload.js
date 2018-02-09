function UploadFiles($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.uploadImage = (file, path, type) => {
    let url = `${AppSettings.apiUrl}upload-image`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = () => { return false; };

    let fd = new FormData();
    fd.append('file', file);
    fd.append('path', path);
    fd.append('type', type);
    fd.append('token', $rootScope.token);

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
