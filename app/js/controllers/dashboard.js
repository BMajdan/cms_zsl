function DashboardController($scope, $compile, $rootScope, $location, UserExpireTime, AppSettings) {
	'ngInject';

	$scope.galleryUrl = AppSettings.galleryUrl;
	$scope.newsManage = angular.element(document.querySelector('#news-manage'));
	$scope.eventsManage = angular.element(document.querySelector('#events-manage'));
	$scope.specializationsManage = angular.element(document.querySelector('#specializations-manage'));

	$scope.addTextColumn = [];
	$scope.addImageInput = [];

	if (($location.path().split('/')[2]) == 'edytuj-post') {
		$scope.newsManage.append($compile('<edit-news></edit-news>')($scope));
	} else if (($location.path().split('/')[2]) == 'dodaj-nowy-post') {
		$scope.newsManage.append($compile('<add-news></add-news>')($scope));
	} else if (($location.path().split('/')[1]) == 'aktualnosci') {
		$scope.newsManage.append($compile('<show-news></show-news>')($scope));
	}

	if (($location.path().split('/')[2]) == 'edytuj-wydarzenie') {
		$scope.eventsManage.append($compile('<edit-events></edit-events>')($scope));
	} else if (($location.path().split('/')[2]) == 'dodaj-nowe-wydarzenie') {
		$scope.eventsManage.append($compile('<add-events></add-events>')($scope));
	} else if (($location.path().split('/')[1]) == 'wydarzenia') {
		$scope.eventsManage.append($compile('<show-events></show-events>')($scope));
	}

	if (($location.path().split('/')[2]) == 'edytuj-specjalizacje') {
		$scope.specializationsManage.append($compile('<edit-specializations></edit-specializations>')($scope));
	} else if (($location.path().split('/')[2]) == 'dodaj-nowa-specjalizacje') {
		$scope.specializationsManage.append($compile('<add-specializations></add-specializations>')($scope));
	} else if (($location.path().split('/')[1]) == 'specjalizacje') {
		$scope.specializationsManage.append($compile('<show-specializations></show-specializations>')($scope));
	}

	UserExpireTime.websiteFunctions();
}

export default {
	name: 'DashboardController',
	fn: DashboardController
};
