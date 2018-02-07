function showEvents($location, $filter, DatabaseManageData) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/showEvents.html',
    link: (scope) => {

      document.getElementById('addNewEventButton').style.display = 'block'

    	if(($location.path().split('/')[2]) === undefined){
    		DatabaseManageData.loadAllEvents().then(function(data){
	    		if(data.loadEventsStatus){
	    			scope.eventsData = data.loadEventsData;
	    		}else{
	    			scope.eventsData = [];
	    		}
	    	});
    	}

    	scope.editEvent = (eventIdent) => {
    		$location.path('/wydarzenia/edytuj-wydarzenie/' + eventIdent);
    		return false;
    	}

    	scope.removeEvent = (eventIdent) => {
    		DatabaseManageData.deleteEvent(eventIdent).then(function(data){
            if(data.deleteEventsStatus){
              alert(data.deleteEventMessage)
              let found = $filter('ArrayFilter')('eventIdent', eventIdent, scope.eventsData);
              scope.eventsData.splice(found, 1)
            }	
        	})
    	}
    }
  };
}

export default {
  name: 'showEvents',
  fn: showEvents
};
