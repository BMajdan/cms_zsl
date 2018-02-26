function UserDatabase($http, $location, $interval, AppSettings, $rootScope) {
	'ngInject';

	const service = {};

	/* Manage login user */

	service.authorize = (login, password) => {
		let url = `${AppSettings.apiUrl}authorize`;
		let data = JSON.stringify({ 'login': login, 'password': password });

		let succesCallback = ({data}) => {
			if (data.success) {
				sessionStorage.setItem('session', true);
				sessionStorage.setItem('user', login);
				$rootScope.userData = {
					userName: login,
					admin: undefined,
					sessionTime: (AppSettings.userExpireTime * 1000) + Date.now() ,
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
		let succesCallback = ({data}) => { return data; };
		let errorCallback = (err) => { throw err; };
		return $http.post(url, data).then(succesCallback, errorCallback);
	};

	service.logout = (logoutType) => {
		let url = `${AppSettings.apiUrl}logout`;
		let succesCallback = ({data}) => {
			if(data.success){
				if(logoutType){
					$rootScope.userData = undefined;
					sessionStorage.clear();
					$location.path('/login');
				}
				return false;
			}
		};
		let errorCallback = (err) => { throw err; };
		let data = JSON.stringify({ 'login': $rootScope.userData.userName, 'token': $rootScope.userData.token });
		return $http.put(url, data).then(succesCallback, errorCallback);
	};

	return service;

}

export default {
	name: 'UserDatabase',
	fn: UserDatabase
};
