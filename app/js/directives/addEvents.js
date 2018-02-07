function addEvents($location, $compile, DatabaseManageData) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/addEvents.html',
    controller: 'AddEventsController',
    link: (scope) => {

      
      if(($location.path().split('/')[2]) == 'dodaj-nowe-wydarzenie'){
        document.querySelector('#addNewEventButton').style.display = 'none'

        scope.checkTeacher = (teacher) => {
            for(let i = 0; i < scope.teachers.length; i++){
              if((scope.teachers[i].name + ' ' + scope.teachers[i].surname) == teacher){
                return true;
                break;
              }
            }
          return false;
        }

        scope.changeEventMiniature = () => {
          document.querySelector('#addEventMiniature').click();
        }

        document.querySelector('#addEventMiniature').onchange = function(){
          let vals = this.value,
          val = vals.length ? vals.split('\\').pop() : '';

          document.querySelector('#addEventMiniatureImage').value = val;

          let reader = new FileReader();
          reader.onload = function(){
            let dataURL = reader.result;
            let output = document.querySelector('#addEventMiniatureImage');
            output.src = dataURL;
          };
          reader.readAsDataURL(document.querySelector('#addEventMiniature').files[0]);
        }

        scope.openWidgetMenu = () =>{
          angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="newEvent" addform=".addEventsForm"></post-widgets>')(scope))
        }

        DatabaseManageData.loadAllTeachers().then(function(data){
          if(data.loadTeachersStatus){
            scope.teachers = data.loadTeachersData
          }
        })

        scope.addEvent = (published) => {

          let d = new Date();
          let day = ((d.getDate() < 10) ? '0' + d.getDate() : d.getDate());
          let month = ((d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1));
          let hr = ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours());
          let min = ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes());
          let sec = ((d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds());

          let eventD = day + '/' + month + '/' + d.getFullYear() + ' ' + hr + ':' + min + ':' + sec;
          scope.newEvent.eventData = eventD;
          scope.newEvent.eventIdent = (scope.newEvent.eventTitle.trim().replace(/ /g, '-') + '-' + eventD.replace(/\//g, '-').replace(/ /g, '-').replace(/:/g, '-')).toLowerCase()
          
          if(document.querySelector('#addEventMiniature').files[0] != undefined){
            scope.newEvent.eventMiniature = scope.newEvent.eventIdent + '/' + document.querySelector('#addEventMiniature').files[0].name
            scope.newEvent.eventMiniatureSmall = scope.newEvent.eventIdent + '/min_' + document.querySelector('#addEventMiniature').files[0].name
          }

          if(scope.newEvent.eventTitle.length >= 1 && scope.newEvent.eventTitle.length <= 80 && 
            scope.newEvent.eventShort.length >= 1 && scope.newEvent.eventShort.length <= 300 &&
            scope.newEvent.eventText.length > 5 && scope.newEvent.eventMiniature != undefined &&
            scope.newEvent.eventTags.length >= 1 && scope.checkTeacher(scope.newEvent.eventTeacher)){

              for(let i = 0; i < scope.newEvent.widgets.length; i++){
                let data = scope.newEvent.widgets[i];
                switch(scope.newEvent.widgets[i].type){
                  case 'text':
                    scope.newEvent.widgets[i].text = scope.addTextColumn[data.id.split('_')[1]]
                    break;
                  case 'image':
                    if(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0] != undefined)
                      scope.newEvent.widgets[i].image = scope.newEvent.eventIdent + '/widgets/' + document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0].name
                      let imageFolder = './gallery/eventsGallery/' + scope.newEvent.eventIdent + '/widgets';
                      let type = 'fullImage'
                      DatabaseManageData.uploadImage(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0], imageFolder, type).then(function(){})
                    break;
                }
              }

              let imageFolder = './gallery/eventsGallery/' + scope.newEvent.eventIdent;
              let type = 'miniature';
              DatabaseManageData.uploadImage(scope.addEventMiniature, imageFolder, type).then(function(){
                scope.newEvent.eventPublished = published
                DatabaseManageData.addEvent(scope.newEvent).then(function(eventsData){
                  if(eventsData.addEventsStatus){
                    alert('Wydarzenie zostało poprawnie dodane');
                    let local = scope.newEvent.eventIdent
                    scope.newEvent = undefined;
                    $location.path('/wydarzenia/edytuj-wydarzenie/' + local);
                  }
                })
              })

              
          }else{
            alert('Uzupełnij puste pola!')
          }
        }
      }
    }
  };
}

export default {
  name: 'addEvents',
  fn: addEvents
};
