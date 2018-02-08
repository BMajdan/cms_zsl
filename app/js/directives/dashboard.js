function dashboardMenu($location, VisualSiteService, UserDatabase) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/dashboard.html',
		link: (scope) => {

			scope.logOut = function () {
				UserDatabase.logOutUser(true);
			};

			if (angular.element(document.querySelector('.sidebar'))[0] != undefined) {
				angular.element(window).bind('resize', function () {
					VisualSiteService.responsiveMenu();
				});
				VisualSiteService.responsiveMenu();
			}

			VisualSiteService.activeMenu();
		}
	};
}

export default {
	name: 'dashboardMenu',
	fn: dashboardMenu
};
