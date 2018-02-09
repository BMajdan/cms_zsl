function showEvents($location, $filter, EventsDatabase) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/events/showEvents.html',
		link: (scope) => {

			document.getElementById('addNewEventButton').style.display = 'block';

			if (($location.path().split('/')[2]) === undefined) {
				EventsDatabase.loadAllEvents().then(function (data) {
					if (data.success) {
						scope.eventsData = data.object;
						for (let value of scope.eventsData) {
							value.display = true;
						}
					} else {
						scope.eventsData = [];
					}
				});
			}

			scope.editEvent = (eventIdent) => {
				$location.path(`/wydarzenia/edytuj-wydarzenie/${eventIdent}`);
				return false;
			};

			scope.removeEvent = (eventIdent) => {
				EventsDatabase.deleteEvent(eventIdent).then(function (data) {
					if (data.success) {
						alert(data.message);
						let found = $filter('ArrayFilter')('eventIdent', eventIdent, scope.eventsData);
						scope.eventsData.splice(found, 1);
					}
				});
			};
		}
	};
}

export default {
	name: 'showEvents',
	fn: showEvents
};
