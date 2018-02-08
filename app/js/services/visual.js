function VisualSiteService($location) {
	'ngInject';

	const service = {};

	service.responsiveMenu = () => {

		let sidebar = angular.element(document.querySelector('.sidebar'))[0];
		let sidebarIcon = angular.element(document.querySelector('.sidebar-icon'))[0];
		let rightIcon = angular.element(document.querySelector('.fa-angle-double-right'))[0];

		let openMenuStatus = false;
		if (window.innerWidth <= 767 && sidebar != undefined) {
			sidebar.style.left = '-200px';
			sidebarIcon.style.display = 'block';

			sidebarIcon.onclick = function () {
				if (openMenuStatus == false) {
					sidebar.style.left = '0px';
					sidebarIcon.style.left = '210px';
					rightIcon.style.transform = 'rotate(180deg)';
					openMenuStatus = true;
				} else {
					sidebar.style.left = '-200px';
					sidebarIcon.style.left = '10px';
					rightIcon.style.transform = 'rotate(360deg)';
					openMenuStatus = false;
				}
			};
		} else {
			if (sidebar != undefined) {
				sidebar.style.left = '0px';
				sidebarIcon.style.display = 'none';
				rightIcon.style.transform = 'rotate(360deg)';
				sidebarIcon.style.left = '10px';
				openMenuStatus = false;
			}
		}
	};

	service.activeMenu = () => {
		switch ($location.path().split('/')[1]) {
			case '':
				document.querySelector('.przeglad').className += ' active';
				break;
			case 'przeglad':
				document.querySelector('.przeglad').className += ' active';
				break;
			case 'aktualnosci':
				document.querySelector('.aktualnosci').className += ' active';
				break;
			case 'wydarzenia':
				document.querySelector('.wydarzenia').className += ' active';
				break;
			case 'specjalizacje':
				document.querySelector('.specjalizacje').className += ' active';
				break;
			case 'dokumenty':
				document.querySelector('.dokumenty').className += ' active';
				break;
			case 'galeria':
				document.querySelector('.galeria').className += ' active';
				break;
			case 'uzytkownik':
				document.querySelector('.uzytkownik').className += ' active';
				break;
		}
	};

	return service;

}

export default {
	name: 'VisualSiteService',
	fn: VisualSiteService
};
