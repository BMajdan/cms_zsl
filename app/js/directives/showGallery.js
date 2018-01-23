function showGallery() {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/showGallery.html',
    link: () => {

    }
  };
}

export default {
  name: 'showGallery',
  fn: showGallery
};
