function UserExpireTime($rootScope, $location, $interval, AppSettings, User) {
	'ngInject';

	const service = {};

	service.websiteFunctions = () => {

		window.onbeforeunload = () => {
			User.logout(false);
		};

		window.onclick = () => {
			service.extendUserExpire();
		};

		window.onkeypress = () => {
			service.extendUserExpire();
		};

		if(sessionStorage.getItem('session') == 'true'){
			if (sessionStorage.getItem('user') != undefined){
				User.login.short(sessionStorage.getItem('user')).then(function(data) {
					if (data.success) {
						$rootScope.userData = {
							userName: sessionStorage.getItem('user'),
							admin: undefined,
							sessionTime: (AppSettings.userExpireTime * 1000) + Date.now(),
							token: data.token
						};
						$rootScope.checkSessionExpire = $interval(service.checkUserExpire, 1000);
					}
				});
			}else{
				$rootScope.userData = undefined;
				sessionStorage.clear();
				$location.path('/login');
			}
		}else{
			$rootScope.userData = undefined;
			sessionStorage.clear();
			$location.path('/login');
		}
	};

	service.extendUserExpire = () => {
		if (sessionStorage.getItem('session') == 'true' && $rootScope.userData.sessionTime != undefined) {
			$rootScope.userData.sessionTime = (AppSettings.userExpireTime * 1000) + Date.now();
		}else{
			$rootScope.userData = undefined;
			sessionStorage.clear();
			$location.path('/login');
		}
	};

	service.checkUserExpire = () => {
		if (sessionStorage.getItem('session') == 'true' && $rootScope.userData.sessionTime != undefined){
			let date = new Date();
			if(date >= $rootScope.userData.sessionTime){
				User.logout(true);
			}
		}else{
			$rootScope.userData = undefined;
			sessionStorage.clear();
			$location.path('/login');
		}
	};
	return service;
}

export default {
	name: 'UserExpireTime',
	fn: UserExpireTime
};
