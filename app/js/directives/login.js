function loginForm($location, User) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/login.html',
		link: (scope) => {

			if (sessionStorage.getItem('session') == 'true') {
				$location.path('/');
				return false;
			}

			scope.submit = () => {

				if (scope.userName != undefined && scope.userPassword != undefined) {
					User.login.authorize(scope.userName, scope.userPassword);
				} else {
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
