function AddEventsController($scope, $rootScope, AppSettings) {
  'ngInject';

  $scope.addEventTitle = 'Tytuł nowego wydarzenia';
  $scope.addEventShortText = 'Krótki opis wydarzenia';
  $scope.addEventMiniature = null;
  $scope.addEventTags = [];
  $scope.addEventText = 'Długi opis wydarzenia';

  $scope.addTextColumn = [];
  $scope.addImageInput = [];

  $scope.addNewText = 0;
  $scope.addNewImage = 0;
  $scope.addNewDocument = 0;
  $scope.addNewGallery = 0;

  $scope.oneLineEditorOptions = AppSettings.oneLineEditorOptions;
  $scope.addTextEditorOptions = AppSettings.addTextEditorOptions;

  $scope.newEvent = {
    eventTitle: $scope.addEventTitle,
    eventIdent: undefined,
    eventData: undefined,
    eventStartDate: undefined,
    eventStopDate: undefined,
    eventStartTime: undefined,
    eventStopTime: undefined,
    eventShort: $scope.addEventShortText,
    eventMiniature: $scope.addEventMiniature,
    eventMiniatureSmall: undefined,
    eventTags: $scope.addEventTags,
    eventText: $scope.addEventText,
    eventAuthor: undefined,
    eventTeacher: undefined,
    eventPublished: false,
    widgets: []
  };

  $scope.$watch('addEventTitle', function (newValue) {
    $scope.newEvent.eventTitle = newValue;
  });

  $scope.$watch('addEventShortText', function (newValue) {
    $scope.newEvent.eventShort = newValue;
  });

  $scope.$watch('addEventTags', function (newValue) {
    $scope.newEvent.eventTags = newValue;
  });

  $scope.$watch('addEventText', function (newValue) {
    $scope.newEvent.eventText = newValue;
  });
}

export default {
  name: 'AddEventsController',
  fn: AddEventsController
};
