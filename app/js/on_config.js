function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state(
    'Dashboard', {
      url: '/',
      controller: 'DashboardController',
      templateUrl: 'overview.html',
      title: 'Panel konfiguracyjny CMSy.'
    }
    )
    .state(
    'Overview', {
      url: '/przeglad',
      controller: 'DashboardController',
      templateUrl: 'overview.html',
      title: 'Panel konfiguracyjny CMSy.'
    }
    )
    .state(
    'News', {
      url: '/aktualnosci',
      controller: 'DashboardController',
      templateUrl: 'news.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'AddNew', {
      url: '/aktualnosci/dodaj-nowy-post',
      controller: 'DashboardController',
      templateUrl: 'news.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'EditNew', {
      url: '/aktualnosci/edytuj-post/:id',
      controller: 'DashboardController',
      templateUrl: 'news.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'Events', {
      url: '/wydarzenia',
      controller: 'DashboardController',
      templateUrl: 'events.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'AddEvent', {
      url: '/wydarzenia/dodaj-nowe-wydarzenie',
      controller: 'DashboardController',
      templateUrl: 'events.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'EditEvent', {
      url: '/wydarzenia/edytuj-wydarzenie/:id',
      controller: 'DashboardController',
      templateUrl: 'events.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'Specializations', {
      url: '/specjalizacje',
      controller: 'DashboardController',
      templateUrl: 'specializations.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'EditSpecialization', {
      url: '/specjalizacje/edytuj-specjalizacje/:id',
      controller: 'DashboardController',
      templateUrl: 'specializations.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'AddSpecialization', {
      url: '/specjalizacje/dodaj-nowa-specjalizacje',
      controller: 'DashboardController',
      templateUrl: 'specializations.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'Documents', {
      url: '/dokumenty',
      controller: 'DashboardController',
      templateUrl: 'documents.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'AddDocument', {
      url: '/dokumenty/dodaj-nowy-dokument',
      controller: 'DashboardController',
      templateUrl: 'documents.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'EditDocument', {
      url: '/dokumenty/edytuj-dokument/:id',
      controller: 'DashboardController',
      templateUrl: 'documents.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'Gallery', {
      url: '/galeria',
      controller: 'DashboardController',
      templateUrl: 'gallery.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'UserProfile', {
      url: '/uzytkownik',
      controller: 'DashboardController',
      templateUrl: 'userProfile.html',
      title: 'Panel konfiguracyjny CMS.'
    }
    )
    .state(
    'Login', {
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'login.html',
      title: 'Logowanie do panelu konfiguracyjnego.'
    }
    )
    .state(
    'Error', {
      url: '/404',
      controller: 'ErrorController',
      templateUrl: '404.html',
      title: 'Podana strona nie istnieje.'
    }
    );

  $urlRouterProvider.otherwise('/404');

}

export default OnConfig;
