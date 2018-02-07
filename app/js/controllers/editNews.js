function EditNewsController($scope, $rootScope, UserExpireTime) {
	'ngInject';

  	$scope.editArticleTitle = '';
  	$scope.editArticleShortText = '';
  	$scope.editPostMiniature;
  	$scope.editArticleTags = [];
  	$scope.editArticlePostText = '';

    $scope.addTextColumn = [];
    $scope.addImageInput = [];

    $scope.addNewText = 0;
    $scope.addNewImage = 0;

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
    }

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
	name: 'EditNewsController',
  	fn: EditNewsController
};
