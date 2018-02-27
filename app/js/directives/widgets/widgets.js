function postWidgets($compile, $filter, Widgets) {
	'ngInject';
	
	return {
		restrict: 'E',
		templateUrl: 'directives/widgets.html',
		link: (scope, el, attrs) => {

			scope.closePopup = () => {
				angular.element(document.querySelector('.newWidget')).remove();
			};

			scope.addImageToPost = (element) => {
				Widgets.manage.input(`addImageInput_${element}`, `addImage_${element}`);
			};

			scope.removeWidget = (type, ident) => {
				let arrayIndex = Widgets.manage.remove(type, ident, scope[attrs.object].widgets);
				scope[attrs.object].widgets.splice(arrayIndex, 1);
			};

			scope.addText = (editWidget, id, text) => {

				if(editWidget){
					scope.addNewText = id;
					scope.addTextColumn[scope.addNewText] = text;
				}

				Widgets.manage.text(scope, attrs.addform);

				if(!editWidget){
					scope[attrs.object].widgets.push({
						type: 'text',
						id: `columnText_${scope.addNewText}`,
						text: scope.addTextColumn[scope.addNewText]
					});
				}

				scope.addNewText++;
				scope.closePopup();

			};

			scope.addImage = (editWidget, id, image) => {
				let src = 'images/placeholder.jpg';

				if(editWidget){
					scope.addNewImage = id;
					src = `${scope.galleryUrl}/newsGallery/${image}`;
				}

				Widgets.manage.image(scope, attrs.addform, src);

				if(!editWidget){
					scope[attrs.object].widgets.push({
						type: 'image',
						id: `columnImage_${scope.addNewImage}`,
						image: scope.addImageInput[scope.addNewImage]
					});
				}

				scope.addNewImage++;
				scope.closePopup();
			};

			scope.addGallery = () => {
				scope.closePopup();
			};

			scope.addDocument = () => {
				scope.closePopup();
			};

		}
	};
}

export default {
	name: 'postWidgets',
	fn: postWidgets
};
