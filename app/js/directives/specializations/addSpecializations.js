function addSpecializations($location, $compile, Specializations, Files, Visual) {
  'ngInject';
  return {
    restrict: 'E',
    templateUrl: 'directives/specializations/addSpecializations.html',
    controller: 'AddSpecializationsController',
    link: (scope) => {
      if (($location.path().split('/')[2]) == 'dodaj-nowa-specjalizacje') {

        /* Open, Close, Edit elements etc. */

        document.querySelector('#addNewSpecializationButton').style.display = 'none';

        scope.openWidgetMenu = () => {
          angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="newSpecialization" addform=".addSpecializationsForm"></post-widgets>')(scope));
        };

        /* ********************************************************* */

        scope.addSpecialization = () => {
          Visual.loading.start();
          let spec = scope.newSpecialization;
          spec.specializationIdent = (spec.specializationName.trim().replace(/ /g, '-')).toLowerCase();

          if (spec.specializationName.length >= 1 && spec.specializationName.length <= 80 &&
            spec.specializationSchool.length >= 1 && spec.specializationSchool.length <= 300 &&
            spec.specializationText.length > 5) {

            for (let value of spec.widgets) {
              switch (value.type) {
                case 'text':
                  value.text = scope.addTextColumn[value.id.split('_')[1]];
                  break;
                case 'image':
                  if (document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0] != undefined) {
                    value.image = `${spec.specializationIdent}/widgets/${document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0].name}`;
                    let imageFolder = `./gallery/specializationsGallery/${spec.specializationIdent}/widgets`,
                      type = 'fullImage';
                    Files.upload.image(document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0], imageFolder, type).then(function () { });
                  }
                  break;
              }
            }

            Specializations.specialization.add(spec).then(data => {
              if (data.success) {
                Visual.loading.stop();
                swal('Dobra robota!', data.message, 'success').then(() => {
                  $location.path(`/specjalizacje/edytuj-specjalizacje/${spec.specializationIdent}`);
                });
              }else{
                Visual.loading.stop();
                swal('Upss!', 'Coś poszło nie tak', 'error');
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
  name: 'addSpecializations',
  fn: addSpecializations
};
