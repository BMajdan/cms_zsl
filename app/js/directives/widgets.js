function postWidgets($compile, $filter) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/widgets.html',
    link: (scope, el, attrs) => {

      scope.closePopup = () => {
        angular.element(document.querySelector('.newWidget')).remove();
      }

      scope.removeWidget = (type, ident) => {
        console.log(type, ident)
        switch(type){
          case 1:
            angular.element(document.getElementById('columnText_' + ident))[0].remove();
            let arrayIndex = $filter('ArrayFilter')('id', 'columnText_' + ident, scope[attrs.object].widgets)
            scope[attrs.object].widgets.splice(arrayIndex, 1)
            break;
          case 2:
            angular.element(document.getElementById('columnImage_' + ident))[0].remove();
            arrayIndex = $filter('ArrayFilter')('id', 'columnImage_' + ident, scope[attrs.object].widgets)
            scope[attrs.object].widgets.splice(arrayIndex, 1)
            break;
          case 3:
            break;
          case 4:
            break;
        }
      }

      scope.addText = (editWidget, id, text) => {

        if(editWidget){
          scope.addNewText = id;
          scope.addTextColumn[scope.addNewText] = text
        }

        scope.form = angular.element(document.querySelector(attrs.addform))
        scope.form.append($compile('<div id="columnText_' + scope.addNewText + '">'
          + '<h3 class="widgetIndent">Widget: Kolumna tekstowa <span class="removeWidget" ng-click="removeWidget(1, ' + scope.addNewText + ')">[Usuń widget]</span></h3>'
          +   '<div class="row">'
          +     '<div class="col-md-12 inputBox">'
          +       '<div ui-tinymce="addTextEditorOptions" ng-model="addTextColumn[' + scope.addNewText + ']" ></div>'
          +     '</div>'
          +   '</div>'
          + '</div>'
        )(scope));

        if(!editWidget){
          scope[attrs.object].widgets.push({
            type: 'text',
            id: 'columnText_' + scope.addNewText,
            text: scope.addTextColumn[scope.addNewText]
          })
        }

        scope.addNewText++;
        scope.closePopup();

      }

      scope.addImageToPost = (element) => {
        document.getElementById('addImageInput_' + element).onchange = function(){
          let vals = this.value,
          val = vals.length ? vals.split('\\').pop() : '';

          document.getElementById('addImage_' + element).value = val;

          let reader = new FileReader();
          reader.onload = function(){
            let dataURL = reader.result;
            let output = document.getElementById('addImage_' + element);
            output.src = dataURL;
          };
          reader.readAsDataURL(document.getElementById('addImageInput_' + element).files[0]);
        }

        document.getElementById('addImageInput_' + element).click();
      }

      scope.addImage = (editWidget, id, image) => {
        
        let src = 'images/placeholder.jpg';

        if(editWidget){
          scope.addNewImage = id;
          src = scope.galleryUrl + '/newsGallery/' + image;
        }

        scope.form = angular.element(document.querySelector(attrs.addform))
        scope.form.append($compile('<div id="columnImage_' + scope.addNewImage + '">'
          + '<h3 class="widgetIndent">Widget: Kolumna ze zdjęciem <span class="removeWidget" ng-click="removeWidget(2, ' + scope.addNewImage + ')">[Usuń widget]</span></h3>'
          +   '<div class="col-md-12[attrs.object]Image">'
          +     '<div class="postImage">'
          +       '<img alt="new column image" ng-src="' + src + '" class="addImagePost img-responsive" ng-click="addImageToPost(' + scope.addNewImage + '); $event.stopPropagation();" id="addImage_' + scope.addNewImage + '">'
          +       '<input type="file" ng-model="addImageInput[' + scope.addNewImage + ']" id="addImageInput_' + scope.addNewImage + '" class="hiddenInput" accept="image/*">'
          +     '</div>'
          +   '</div>'
          + '</div>'
        )(scope));

        if(!editWidget){
          scope[attrs.object].widgets.push({
            type: 'image',
            id: 'columnImage_' + scope.addNewImage,
            image: scope.addImageInput[scope.addNewImage]
          })
        }

        scope.addNewImage++;
        scope.closePopup();
      }

      scope.addGallery = () => {
        scope.closePopup();
      }

      scope.addDocument = () => {
        scope.closePopup();
      }

    }
  };
}

export default {
  name: 'postWidgets',
  fn: postWidgets
};
