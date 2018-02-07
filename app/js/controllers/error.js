function ErrorController($timeout, $location) {
	'ngInject';

  $timeout(function(){
  	$location.path('/');
  }, 1000);

}

export default {
	name: 'ErrorController',
  fn: ErrorController
};
