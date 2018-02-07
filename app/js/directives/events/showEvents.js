function showEvents($location, $filter, EventsDatabase) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/events/showEvents.html',
    link: (scope) => {

      document.getElementById('addNewEventButton').style.display = 'block';

    	if(($location.path().split('/')[2]) === undefined){
    		EventsDatabase.loadAllEvents().then(function(data){
	    		if(data.loadEventsStatus){
						scope.eventsData = data.loadEventsData;
						for (let i = 0; i < scope.eventsData.length; i++) {
							scope.eventsData[i].display = true;
						}
	    		}else{
	    			scope.eventsData = [];
	    		}
	    	});
    	}

    	scope.editEvent = (eventIdent) => {
    		$location.path('/wydarzenia/edytuj-wydarzenie/' + eventIdent);
    		return false;
    	};

    	scope.removeEvent = (eventIdent) => {
    		EventsDatabase.deleteEvent(eventIdent).then(function(data){
            if(data.deleteEventStatus){
							alert(data.deleteEventMessage);
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
