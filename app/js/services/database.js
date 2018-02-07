function DatabaseManageData($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  function generateKey(first, second){
    let number;
     do {number = Math.floor(Math.random()*(second-first) + first) } while( number % 2 == 1 );
     return number;
  }

  /* GET USER TO LOGIN */

  service.getUserToLogin = (userName, userPassword) => {

    let url = AppSettings.apiUrl + 'getUserToLogin';
    let data = JSON.stringify({'userName': userName, 'userPassword': userPassword, PkRTvG: generateKey(111, 200)})

    let succesCallback = (data) =>{
      let callbackData = data.data
      if(callbackData.loginStatus == true){
        let expires = AppSettings.userExpireTime;
        let now = Date.now();
        let schedule = now + expires * 1000;
        try{
          sessionStorage.setItem('isLogin', callbackData.loginStatus);
          sessionStorage.setItem('userName', userName);
          sessionStorage.setItem('userData', callbackData.userPermission);
          sessionStorage.setItem('sessionTime', schedule);

          $rootScope.userData = {
            isLogin: callbackData.loginStatus,
            userName: userName,
            userPermission: callbackData.userPermission,
            sessionTime: schedule
          }

          $location.path('/');
          return false;
        }catch(e){
          console.log('setSotrage: Error seting key')
          return false;
        }
      }else{
        alert(callbackData.loginMessage)
      }
    }

    let errorCallback = () => {
      return false;
    }

    $http.post(url, data).then(succesCallback, errorCallback)
  };

  /* LOGIN USER */

  service.logInUser = (userName) => {
    let url = AppSettings.apiUrl + 'userLogin';
    let data = JSON.stringify({'userName': userName, CwQssA: generateKey(51, 100)})
    let succesCallback = () =>{}
    let errorCallback = () => { return false; }
    $http.put(url, data).then(succesCallback, errorCallback)
  }

  service.logOutUser = (removeSession) => {
    let url = AppSettings.apiUrl + 'logOut';
    let succesCallback = () =>{ 
      if(removeSession){
        $rootScope.userData = undefined;
        sessionStorage.clear();
        $location.path('/login');
      }
      return false;
    }
    let errorCallback = () => { return false; }
    let data = JSON.stringify({'userName': $rootScope.userData.userName, xPosKw: generateKey(321, 400)})
    
    return $http.put(url, data).then(succesCallback, errorCallback)
  }

  /* LOAD ALL FROM DATABASE */

  service.loadAllNews = () => {

    let url = AppSettings.apiUrl + 'loadAllNews';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    return $http.get(url).then(succesCallback, errorCallback)
  };

  service.loadAllEvents = () => {

    let url = AppSettings.apiUrl + 'loadAllEvents';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    return $http.get(url).then(succesCallback, errorCallback)
  };

  service.loadAllTeachers = () => {
    let url = AppSettings.apiUrl + 'loadAllTeachers';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    return $http.get(url).then(succesCallback, errorCallback)
  };

  /* LOAD ONE FROM DATABASE */

  service.loadOneEvent = (eventIdent) => {

    let url = AppSettings.apiUrl + 'loadOneEvent';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    let params = {
      eventIdent: eventIdent
    }
    return $http.get(url, {params: params}).then(succesCallback, errorCallback)
  };

  service.loadOneNews = (postIdent) => {

    let url = AppSettings.apiUrl + 'loadOneNews';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    let params = {
      postIdent: postIdent
    }
    return $http.get(url, {params: params}).then(succesCallback, errorCallback)
  };

  /* DELETE FROM DATABASE */

  service.deleteNews = (postIdent) => {
    let url = AppSettings.apiUrl + 'deleteNews';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    let params = {
      postIdent: postIdent,
      pHYcSW: generateKey(541, 600)
    }
    return $http.delete(url, {params: params}).then(succesCallback, errorCallback)
  };

  service.deleteEvent = (eventIdent) => {
    let url = AppSettings.apiUrl + 'deleteEvent';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    let params = {
      eventIdent: eventIdent,
      pHYcSW: generateKey(541, 600)
    }
    return $http.delete(url, {params: params}).then(succesCallback, errorCallback)
  };

  /* INSERT TO DATABASE */

  service.addNews = (postData) => {
    let url = AppSettings.apiUrl + 'addNews';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    let data = JSON.stringify({data: postData, aYtCpO: generateKey(431, 500)})
    return $http.post(url, data).then(succesCallback, errorCallback)
  }

  service.addEvent = (eventData) => {
    let url = AppSettings.apiUrl + 'addEvent';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    let data = JSON.stringify({data: eventData, aYtCpO: generateKey(431, 500)})
    return $http.post(url, data).then(succesCallback, errorCallback)
  }

  /* EDIT IN DATABASE */

  service.editNews = (postData) => {
    let url = AppSettings.apiUrl + 'editNews';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    let data = JSON.stringify({data: postData, sncKox: generateKey(675, 987)})
    return $http.put(url, data).then(succesCallback, errorCallback)
  }

  service.editEvent = (eventData) => {
    let url = AppSettings.apiUrl + 'editEvent';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }
    let data = JSON.stringify({data: eventData, sncKox: generateKey(675, 987)})
    return $http.put(url, data).then(succesCallback, errorCallback)
  }

  /* UPLOAD TO SERVER */

  service.uploadImage = (file, path, type) => {
    let url = AppSettings.apiUrl + 'uploadImage';
    let succesCallback = (data) =>{ return data.data }
    let errorCallback = () => { return false; }

    let fd = new FormData();
    fd.append('file', file);
    fd.append('path', path);
    fd.append('type', type)
    fd.append('nTySQf', generateKey(791, 860));

    return $http({
        url: url,
        method: 'POST',
        data: fd,
        headers: { 'Content-Type': undefined},
        transformRequest: angular.identity
    }).then(succesCallback, errorCallback);

  }

  return service;

}

export default {
  name: 'DatabaseManageData',
  fn: DatabaseManageData
};
