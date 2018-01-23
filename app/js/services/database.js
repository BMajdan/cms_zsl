function DatabaseManageData($http, $location, AppSettings, $rootScope) {
  'ngInject';

  const service = {};

  service.getUserToLogin = (userName, userPassword) => {

    var url = AppSettings.apiUrl + 'getUserToLogin';
    var data = JSON.stringify({'userName': userName, 'userPassword': userPassword})

    var succesCallback = (data) =>{
      var callbackData = data.data
      if(callbackData.loginStatus == true){
        var expires = AppSettings.userExpireTime;
        var now = Date.now();
        var schedule = now + expires * 1000;
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

    var errorCallback = () => {
      return false;
    }

    $http.post(url, data).then(succesCallback, errorCallback)
  };

  service.logOutUser = () => {
    var url = AppSettings.apiUrl + 'logOut';
    var succesCallback = () =>{ 
      sessionStorage.clear();
      $rootScope.userData = undefined;
      $location.path('/login');
    }
    var errorCallback = () => { return false; }
    var data = JSON.stringify({'userName': $rootScope.userData.userName})
    
    return $http.post(url, data).then(succesCallback, errorCallback)
  }

  service.loadAllNews = () => {

    var url = AppSettings.apiUrl + 'loadAllNews';
    var succesCallback = (data) =>{ return data.data }
    var errorCallback = () => { return false; }
    return $http.get(url).then(succesCallback, errorCallback)};

  service.loadOneNews = (postIdent) => {

    var url = AppSettings.apiUrl + 'loadOneNews';
    var succesCallback = (data) =>{ return data.data }
    var errorCallback = () => { return false; }
    var params = {
      postIdent: postIdent
    }
    return $http.get(url, {params: params}).then(succesCallback, errorCallback)};

  service.deleteNews = (postIdent) => {
    var url = AppSettings.apiUrl + 'deleteNews';
    var succesCallback = (data) =>{ return data.data }
    var errorCallback = () => { return false; }
    var params = {
      postIdent: postIdent
    }
    return $http.delete(url, {params: params}).then(succesCallback, errorCallback)
  };

  return service;

}

export default {
  name: 'DatabaseManageData',
  fn: DatabaseManageData
};
