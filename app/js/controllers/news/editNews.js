function EditNewsController($scope, $rootScope, AppSettings) {
	'ngInject';

  $scope.editArticleTitle = '';
  $scope.editArticleShortText = '';
  $scope.editPostMiniature = null;
  $scope.editArticleTags = [];
  $scope.editArticlePostText = '';

  $scope.addTextColumn = [];
  $scope.addImageInput = [];

  $scope.addNewText = 0;
	$scope.addNewImage = 0;
	
	$scope.oneLineEditorOptions = AppSettings.oneLineEditorOptions;
	$scope.addTextEditorOptions = AppSettings.addTextEditorOptions;

  $scope.editPost = {
		postTitle: $scope.editArticleTitle,
		postIdent: undefined,
		postData: undefined,
		postShort: $scope.editArticleShortText,
		postMiniature: $scope.editPostMiniature,
		postMiniatureSmall: undefined,
		postTags: $scope.editArticleTags,
		postText: $scope.editArticlePostText,
		postAuthor: $rootScope.userData.userName,
		postTeacher: undefined,
		postPublished: false,
		widgets: []
  };

  $scope.$watch('editArticleTitle', function(newValue) {
    $scope.editPost.postTitle = newValue;
  });

  $scope.$watch('editArticleShortText', function(newValue) {
    $scope.editPost.postShort = newValue;
  });

  $scope.$watch('editArticleTags', function(newValue) {
    $scope.editPost.postTags = newValue;
  });

  $scope.$watch('editArticlePostText', function(newValue) {
    $scope.editPost.postText = newValue;
  });
}

export default {
	name: 'EditNewsController',
  	fn: EditNewsController
};
