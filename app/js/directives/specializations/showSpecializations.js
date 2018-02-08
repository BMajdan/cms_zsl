function showSpecializations($location, $filter, SpecializationsDatabase) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/specializations/showSpecializations.html',
    link: (scope) => {

      if (($location.path().split('/')[2]) === undefined) {
        SpecializationsDatabase.loadAllSpecializations().then(function (data) {
          if (data.loadSpecializationsStatus == true) {
            scope.specializationsData = data.loadSpecializationsData;
            for (let value of scope.specializationsData) {
              value.display = true;
            }
          } else {
            scope.specializationsData = [];
          }
        });
      }

      scope.editSpecialization = (specializationIdent) => {
        $location.path(`/specjalizacje/edytuj-specjalizacje/${specializationIdent}`);
        return false;
      };

      scope.removeSpecialization = (specializationIdent) => {
        SpecializationsDatabase.deleteSpecialization(specializationIdent).then(function (data) {
          if (data.deleteSpecializationsStatus) {
            alert(data.deleteSpecializationsMessage);
            let found = $filter('ArrayFilter')('specializationIdent', specializationIdent, scope.specializationsData);
            scope.specializationsData.splice(found, 1);
          }
        });
      };
    }
  };
}

export default {
  name: 'showSpecializations',
  fn: showSpecializations
};
