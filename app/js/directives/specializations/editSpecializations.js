function editSpecializations($location, $window, $compile, Specializations, Files, Widgets, Visual) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/specializations/editSpecializations.html',
    controller: 'EditSpecializationsController',
    link: (scope) => {
      if (($location.path().split('/')[2]) == 'edytuj-specjalizacje') {

        /* Open, Close, Edit elements etc. */

        document.querySelector('#addNewSpecializationButton').style.display = 'none';

        scope.openWidgetMenu = () => {
          angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="editSpecialization" addform=".editSpecializationsForm"></post-widgets>')(scope));
        };

        scope.addImageToPost = (element) => {
          Widgets.manage.input(`addImageInput_${element}`, `addImage_${element}`);
        };

        scope.removeWidget = (type, ident) => {
          let arrayIndex = Widgets.manage.remove(type, ident, scope.editSpecialization.widgets);
          scope.editSpecialization.widgets.splice(arrayIndex, 1);
        };

        /* ********************************************************* */

        /*Load specializations, define variable */
        Visual.loading.start();
        Specializations.load.one($location.path().split('/')[3]).then(data => {
          if (data.success && data.object.length > 0) {
            scope.specializations = data.object[0];
            scope.editSpecializationName = scope.specializations.specializationName;
            scope.editSpecializationSchool = scope.specializations.specializationSchool;
            scope.editSpecializationText = scope.specializations.specializationText;

            scope.editSpecialization = {
              specializationName: scope.specializations.specializationName,
              specializationIdent: scope.specializations.specializationIdent,
              specializationSchool: scope.specializations.specializationSchool,
              specializationText: scope.specializations.specializationText,
              widgets: scope.specializations.widgets
            };

            for (let value of scope.editSpecialization.widgets) {
              switch (value.type) {
                case 'image':
                  scope.addNewImage = value.id.split('_')[1];
                  let src = `${scope.galleryUrl}/specializationsGallery/${value.image}`;
                  Widgets.manage.image(scope, '.editSpecializationsForm', src);
                  scope.addNewImage++;
                  break;
                case 'text':
                  scope.addNewText = value.id.split('_')[1];
                  scope.addTextColumn[scope.addNewText] = value.text;
                  Widgets.manage.text(scope, '.editSpecializationsForm');
                  scope.addNewText++;
                break;
                case 'document':
                  scope.addNewDocument = value.id.split('_')[1];
                  //scope.addTextColumn[scope.addNewDocument] = value.text;
                  Widgets.manage.document(scope, '.editSpecializationsForm');
                  scope.addNewDocument++;
                break;
                case 'gallery':
                  scope.addNewGallery = value.id.split('_')[1];
                  //scope.addTextColumn[scope.addNewGallery] = value.text;
                  Widgets.manage.gallery(scope, '.editSpecializationsForm');
                  scope.addNewGallery++;
                break;
              }
            }
            Visual.loading.stop();
          } else {
            Visual.loading.stop();
            scope.specializations = [];
            $location.path('/specjalizacje');
            return false;
          }
        }, err => {
          console.log(err);
          Visual.loading.stop();
          scope.specializations = [];
          $location.path('/specjalizacje');
          return false;
        });

        /* ********************************************************* */

        scope.editSpecializations = () => {
          Visual.loading.start();
          let editSpec = scope.editSpecialization;
          if (editSpec.specializationName.length >= 1 && editSpec.specializationName.length <= 80 &&
            editSpec.specializationSchool.length >= 1 && editSpec.specializationSchool.length <= 300 &&
            editSpec.specializationText.length > 5) {

            for (let value of editSpec.widgets) {
              switch (value.type) {
                case 'text':
                  value.text = scope.addTextColumn[value.id.split('_')[1]];
                  break;
                case 'image':
                  if (document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0] != undefined) {
                    value.image = `${editSpec.specializationIdent}/widgets/${document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0].name}`;
                    let imageFolder = `./gallery/specializationsGallery/${editSpec.specializationIdent}/widgets`,
                      type = 'fullImage';
                    Files.upload.image(document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0], imageFolder, type).then(function () { });
                  }
                  break;
              }
            }

            Specializations.specialization.edit(editSpec).then(function (specializationData) {
              if (specializationData.success) {
                Visual.loading.stop();
                swal('Dobra robota!', specializationData.message, 'success').then(() => {
                  $window.location.reload();
                });
              }
            }, err => {
              Visual.loading.stop();
              swal('Upss!', err, 'error');
            });
          } else {
            Visual.loading.stop();
            swal('Uwaga!', 'Uzupełnij wszystkie wymagane pola!', 'warning');
          }
        };
      }
    }
  };
}

export default {
  name: 'editSpecializations',
  fn: editSpecializations
};
