function UserExpireTime($rootScope, $location, $interval, AppSettings, DatabaseManageData) {
  'ngInject';

  const service = {};

  service.checkStorage = () => {

    window.onbeforeunload = () => {
      DatabaseManageData.logOutUser();
      $interval.cancel($rootScope.checkInterval);
      $rootScope.checkInterval = undefined;
      return false;
    }

    window.onclick = () => {
      service.extendUserExpire();
    }

    window.onkeypress = () => {
      service.extendUserExpire();
    }

    if(sessionStorage.getItem('userName') == undefined){
      sessionStorage.clear();
      $rootScope.userData = undefined;
      $location.path('/login');
    }else{
      $rootScope.userData = {
        isLogin: sessionStorage.getItem('isLogin'),
        userName: sessionStorage.getItem('userName'),
        userPermission: sessionStorage.getItem('userData'),
        sessionTime: sessionStorage.getItem('sessionTime')
      }
      DatabaseManageData.logInUser($rootScope.userData.userName)
    }
  }

  service.userExpire = () => {
    service.extendUserExpire();
    $rootScope.checkInterval = $interval(function(){
      if(!service.chechUserExpire()){
        $interval.cancel($rootScope.checkInterval);
        $rootScope.checkInterval = undefined;
        DatabaseManageData.logOutUser(true);
      };
    },1000)
  }

  service.extendUserExpire = () => {
    let expires = AppSettings.userExpireTime;
    let now = Date.now();
    let schedule = now + expires * 1000;
    sessionStorage.setItem('sessionTime', schedule);
  }

  service.chechUserExpire = () => {
    let now = Date.now();
    let expiresIn = sessionStorage.getItem('sessionTime');
    if(expiresIn === undefined || expiresIn === null){
      $interval.cancel($rootScope.checkInterval);
      $rootScope.checkInterval = undefined;
      return false;
    }

    if(expiresIn < now){
      DatabaseManageData.logOutUser(true);
      $interval.cancel($rootScope.checkInterval);
      $rootScope.checkInterval = undefined;
      return false;
    }else{
      return true;
    }
  };

  return service;

}

export default {
  name: 'UserExpireTime',
  fn: UserExpireTime
};
