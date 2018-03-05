function AddSpecializationsController($scope, $rootScope, AppSettings) {
  'ngInject';

  $scope.addSpecializationName = 'Nazwa nowej specjalizacji';
  $scope.addSpecializationSchool = 'Nazwa szkoły';
  $scope.addSpecializationText = 'Długi opis specjalizacji';

  $scope.addTextColumn = [];
  $scope.addImageInput = [];

  $scope.addNewText = 0;
  $scope.addNewImage = 0;
  $scope.addNewDocument = 0;
  $scope.addNewGallery = 0;

  $scope.oneLineEditorOptions = AppSettings.oneLineEditorOptions;
  $scope.addTextEditorOptions = AppSettings.addTextEditorOptions;

  $scope.newSpecialization = {
    specializationName: $scope.addSpecializationName,
    specializationIdent: undefined,
    specializationText: $scope.addSpecializationText,
    specializationSchool: $scope.addSpecializationSchool,
    widgets: []
  };

  $scope.$watch('addSpecializationName', function (newValue) {
    $scope.newSpecialization.specializationName = newValue;
  });

  $scope.$watch('addSpecializationSchool', function (newValue) {
    $scope.newSpecialization.specializationSchool = newValue;
  });

  $scope.$watch('addSpecializationText', function (newValue) {
    $scope.newSpecialization.specializationText = newValue;
  });
}

export default {
  name: 'AddSpecializationsController',
  fn: AddSpecializationsController
};
