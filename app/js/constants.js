const AppSettings = {
	appTitle: 'System zarzadzania trescia',
	apiUrl: 'http://192.168.0.199:4000/api/',
	galleryUrl: 'http://192.168.0.199:4000/gallery',
	userExpireTime: 15 * 60, // 60s * 60m * 3h
	oneLineEditorOptions: {
		menubar: false,
		inline: true,
		toolbar: 'undo redo',
		'force_br_newlines': false,
		'force_p_newlines': false,
		'forced_root_block': '',
		'entity_encoding': 'raw'
	},
	addTextEditorOptions: {
		menubar: false,
		theme: 'modern',
		height: 500,
		'entity_encoding': 'raw',
		'force_p_newlines': false,
		plugins: 'print preview autolink directionality visualblocks visualchars fullscreen link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
		toolbar1: 'formatselect | bold italic strikethrough | link | numlist bullist outdent indent  | removeformat'
	}
};

export default AppSettings;
