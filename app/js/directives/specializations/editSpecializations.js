function editSpecializations($location, $window, $compile, SpecializationsDatabase, UploadFiles, WidgetsService, VisualSiteService) {
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

        scope.removeWidget = (type, ident) => {
          let arrayIndex = WidgetsService.removeWidget(type, ident, scope.editSpecialization.widgets);
          scope.editSpecialization.widgets.splice(arrayIndex, 1);
        };

        /* ********************************************************* */

        /*Load specializations, define variable */
        VisualSiteService.loadingScreen.start();
        SpecializationsDatabase.loadOneSpecialization($location.path().split('/')[3]).then(data => {
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
              if (value.type == 'image') {
                scope.addNewImage = value.id.split('_')[1];
                WidgetsService.insertImageBlock(scope, '.editSpecializationsForm', 'specializationsGallery', value.image);
                scope.addNewImage++;
              } else if (value.type == 'text') {
                scope.addNewText = value.id.split('_')[1];
                scope.addTextColumn[scope.addNewText] = value.text;
                WidgetsService.insertInputBlock(scope, '.editSpecializationsForm');
                scope.addNewText++;
              }
            }
            VisualSiteService.loadingScreen.stop();
          } else {
            VisualSiteService.loadingScreen.stop();
            scope.specializations = [];
            $location.path('/specjalizacje');
            return false;
          }
        }, err => {
          console.log(err);
          VisualSiteService.loadingScreen.stop();
          scope.specializations = [];
          $location.path('/specjalizacje');
          return false;
        });

        /* ********************************************************* */

        scope.editSpecializations = () => {
          VisualSiteService.loadingScreen.start();
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
                    UploadFiles.uploadImage(document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0], imageFolder, type).then(function () { });
                  }
                  break;
              }
            }

            SpecializationsDatabase.editSpecialization(editSpec).then(function (specializationData) {
              if (specializationData.success) {
                VisualSiteService.loadingScreen.stop();
                swal('Dobra robota!', specializationData.message, 'success').then(() => {
                  $window.location.reload();
                });
              }
            }, err => {
              VisualSiteService.loadingScreen.stop();
              swal('Upss!', err, 'error');
            });
          } else {
            VisualSiteService.loadingScreen.stop();
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
