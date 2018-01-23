function VisualSiteService($location) {
  'ngInject';

  const service = {};

  service.responsiveMenu = () => {

    var openMenuStatus = false;

    if(window.innerWidth <= 745 && angular.element(document.querySelector('.sidebar'))[0] != undefined){
        angular.element(document.querySelector('.sidebar'))[0].style.left = '-200px'
        angular.element(document.querySelector('.sidebar-icon'))[0].style.display = 'block'

        angular.element(document.querySelector('.sidebar-icon'))[0].onclick = function(){
          if(openMenuStatus == false){
            angular.element(document.querySelector('.sidebar'))[0].style.left = '0px'
            angular.element(document.querySelector('.sidebar-icon'))[0].style.left = '210px'
            angular.element(document.querySelector('.fa-angle-double-right'))[0].style.transform = 'rotate(180deg)'
            openMenuStatus = true;
          }else{
            angular.element(document.querySelector('.sidebar'))[0].style.left = '-200px'
            angular.element(document.querySelector('.sidebar-icon'))[0].style.left = '10px'
            angular.element(document.querySelector('.fa-angle-double-right'))[0].style.transform = 'rotate(360deg)'
            openMenuStatus = false;
          }
        }
      }else{
        if(angular.element(document.querySelector('.sidebar'))[0] != undefined){
          angular.element(document.querySelector('.sidebar'))[0].style.left = '0px'
          angular.element(document.querySelector('.sidebar-icon'))[0].style.display = 'none'
          angular.element(document.querySelector('.fa-angle-double-right'))[0].style.transform = 'rotate(360deg)'
          angular.element(document.querySelector('.sidebar-icon'))[0].style.left = '10px'
          openMenuStatus = false;
        }
      }
  }

  service.activeMenu = () =>{
    switch($location.path().split('/')[1]){
      case '':
        document.querySelector('.przeglad').className += ' active'
        break;
      case 'przeglad':
        document.querySelector('.przeglad').className += ' active'
        break;
      case 'aktualnosci':
        document.querySelector('.aktualnosci').className += ' active'
        break;
      case 'wydarzenia':
        document.querySelector('.wydarzenia').className += ' active'
        break;
      case 'specjalizacje':
        document.querySelector('.specjalizacje').className += ' active'
        break;
      case 'dokumenty':
        document.querySelector('.dokumenty').className += ' active'
        break;
      case 'galeria':
        document.querySelector('.galeria').className += ' active'
        break;
      case 'uzytkownik':
        document.querySelector('.uzytkownik').className += ' active'
        break;
    }
  }

  return service;

}

export default {
  name: 'VisualSiteService',
  fn: VisualSiteService
};
