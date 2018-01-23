function ErrorController($timeout, $location) {
	'ngInject';

  	$timeout(function(){
  		$location.path('/');
  	}, 500)

}

export default {
	name: 'ErrorController',
  	fn: ErrorController
};
