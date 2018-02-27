function showSpecializations($location, $filter, Specializations, Visual) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/specializations/showSpecializations.html',
    link: (scope) => {

      if (($location.path().split('/')[2]) === undefined) {
        Visual.loading.start();
        Specializations.load.all().then(data => {
          if (data.success == true) {
            scope.specializationsData = data.object;
            for (let value of scope.specializationsData) {
              value.display = true;
            }
            Visual.loading.stop();
          } else {
            scope.specializationsData = [];
            Visual.loading.stop();
          }
        }, err => {
          swal('Upss!', err, 'error');
          scope.newsData = [];
          Visual.loading.stop();
        });
      }

      scope.editSpecialization = (specializationIdent) => {
        $location.path(`/specjalizacje/edytuj-specjalizacje/${specializationIdent}`);
        return false;
      };

      scope.removeSpecialization = (specializationIdent) => {
        let title = 'Czy jesteś pewien?', text = 'Czy na pewno usunąć tą specjalizację?!',
          icon = 'warning', buttons = ['Anuluj', 'Potwierdź'], dangerMode = true;

        Visual.notifications.asking(title, text, icon, buttons, dangerMode).then(buttonStatus => {
          if (buttonStatus) {
            Visual.loading.start();
            Specializations.specialization.delete(specializationIdent).then(data => {
              if (data.success) {
                let found = $filter('ArrayFilter')('specializationIdent', specializationIdent, scope.specializationsData);
                scope.specializationsData.splice(found, 1);
                Visual.loading.stop();
                swal('Dobra robota!', data.message, 'success');
                Visual.loading.stop();
              } else {
                Visual.loading.stop();
                swal('Upss!', 'Coś poszło nie tak', 'error');
              }
            }, err => {
              Visual.loading.stop();
              swal('Upss!', err, 'error');
            });
          } else {
            swal('Uff!', 'Specjalizacja nie została usunięta', 'info');
          }
        }, err => {
          swal('Upss!', err, 'error');
        });
      };
    }
  };
}

export default {
  name: 'showSpecializations',
  fn: showSpecializations
};
