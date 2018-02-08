function searchBar($filter) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/search.html',
    link: (scope, el, attrs) => {
      scope.searchPlaceholder = attrs.placeholder;
      scope.$watch('searchBar', function (newValue) {
        if (scope[attrs.from] != undefined) {
          if (!newValue) {
            for (let value of scope[attrs.from]) {
              value.display = true;
            }
          } else {
            for (let value of scope[attrs.from]) {
              value.display = false;
            }

            let found = $filter('ArrayFilter')(attrs.value, newValue, scope[attrs.from], true);
            if(found){
              for(let value of found){
                scope[attrs.from][value].display = true;
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
