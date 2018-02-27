function showSpecializations($location, $filter, SpecializationsDatabase, VisualSiteService) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/specializations/showSpecializations.html',
    link: (scope) => {

      if (($location.path().split('/')[2]) === undefined) {
        VisualSiteService.loadingScreen.start();
        SpecializationsDatabase.loadAllSpecializations().then(data => {
          if (data.success == true) {
            scope.specializationsData = data.object;
            for (let value of scope.specializationsData) {
              value.display = true;
            }
            VisualSiteService.loadingScreen.stop();
          } else {
            scope.specializationsData = [];
            VisualSiteService.loadingScreen.stop();
          }
        }, err => {
          swal('Upss!', err, 'error');
          scope.newsData = [];
          VisualSiteService.loadingScreen.stop();
        });
      }

      scope.editSpecialization = (specializationIdent) => {
        $location.path(`/specjalizacje/edytuj-specjalizacje/${specializationIdent}`);
        return false;
      };

      scope.removeSpecialization = (specializationIdent) => {
        let title = 'Czy jesteś pewien?', text = 'Czy na pewno usunąć tą specjalizację?!',
          icon = 'warning', buttons = ['Anuluj', 'Potwierdź'], dangerMode = true;

        VisualSiteService.notifications.asking(title, text, icon, buttons, dangerMode).then(buttonStatus => {
          if (buttonStatus) {
            VisualSiteService.loadingScreen.start();
            SpecializationsDatabase.deleteSpecialization(specializationIdent).then(data => {
              if (data.success) {
                let found = $filter('ArrayFilter')('specializationIdent', specializationIdent, scope.specializationsData);
                scope.specializationsData.splice(found, 1);
                VisualSiteService.loadingScreen.stop();
                swal('Dobra robota!', data.message, 'success');
                VisualSiteService.loadingScreen.stop();
              } else {
                VisualSiteService.loadingScreen.stop();
                swal('Upss!', 'Coś poszło nie tak', 'error');
              }
            }, err => {
              VisualSiteService.loadingScreen.stop();
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
