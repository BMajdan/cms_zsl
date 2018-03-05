function Files($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.load = {
    documents: () => {
      let url = `${AppSettings.apiUrl}load-all-documents`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      return $http.get(url).then(succesCallback, errorCallback);
    }
  };

  service.upload = {
    image: (file, path, type) => {
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
    },
    file: (file, path, name, oldName) => {
      let url = `${AppSettings.apiUrl}upload-file`;
      let succesCallback = (data) => { return data; };
      let errorCallback = (err) => { return err; };

      let fd = new FormData();
      if(file)
        fd.append('file', file);
      
      fd.append('oldName', oldName);
      fd.append('name', name);
      fd.append('path', path);
      fd.append('token', $rootScope.userData.token);

      return $http({
        url: url,
        method: 'POST',
        data: fd,
        headers: { 'Content-Type': undefined },
        transformRequest: angular.identity
      }).then(succesCallback, errorCallback);
    }
  };

  service.add = {
    info: (fileData, oldName) => {
      let url = `${AppSettings.apiUrl}add-file-info`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let data = JSON.stringify({ data: fileData, oldName: oldName, 'token': $rootScope.userData.token });
      return $http.post(url, data).then(succesCallback, errorCallback);
    },
  };

  service.delete = {
    file: (name) => {
      let url = `${AppSettings.apiUrl}delete-file`;
      let succesCallback = (data) => { return data.data; };
      let errorCallback = (err) => { return err; };
      let params = { name: name, 'token': $rootScope.userData.token };
      return $http.delete(url, { params: params }).then(succesCallback, errorCallback);
    }
  };

  return service;

}

export default {
  name: 'Files',
  fn: Files
};
