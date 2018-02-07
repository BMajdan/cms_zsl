function EditEventsController($scope, $rootScope, UserExpireTime) {
	'ngInject';

  	$scope.editEventTitle = '';
  	$scope.editEventShortText = '';
  	$scope.editEventMiniature;
  	$scope.editEventTags = [];
  	$scope.editEventEventText = '';

  	$scope.addTextColumn = [];
    $scope.addImageInput = [];

    $scope.addNewText = 0;
    $scope.addNewImage = 0;

  	$scope.editEvent = {
      eventTitle: $scope.editEventTitle,
      eventIdent: undefined,
      eventData: undefined,
      eventtShort: $scope.editEventShortText,
      eventMiniature: $scope.editEventMiniature,
      eventMiniatureSmall: undefined,
      eventTags: $scope.editEventTags,
      eventText: $scope.editEventText,
      eventAuthor: $rootScope.userData.userName,
      eventTeacher: undefined,
      eventPublished: false,
      widgets: []
    }

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

  	$scope.oneLineEditorOptions = {
  		menubar: false,
  		inline: true,
  		toolbar: 'undo redo',
  		'force_br_newlines': false,
  		'force_p_newlines': false,
      'forced_root_block': '',
      'entity_encoding' : 'raw'
	  };

  	$scope.addTextEditorOptions = {
  		menubar: false,
  		theme: 'modern',
  		height: 500,
      'entity_encoding' : 'raw',
  		'force_p_newlines': false,
  		plugins: 'print preview autolink directionality visualblocks visualchars fullscreen link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
  		toolbar1: 'formatselect | bold italic strikethrough | link | numlist bullist outdent indent  | removeformat'
  	}
}

export default {
	  name: 'EditEventsController',
  	fn: EditEventsController
};
