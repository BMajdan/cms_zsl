function loginForm($location, UserDatabase) {
	'ngInject';
	
	return {
		restrict: 'E',
		templateUrl: 'directives/login.html',
		link: (scope) => {

			if(localStorage.getItem('isLogin') == 'true'){
				$location.path('/');
				return false;
			}

			scope.submit = () => {

				if(scope.userName != undefined && scope.userPassword != undefined){
					UserDatabase.getUserToLogin(scope.userName, scope.userPassword);
				}else{
					alert('Podaj poprawny login i hasło!');
				}
			};
		}
	};
}

export default {
	name: 'loginForm',
	fn: loginForm
};
