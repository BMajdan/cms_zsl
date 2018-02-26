function showEvents($location, $filter, EventsDatabase, VisualSiteService) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/events/showEvents.html',
		link: (scope) => {

			document.getElementById('addNewEventButton').style.display = 'block';

			if (($location.path().split('/')[2]) === undefined) {
				VisualSiteService.loadingScreen.start();
				EventsDatabase.loadAllEvents().then(data => {
					if (data.success) {
						scope.eventsData = data.object;
						for (let value of scope.eventsData) {
							value.display = true;
						}
						VisualSiteService.loadingScreen.stop();
					} else {
						scope.eventsData = [];
						VisualSiteService.loadingScreen.stop();
					}
				}, err => {
					VisualSiteService.loadingScreen.stop();
					scope.eventsData = [];
					swal('Upss!', err, 'error');
				});
			}

			scope.editEvent = (eventIdent) => {
				$location.path(`/wydarzenia/edytuj-wydarzenie/${eventIdent}`);
				return false;
			};

			scope.removeEvent = (eventIdent) => {
				VisualSiteService.loadingScreen.start();
				EventsDatabase.deleteEvent(eventIdent).then(data => {
					if (data.success) {
						let found = $filter('ArrayFilter')('eventIdent', eventIdent, scope.eventsData);
						scope.eventsData.splice(found, 1);
						swal('Dobra robota!', data.message, 'success')
						VisualSiteService.loadingScreen.stop();
					}else{
						VisualSiteService.loadingScreen.stop();
						swal('Upss!', 'Coś poszło nie tak', 'error');
					}
				}, err => {
					VisualSiteService.loadingScreen.stop();
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
