function AddNewsController($scope, $rootScope, UserExpireTime) {
	'ngInject';

  	$scope.addArticleTitle = 'Tytuł nowego posta';
  	$scope.addArticleShortText = 'Krótki opis posta';
  	$scope.addPostMiniature;
  	$scope.addArticleTags = [];
  	$scope.addArticlePostText = 'Długi opis posta';

  	$scope.addTextColumn = [];
  	$scope.addImageInput = [];

    $scope.addNewText = 0;
    $scope.addNewImage = 0;

  	$scope.newPost = {
      postTitle: $scope.addArticleTitle,
      postIdent: undefined,
      postData: undefined,
      postShort: $scope.addArticleShortText,
      postMiniature: $scope.addPostMiniature,
      postMiniatureSmall: undefined,
      postTags: $scope.addArticleTags,
      postText: $scope.addArticlePostText,
      postAuthor: $rootScope.userData.userName,
      postTeacher: undefined,
      postPublished: false,
      widgets: []
    }

    $scope.$watch('addArticleTitle', function(newValue) {
    	$scope.newPost.postTitle = newValue;
  	});

  	$scope.$watch('addArticleShortText', function(newValue) {
    	$scope.newPost.postShort = newValue;
  	});

  	$scope.$watch('addArticleTags', function(newValue) {
    	$scope.newPost.postTags = newValue;
  	});

  	$scope.$watch('addArticlePostText', function(newValue) {
    	$scope.newPost.postText = newValue;
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
	name: 'AddNewsController',
  	fn: AddNewsController
};
