function editSpecializations($location, $window, $compile, SpecializationsDatabase, UploadFiles, WidgetsService) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/specializations/editSpecializations.html',
    controller: 'EditSpecializationsController',
    link: (scope) => {
      if (($location.path().split('/')[2]) == 'edytuj-specjalizacje') {
        document.querySelector('#addNewSpecializationButton').style.display = 'none';

        SpecializationsDatabase.loadOneSpecialization($location.path().split('/')[3]).then(function (data) {
          if (data.loadSpecializationsStatus && data.loadSpecializationsData.length > 0) {
            scope.specializations = data.loadSpecializationsData[0];
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

            for (let i = 0; i < scope.editSpecialization.widgets.length; i++) {
              if (scope.editSpecialization.widgets[i].type == 'image') {
                scope.addNewImage = scope.editSpecialization.widgets[i].id.split('_')[1];
                WidgetsService.insertImageBlock(scope, '.editSpecializationsForm', 'specializationsGallery', scope.editSpecialization.widgets[i].image);
                scope.addNewImage++;
              } else if (scope.editSpecialization.widgets[i].type == 'text') {
                scope.addNewText = scope.editSpecialization.widgets[i].id.split('_')[1];
                scope.addTextColumn[scope.addNewText] = scope.editSpecialization.widgets[i].text;
                WidgetsService.insertInputBlock(scope, '.editSpecializationsForm');
                scope.addNewText++;
              }
            }
          } else {
            scope.specializations = [];
            $location.path('/specjalizacje');
            return false;
          }
        });

        scope.openWidgetMenu = () => {
          angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="editSpecialization" addform=".editSpecializationsForm"></post-widgets>')(scope));
        };

        scope.removeWidget = (type, ident) => {
          let arrayIndex = WidgetsService.removeWidget(type, ident, scope.editSpecialization.widgets);
          scope.editSpecialization.widgets.splice(arrayIndex, 1);
        };

        scope.editSpecializations = () => {

          if (scope.editSpecialization.specializationName.length >= 1 && scope.editSpecialization.specializationName.length <= 80 &&
            scope.editSpecialization.specializationSchool.length >= 1 && scope.editSpecialization.specializationSchool.length <= 300 &&
            scope.editSpecialization.specializationText.length > 5) {

              for (let i = 0; i < scope.editSpecialization.widgets.length; i++) {
                let data = scope.editSpecialization.widgets[i];
                switch (scope.editSpecialization.widgets[i].type) {
                  case 'text':
                    scope.editSpecialization.widgets[i].text = scope.addTextColumn[data.id.split('_')[1]];
                    break;
                  case 'image':
                    if (document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0] != undefined) {
                      scope.editSpecialization.widgets[i].image = scope.editSpecialization.specializationIdent + '/widgets/' + document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0].name;
                      let imageFolder = './gallery/specializationsGallery/' + scope.editSpecialization.specializationIdent + '/widgets';
                      let type = 'fullImage';
                      UploadFiles.uploadImage(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0], imageFolder, type).then(function () { });
                    }
                    break;
                }
              }

              SpecializationsDatabase.editSpecialization(scope.editSpecialization).then(function (specializationsData) {
                if (specializationsData.editSpecializationsStatus) {
                  alert('Specjalizacja została poprawnie edytowana');
                  $window.location.reload();
                }
              });
            } else {
              alert('Uzupełnij puste pola!');
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
