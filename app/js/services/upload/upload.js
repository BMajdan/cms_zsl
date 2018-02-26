function UploadFiles($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.uploadImage = (file, path, type) => {
    let url = `${AppSettings.apiUrl}upload-image`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = (err) => { return err; };

    let fd = new FormData();
    fd.append('file', file);
    fd.append('path', path);
    fd.append('type', type);
    fd.append('token', $rootScope.userData.token);

    return $http({
      url: url,
      method: 'POST',
      data: fd,
      headers: { 'Content-Type': undefined },
      transformRequest: angular.identity
    }).then(succesCallback, errorCallback);
  };

  service.loadDocuments = () => {
    let url = `${AppSettings.apiUrl}load-all-documents`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = (err) => { return err; };
    return $http.get(url).then(succesCallback, errorCallback);
  };

  service.addInfoFile = (fileData) => {
    let url = `${AppSettings.apiUrl}add-file-info`;
    let succesCallback = (data) => { return data.data; };
    let errorCallback = (err) => { return err; };
    let data = JSON.stringify({ data: fileData, 'token': $rootScope.userData.token });
    return $http.post(url, data).then(succesCallback, errorCallback);
  };

  service.uploadFile = (file, info, path) => {
    let url = `${AppSettings.apiUrl}upload-file`;
    let succesCallback = (data) => { return data; };
    let errorCallback = (err) => { return err; };
    console.log(file, path);
    let fd = new FormData();
    fd.append('file', file);
    fd.append('info', info);
    fd.append('path', path);
    fd.append('token', $rootScope.userData.token);

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
