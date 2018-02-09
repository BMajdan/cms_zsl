function UserDatabase($http, $location, $interval, AppSettings, $rootScope) {
	'ngInject';

	const service = {};

	/* Manage login user */

	service.authorize = (login, password) => {
		let url = `${AppSettings.apiUrl}authorize`;
		let data = JSON.stringify({ 'login': login, 'password': password });

		let succesCallback = ({data}) => {
			if (data.success) {
				let expires = AppSettings.userExpireTime;
				let now = Date.now();
				let schedule = now + expires * 1000;
				sessionStorage.setItem('sessionTime', schedule);
				sessionStorage.setItem('isLogin', true);
				sessionStorage.setItem('userName', login);
				$rootScope.userData = {
					userName: login,
					admin: undefined,
					token: data.token
				};
				$location.path('/');
			} else {
				alert(data.message);
			}
		};

		let errorCallback = (err) => { throw err; };
		$http.post(url, data).then(succesCallback, errorCallback);
	};

	/* LOGIN USER */

	service.shortLogin = (login) => {
		let url = `${AppSettings.apiUrl}short-login`;
		let data = JSON.stringify({ 'login': login });
		let succesCallback = ({data}) => {
			if(data.success){
				let expires = AppSettings.userExpireTime;
				let now = Date.now();
				let schedule = now + expires * 1000;
				sessionStorage.setItem('sessionTime', schedule);
				sessionStorage.setItem('isLogin', true);
				sessionStorage.setItem('userName', login);
				$rootScope.userData = {
					userName: login,
					admin: undefined,
					token: data.token
				};
			}
		};
		let errorCallback = (err) => { throw err; };
		$http.post(url, data).then(succesCallback, errorCallback);
	};

	service.logout = (removeSession) => {
		$interval.cancel($rootScope.checkInterval);
		let url = `${AppSettings.apiUrl}logout`;
		let succesCallback = ({data}) => {
			if(data.success){
				$interval.cancel($rootScope.checkInterval);
				if (removeSession) {
					$interval.cancel($rootScope.checkInterval);
					$rootScope.userData = undefined;
					sessionStorage.clear();
					$location.path('/login');
				}
				return false;
			}
		};
		let errorCallback = (err) => { throw err; };
		let data = JSON.stringify({ 'userName': $rootScope.userData.userName, 'token': $rootScope.userData.token });
		return $http.put(url, data).then(succesCallback, errorCallback);
	};

	return service;

}

export default {
	name: 'UserDatabase',
	fn: UserDatabase
};
