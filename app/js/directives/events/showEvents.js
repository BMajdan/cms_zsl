function showEvents($location, $filter, Events, Visual) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/events/showEvents.html',
		link: (scope) => {

			document.getElementById('addNewEventButton').style.display = 'block';

			if (($location.path().split('/')[2]) === undefined) {
				Visual.loading.start();
				Events.load.all().then(data => {
					if (data.success) {
						scope.eventsData = data.object;
						for (let value of scope.eventsData) {
							value.display = true;
						}
						Visual.loading.stop();
					} else {
						scope.eventsData = [];
						Visual.loading.stop();
					}
				}, err => {
					Visual.loading.stop();
					scope.eventsData = [];
					swal('Upss!', err, 'error');
				});
			}

			scope.editEvent = (eventIdent) => {
				$location.path(`/wydarzenia/edytuj-wydarzenie/${eventIdent}`);
				return false;
			};

			scope.removeEvent = (eventIdent) => {
				let title = 'Czy jesteś pewien?', text = 'Czy na pewno usunąć to wydarzenie?!',
					icon = 'warning', buttons = ['Anuluj', 'Potwierdź'], dangerMode = true;

				Visual.notifications.asking(title, text, icon, buttons, dangerMode).then(buttonStatus => {
					if (buttonStatus) {
						Visual.loading.start();
						Events.manage.delete(eventIdent).then(data => {
							if (data.success) {
								let found = $filter('ArrayFilter')('eventIdent', eventIdent, scope.eventsData);
								scope.eventsData.splice(found, 1);
								swal('Dobra robota!', data.message, 'success');
								Visual.loading.stop();
							} else {
								Visual.loading.stop();
								swal('Upss!', 'Coś poszło nie tak', 'error');
							}
						}, err => {
							Visual.loading.stop();
							swal('Upss!', err, 'error');
						});

					} else {
						swal('Uff!', 'Wydarzenie nie zostało usunięte', 'info');
					}
				}, err => {
					swal('Upss!', err, 'error');
				});
			};
		}
	};
}

export default {
	name: 'showEvents',
	fn: showEvents
};
