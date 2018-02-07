function addSpecializations($location, $compile, SpecializationsDatabase, UploadFiles) {
  'ngInject';
  return {
    restrict: 'E',
    templateUrl: 'directives/specializations/addSpecializations.html',
    controller: 'AddSpecializationsController',
    link: (scope) => {
      if (($location.path().split('/')[2]) == 'dodaj-nowa-specjalizacje') {
        document.querySelector('#addNewSpecializationButton').style.display = 'none';

        scope.openWidgetMenu = () => {
          angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="newSpecialization" addform=".addSpecializationsForm"></post-widgets>')(scope));
        };

        scope.addSpecialization = () => {
          scope.newSpecialization.specializationIdent = (scope.newSpecialization.specializationName.trim().replace(/ /g, '-')).toLowerCase();

          if (scope.newSpecialization.specializationName.length >= 1 && scope.newSpecialization.specializationName.length <= 80 &&
            scope.newSpecialization.specializationSchool.length >= 1 && scope.newSpecialization.specializationSchool.length <= 300 &&
            scope.newSpecialization.specializationText.length > 5 ) {

              for (let i = 0; i < scope.newSpecialization.widgets.length; i++) {
                let data = scope.newSpecialization.widgets[i];
                switch (scope.newSpecialization.widgets[i].type) {
                  case 'text':
                    scope.newSpecialization.widgets[i].text = scope.addTextColumn[data.id.split('_')[1]];
                    break;
                  case 'image':
                    if (document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0] != undefined) {
                      scope.newSpecialization.widgets[i].image = scope.newSpecialization.specializationIdent + '/widgets/' + document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0].name;
                      let imageFolder = './gallery/specializationsGallery/' + scope.newSpecialization.specializationIdent + '/widgets';
                      let type = 'fullImage';
                      UploadFiles.uploadImage(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0], imageFolder, type).then(function () { });
                    }
                    break;
                }
              }

              SpecializationsDatabase.addSpecialization(scope.newSpecialization).then(function (specializationsData) {
                if (specializationsData.addSpecializationsStatus) {
                  alert('Specjalizacja została poprawnie dodana');
                  let local = scope.newSpecialization.specializationIdent;
                  scope.newSpecialization = undefined;
                  $location.path('/specjalizacje/edytuj-specjalizacje/' + local);
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
  name: 'addSpecializations',
  fn: addSpecializations
};
