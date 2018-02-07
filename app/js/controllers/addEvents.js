function AddEventsController($scope, $rootScope, UserExpireTime) {
	'ngInject';

  	$scope.addEventTitle = 'Tytuł nowego wydarzenia';
  	$scope.addEventShortText = 'Krótki opis wydarzenia';
  	$scope.addEventMiniature;
  	$scope.addEventTags = [];
  	$scope.addEventText = 'Długi opis wydarzenia';

    $scope.addTextColumn = [];
    $scope.addImageInput = [];

    $scope.addNewText = 0;
    $scope.addNewImage = 0;

  	$scope.newEvent = {
      eventTitle: $scope.addEventTitle,
      eventIdent: undefined,
      eventData: undefined,
      eventShort: $scope.addEventShortText,
      eventMiniature: $scope.addEventMiniature,
      eventMiniatureSmall: undefined,
      eventTags: $scope.addEventTags,
      eventText: $scope.addEventText,
      eventAuthor: $rootScope.userData.userName,
      eventTeacher: undefined,
      eventPublished: false,
      widgets: []
    }

    $scope.$watch('addEventTitle', function(newValue) {
    	$scope.newEvent.eventTitle = newValue;
  	});

  	$scope.$watch('addEventShortText', function(newValue) {
    	$scope.newEvent.eventShort = newValue;
  	});

  	$scope.$watch('addEventTags', function(newValue) {
    	$scope.newEvent.eventTags = newValue;
  	});

  	$scope.$watch('addEventText', function(newValue) {
    	$scope.newEvent.eventText = newValue;
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
	name: 'AddEventsController',
  	fn: AddEventsController
};
