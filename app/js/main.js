import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import 'angular-touch';
import 'angular-ui-bootstrap/dist/ui-bootstrap';
import 'ng-tags-input/build/ng-tags-input.min'
import 'angular-animate';
import 'angular-file-model';
import './tinymce/tinymce';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'ngTouch',
  'ngAnimate',
  'templates',
  'ngTagsInput',
  'file-model',
  'ui.tinymce',
  'ui.bootstrap',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
