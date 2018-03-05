function AddNewsController($scope, $rootScope, AppSettings) {
  'ngInject';

  $scope.addArticleTitle = 'Tytuł nowego posta';
  $scope.addArticleShortText = 'Krótki opis posta';
  $scope.addPostMiniature = null;
  $scope.addArticleTags = [];
  $scope.addArticlePostText = 'Długi opis posta';

  $scope.addTextColumn = [];
  $scope.addImageInput = [];

  $scope.addNewText = 0;
  $scope.addNewImage = 0;
  $scope.addNewDocument = 0;
  $scope.addNewGallery = 0;

  $scope.oneLineEditorOptions = AppSettings.oneLineEditorOptions;
  $scope.addTextEditorOptions = AppSettings.addTextEditorOptions;

  $scope.newPost = {
    postTitle: $scope.addArticleTitle,
    postIdent: undefined,
    postData: undefined,
    postShort: $scope.addArticleShortText,
    postMiniature: $scope.addPostMiniature,
    postMiniatureSmall: undefined,
    postTags: $scope.addArticleTags,
    postText: $scope.addArticlePostText,
    postAuthor: undefined,
    postTeacher: undefined,
    postPublished: false,
    widgets: []
  };

  $scope.$watch('addArticleTitle', function (newValue) {
    $scope.newPost.postTitle = newValue;
  });

  $scope.$watch('addArticleShortText', function (newValue) {
    $scope.newPost.postShort = newValue;
  });

  $scope.$watch('addArticleTags', function (newValue) {
    $scope.newPost.postTags = newValue;
  });

  $scope.$watch('addArticlePostText', function (newValue) {
    $scope.newPost.postText = newValue;
  });
}

export default {
  name: 'AddNewsController',
  fn: AddNewsController
};
