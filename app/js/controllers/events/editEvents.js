function EditEventsController($scope, $rootScope, AppSettings) {
	'ngInject';

	$scope.editEventTitle = '';
	$scope.editEventShortText = '';
	$scope.editEventMiniature = null;
	$scope.editEventTags = [];
	$scope.editEventEventText = '';

  $scope.addTextColumn = [];
	$scope.addImageInput = [];

	$scope.addNewText = 0;
	$scope.addNewImage = 0;

	$scope.oneLineEditorOptions = AppSettings.oneLineEditorOptions;
	$scope.addTextEditorOptions = AppSettings.addTextEditorOptions;

  $scope.editEvent = {
	  eventTitle: $scope.editEventTitle,
	  eventIdent: undefined,
	  eventData: undefined,
	  eventtShort: $scope.editEventShortText,
		eventMiniature: $scope.editEventMiniature,
		eventStartDate: undefined,
		eventStopDate: undefined,
		eventStartTime: undefined,
		eventStopTime: undefined,
	  eventMiniatureSmall: undefined,
	  eventTags: $scope.editEventTags,
	  eventText: $scope.editEventText,
	  eventAuthor: $rootScope.userData.userName,
	  eventTeacher: undefined,
	  eventPublished: false,
	  widgets: []
	};

	$scope.$watch('editEventTitle', function(newValue) {
		$scope.editEvent.eventTitle = newValue;
  });

  $scope.$watch('editEventShortText', function(newValue) {
		$scope.editEvent.eventShort = newValue;
  });

  $scope.$watch('editEventTags', function(newValue) {
		$scope.editEvent.eventTags = newValue;
  });

  $scope.$watch('editEventText', function(newValue) {
		$scope.editEvent.eventText = newValue;
  });
}

export default {
	name: 'EditEventsController',
  fn: EditEventsController
};
