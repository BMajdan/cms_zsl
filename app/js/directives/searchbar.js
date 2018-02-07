function searchBar($filter) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/search.html',
    link: (scope, el, attrs) => {

      scope.searchPlaceholder = attrs.placeholder;

      scope.$watch('searchBar', function (newValue) {
        if (scope[attrs.from] != undefined) {
          if (newValue == '') {
            for (let i = 0; i < scope[attrs.from].length; i++) {
              scope[attrs.from][i].display = true;
            }
          } else {
            for (let i = 0; i < scope[attrs.from].length; i++) {
              scope[attrs.from][i].display = false;
            }

            let found = $filter('ArrayFilter')(attrs.value, newValue, scope[attrs.from], true);
            if (found != null && found.length > 1) {
              for (let i = 0; i < scope[attrs.from].length; i++) {
                for (let j = 0; j < found.length; j++) {
                  if (i == found[j]) {
                    scope[attrs.from][i].display = true;
                  }
                }
              }
            } else if (found != null) {
              for (let i = 0; i < scope[attrs.from].length; i++) {
                if (i == found) {
                  scope[attrs.from][i].display = true;
                }
              }
            }
          }
        }
      });
    }
  };
}

export default {
  name: 'searchBar',
  fn: searchBar
};
