function showEvents() {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/showEvents.html',
    link: () => {

    }
  };
}

export default {
  name: 'showEvents',
  fn: showEvents
};
