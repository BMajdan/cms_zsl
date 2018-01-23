function DashboardController($scope, $location, UserExpireTime) {
    'ngInject';

    if(UserExpireTime.chechUserExpire()){
      $scope.userName = localStorage.getItem('userName');
      $scope.userPermission = localStorage.getItem('userData')
    }

    if(($location.path().split('/')[2]) == 'edytuj-post'){
      document.querySelector('show-news').style.display = 'none'
      document.querySelector('add-news').style.display = 'none'
    }else if(($location.path().split('/')[2]) == 'dodaj-nowy-post'){
      document.querySelector('show-news').style.display = 'none'
      document.querySelector('edit-news').style.display = 'none'
    }else if(($location.path().split('/')[1]) == 'aktualnosci'){
      document.querySelector('edit-news').style.display = 'none'
      document.querySelector('add-news').style.display = 'none'
    }

    UserExpireTime.userExpire();

}

export default {
	name: 'DashboardController',
  	fn: DashboardController
};
