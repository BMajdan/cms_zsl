function Widgets($compile, $filter) {
	'ngInject';

	const service = {};

	service.manage = {
		input: (input, out) => {
			document.getElementById(input).click();
			document.getElementById(input).onchange = function () {
				let vals = this.value,
					val = vals.length ? vals.split('\\').pop() : '';
				document.getElementById(out).value = val;
				let reader = new FileReader();
				reader.onload = function () {
					let dataURL = reader.result;
					let output = document.getElementById(out);
					output.src = dataURL;
				};
				reader.readAsDataURL(document.getElementById(input).files[0]);
			};
		},
		image: (scope, form, src) => {
			scope.form = angular.element(document.querySelector(form));
			scope.form.append($compile(`
			<div id="columnImage_${scope.addNewImage}">
				<h3 class="widgetIndent">Widget: Kolumna ze zdjęciem <span class="removeWidget" ng-click="removeWidget(2, ${scope.addNewImage})">[Usuń widget]</span></h3>
				<div class="col-md-12[attrs.object]Image">
					<div class="postImage">
						<img alt="new column image" ng-src="${src}" class="addImagePost img-responsive" ng-click="addImageToPost(${scope.addNewImage}); $event.stopPropagation();" id="addImage_${scope.addNewImage}">
						<input type="file" ng-model="addImageInput[${scope.addNewImage}]" id="addImageInput_${scope.addNewImage}" class="hiddenInput" accept="image/*">
					</div>
				</div>
			</div>`)(scope));
		},
		text: (scope, form) => {
			scope.form = angular.element(document.querySelector(form));
			scope.form.append($compile(`
			<div id="columnText_${scope.addNewText}">
				<h3 class="widgetIndent">Widget: Kolumna tekstowa <span class="removeWidget" ng-click="removeWidget(1, ${scope.addNewText})">[Usuń widget]</span></h3>
				<div class="row">
					<div class="col-md-12 inputBox">
						<div ui-tinymce="addTextEditorOptions" ng-model="addTextColumn[${scope.addNewText}]" ></div>
					</div>
				</div>
			</div>`)(scope));
		},
		document: () => {

		},
		gallery: () => {

		},
		remove: (type, ident, object) => {
			switch (type) {
				case 1:
					angular.element(document.getElementById(`columnText_${ident}`))[0].remove();
					return $filter('ArrayFilter')('id', `columnText_${ident}`, object);
				case 2:
					angular.element(document.getElementById(`columnImage_${ident}`))[0].remove();
					return $filter('ArrayFilter')('id', `columnImage_${ident}`, object);
				case 3:
					break;
				case 4:
					break;
			}
		}
	};

	return service;

}

export default {
	name: 'Widgets',
	fn: Widgets
};
