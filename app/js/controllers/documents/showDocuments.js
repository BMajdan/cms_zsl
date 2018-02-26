function ShowDocumentsController($scope, AppSettings) {
  'ngInject';

  $scope.documentDescription = 'Wpisz opis dokumentu...';
  $scope.documents = [];

  $scope.document = {
    name: undefined,
    description: $scope.documentDescription,
    class: undefined,
    file: undefined
  };

  $scope.oneLineEditorOptions = AppSettings.oneLineEditorOptions;

}

export default {
  name: 'ShowDocumentsController',
  fn: ShowDocumentsController
};
