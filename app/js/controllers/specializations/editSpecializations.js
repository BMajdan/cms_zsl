function EditSpecializationsController($scope, $rootScope, AppSettings) {
  'ngInject';

  $scope.editSpecializationName = '';
  $scope.editSpecializationSchool = '';
  $scope.editSpecializationText = '';

  $scope.editTextColumn = [];
  $scope.editImageInput = [];

  $scope.editNewText = 0;
  $scope.editNewImage = 0;

  $scope.oneLineEditorOptions = AppSettings.oneLineEditorOptions;
  $scope.addTextEditorOptions = AppSettings.addTextEditorOptions;

  $scope.editSpecialization = {
    specializationName: $scope.editSpecializationName,
    specializationIdent: undefined,
    specializationText: $scope.editSpecializationText,
    specializationSchool: $scope.editSpecializationSchool,
    widgets: []
  };

  $scope.$watch('editSpecializationName', function (newValue) {
    $scope.editSpecialization.specializationName = newValue;
  });

  $scope.$watch('editSpecializationSchool', function (newValue) {
    $scope.editSpecialization.specializationSchool = newValue;
  });

  $scope.$watch('editSpecializationText', function (newValue) {
    $scope.editSpecialization.specializationText = newValue;
  });
}

export default {
  name: 'EditSpecializationsController',
  fn: EditSpecializationsController
};
