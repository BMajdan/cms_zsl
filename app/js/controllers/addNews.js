function AddNewsController($scope) {
	'ngInject';

  	$scope.addArticleTitle = 'Tytuł nowego posta';
  	$scope.addArticleShortText = 'Krótki opsi posta';
  	$scope.addArticleLongText = 'Długi opis posta';

  	$scope.oneLineEditorOptions = {
		menubar: false,
		inline: true,
		toolbar: 'undo redo',
		'force_br_newlines': false,
		'force_p_newlines': false,
      	'forced_root_block': '',
	};

	$scope.addTextEditorOptions = {
		menubar: false,
		  theme: 'modern',
		  height: 500,
		  'force_p_newlines': false,
		  plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
		  toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'
	}
}

export default {
	name: 'AddNewsController',
  	fn: AddNewsController
};
