function UserExpireTime($location, $interval, AppSettings, DatabaseManageData) {
  'ngInject';

  const service = {};

  service.userExpire = () => {
    service.extendUserExpire();
    $scope.checkInterval = $interval(function(){
      if(!service.chechUserExpire()){
        $interval.cancel($scope.checkInterval);
        $scope.checkInterval = undefined;
      };
    },1000)
  }

  service.extendUserExpire = () => {
    var expires = AppSettings.userExpireTime;
    var now = Date.now();
    var schedule = now + expires * 1000;
    sessionStorage.setItem('sessionTime', schedule);
  }

  service.chechUserExpire = () => {
    var now = Date.now();
    var expiresIn = sessionStorage.getItem('sessionTime');
    if(expiresIn === undefined || expiresIn === null){
      expiresIn = 0;
    }

    if(expiresIn < now){
      DatabaseManageData.logOutUser();
      $interval.cancel($scope.checkInterval);
      $scope.checkInterval = undefined;
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
