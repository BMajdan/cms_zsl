function dashboardMenu($location, Visual, User) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/dashboard.html',
		link: (scope) => {

			scope.logout = function () {
				User.logout(true);
			};

			if (angular.element(document.querySelector('.sidebar'))[0] != undefined) {
				angular.element(window).bind('resize', function () {
					Visual.responsiveMenu();
				});
				Visual.responsiveMenu();
			}
			Visual.activeMenu();
		}
	};
}

export default {
	name: 'dashboardMenu',
	fn: dashboardMenu
};
