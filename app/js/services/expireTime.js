function UserExpireTime($rootScope, $location, $interval, AppSettings, UserDatabase) {
	'ngInject';

	const service = {};

	service.checkStorage = () => {

		window.onbeforeunload = () => {
			$interval.cancel($rootScope.checkInterval);
			$rootScope.checkInterval = undefined;
			UserDatabase.logOutUser();
			return false;
		};

		window.onclick = () => {
			service.extendUserExpire();
		};

		window.onkeypress = () => {
			service.extendUserExpire();
		};

		if (sessionStorage.getItem('userName') == undefined) {
			sessionStorage.clear();
			$rootScope.userData = undefined;
			$location.path('/login');
		} else {
			$rootScope.userData = {
				isLogin: sessionStorage.getItem('isLogin'),
				userName: sessionStorage.getItem('userName'),
				sessionTime: sessionStorage.getItem('sessionTime')
			};
			UserDatabase.logInUser($rootScope.userData.userName);
		}
	};

	service.userExpire = () => {
		service.extendUserExpire();
		$rootScope.checkInterval = $interval(function () {
			if (!service.chechUserExpire()) {
				$interval.cancel($rootScope.checkInterval);
				$rootScope.checkInterval = undefined;
				UserDatabase.logOutUser(true);
			}
		}, 1000);
	};

	service.extendUserExpire = () => {
		let expires = AppSettings.userExpireTime;
		let now = Date.now();
		let schedule = now + expires * 1000;
		sessionStorage.setItem('sessionTime', schedule);
	};

	service.chechUserExpire = () => {
		let now = Date.now();
		let expiresIn = sessionStorage.getItem('sessionTime');
		if (expiresIn === undefined || expiresIn === null) {
			$interval.cancel($rootScope.checkInterval);
			$rootScope.checkInterval = undefined;
			return false;
		}

		if (expiresIn < now) {
			$interval.cancel($rootScope.checkInterval);
			$rootScope.checkInterval = undefined;
			UserDatabase.logOutUser(true);
			return false;
		} else {
			return true;
		}
	};

	return service;

}

export default {
	name: 'UserExpireTime',
	fn: UserExpireTime
};
