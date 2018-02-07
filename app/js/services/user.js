function UserDatabase($http, $location, AppSettings, $rootScope) {
	'ngInject';

	const service = {};

	function generateKey(first, second){
		let number;
		 do { number = Math.floor(Math.random()*(second-first) + first); } while( number % 2 == 1 );
		 return number;
	}

	/* GET USER TO LOGIN */

	service.getUserToLogin = (userName, userPassword) => {

		let url = AppSettings.apiUrl + 'getUserToLogin';
		let data = JSON.stringify({'userName': userName, 'userPassword': userPassword, PkRTvG: generateKey(111, 200)});

		let succesCallback = (data) =>{
			let callbackData = data.data;
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
					};

					$location.path('/');
					return false;
				}catch(e){
					console.log('setSotrage: Error seting key');
					return false;
				}
			}else{
				alert(callbackData.loginMessage);
			}
		};

		let errorCallback = () => {
			return false;
		};

		$http.post(url, data).then(succesCallback, errorCallback);
	};

	/* LOGIN USER */

	service.logInUser = (userName) => {
		let url = AppSettings.apiUrl + 'userLogin';
		let data = JSON.stringify({'userName': userName, CwQssA: generateKey(51, 100)});
		let succesCallback = () =>{};
		let errorCallback = () => { return false; };
		$http.put(url, data).then(succesCallback, errorCallback);
	};

	service.logOutUser = (removeSession) => {
		let url = AppSettings.apiUrl + 'logOut';
		let succesCallback = () =>{ 
			if(removeSession){
				$rootScope.userData = undefined;
				sessionStorage.clear();
				$location.path('/login');
			}
			return false;
		};
		let errorCallback = () => { return false; };
		let data = JSON.stringify({'userName': $rootScope.userData.userName, xPosKw: generateKey(321, 400)});
		
		return $http.put(url, data).then(succesCallback, errorCallback);
	};

	return service;

}

export default {
	name: 'UserDatabase',
	fn: UserDatabase
};
