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

	service.loadingScreen = {
		start: () => {
			angular.element(document.querySelector('.loadingOverlay'))[0].style.display = 'block';
		},
		stop: () =>{
			angular.element(document.querySelector('.loadingOverlay'))[0].style.display = 'none';
		}
	};

	service.notifications = {
		input: (title, icon, element, placeholder, type, value, id) => {
			let succesCallback = (data) => { return data; };
			let errorCallback = (err) => { return err; };
			return swal({
				title: title,
				icon: icon,
				content: {
					element: element,
					attributes: {
						placeholder: placeholder,
						type: type,
						value: value,
						id: id
					},
				},
				buttons: {
					cancel: {
						text: 'Anuluj',
						value: 3,
						visible: true,
						closeModal: true,
					},
					confirm: {
						text: 'Potwierdź'
					}
				}
			}).then(succesCallback, errorCallback);
		},

		asking: (title, text, icon, buttons, dangerMode) => {
			let succesCallback = (data) => { return data; };
			let errorCallback = (err) => { return err; };
			return swal({
				title: title,
				text: text,
				icon: icon,
				buttons: buttons,
				dangerMode: dangerMode,
			}).then(succesCallback, errorCallback);
		}
	};

	return service;

}

export default {
	name: 'VisualSiteService',
	fn: VisualSiteService
};
