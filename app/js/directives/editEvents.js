function editEvents($location, $window, $compile, DatabaseManageData, WidgetsService) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/editEvents.html',
    controller: 'EditEventsController',
    link: (scope) => {
      if(($location.path().split('/')[2]) == 'edytuj-wydarzenie'){
        document.querySelector('#addNewEventButton').style.display = 'none'

        DatabaseManageData.loadOneEvent($location.path().split('/')[3]).then(function(data){
          if(data.loadEventsStatus && data.loadEventsData.length > 0){
            scope.events = data.loadEventsData[0];
            scope.editEventTitle = scope.events.eventTitle;
            scope.editEventShortText = scope.events.eventShort;
            scope.editEventText = scope.events.eventText;
            scope.editEventTags = scope.events.eventTags

            scope.editEvent = {
              eventTitle: scope.events.eventTitle,
              eventIdent: scope.events.eventIdent,
              eventData: scope.events.eventData,
              eventShort: scope.events.eventShort,
              eventMiniature: scope.events.eventMiniature,
              eventMiniatureSmall: scope.events.eventMiniatureSmall,
              eventTags: scope.events.eventTags,
              eventText: scope.events.eventText,
              eventAuthor: scope.events.eventAuthor,
              eventTeacher: scope.events.eventTeacher,
              eventPublished: scope.events.eventPublished,
              widgets: scope.events.widgets
            }

            for(let i = 0; i < scope.editEvent.widgets.length; i++){
              if(scope.editEvent.widgets[i].type == 'image'){
                scope.addNewImage = scope.editEvent.widgets[i].id.split('_')[1];
                WidgetsService.insertImageBlock(scope, '.editEventsForm', 'eventsGallery', scope.editEvent.widgets[i].image)
                scope.addNewImage++;
              }else if(scope.editEvent.widgets[i].type == 'text'){
                scope.addNewText = scope.editEvent.widgets[i].id.split('_')[1];
                scope.addTextColumn[scope.addNewText] = scope.editEvent.widgets[i].text
                WidgetsService.insertInputBlock(scope, '.editEventsForm')
                scope.addNewText++;
              }
            }
          }else{
            scope.events = [];
            $location.path('/wydarzenia');
            return false;
          }
        });

        scope.checkTeacher = (teacher) => {
            for(let i = 0; i < scope.teachers.length; i++){
              if((scope.teachers[i].name + ' ' + scope.teachers[i].surname) == teacher){
                return true;
                break;
              }
            }
          return false;
        }

        scope.addImageToPost = (element) => {
          WidgetsService.addImageToPost(element)
        }

        scope.changeEventMiniature = () => {
          document.querySelector('#editEventMiniature').click();
        }

        document.querySelector('#editEventMiniature').onchange = function(){
          let vals = this.value,
          val = vals.length ? vals.split('\\').pop() : '';

          document.querySelector('#editEventMiniatureImage').value = val;

          let reader = new FileReader();
          reader.onload = function(){
            let dataURL = reader.result;
            let output = document.querySelector('#editEventMiniatureImage');
            output.src = dataURL;
          };
          reader.readAsDataURL(document.querySelector('#editEventMiniature').files[0]);
        }

        scope.openWidgetMenu = () =>{
          angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="editEvent" addform=".editEventsForm"></post-widgets>')(scope))
        }

        scope.removeWidget = (type, ident) => {
          let arrayIndex = WidgetsService.removeWidget(type, ident, scope.editEvent.widgets)
          scope.editEvent.widgets.splice(arrayIndex, 1)
        }

        DatabaseManageData.loadAllTeachers().then(function(data){
          if(data.loadTeachersStatus){
            scope.teachers = data.loadTeachersData
          }
        })

        scope.editEvents = () => {

            let d = new Date();
            let day = ((d.getDate() < 10) ? '0' + d.getDate() : d.getDate());
            let month = ((d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1));
            let hr = ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours());
            let min = ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes());
            let sec = ((d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds());

            let eventD = day + '/' + month + '/' + d.getFullYear() + ' ' + hr + ':' + min + ':' + sec;
            scope.editEvent.eventData = eventD;

            if(document.querySelector('#editEventMiniature').files[0] != undefined){
              scope.editEvent.eventMiniature = scope.editEvent.eventIdent + '/' + document.querySelector('#editEventMiniature').files[0].name
              scope.editEvent.eventMiniatureSmall = scope.editEvent.eventIdent + '/min_' + document.querySelector('#editEventMiniature').files[0].name
            }

            if(scope.editEvent.eventTitle.length >= 1 && scope.editEvent.eventTitle.length <= 80 && 
              scope.editEvent.eventShort.length >= 1 && scope.editEvent.eventShort.length <= 300 &&
              scope.editEvent.eventText.length > 5 && scope.editEvent.eventMiniature != undefined &&
              scope.editEvent.eventTags.length >= 1 && scope.checkTeacher(scope.editEvent.eventTeacher)){

              scope.editEvent.eventPublished = true;
              for(let i = 0; i < scope.editEvent.widgets.length; i++){
                let data = scope.editEvent.widgets[i];
                switch(scope.editEvent.widgets[i].type){
                  case 'text':
                    scope.editEvent.widgets[i].text = scope.addTextColumn[data.id.split('_')[1]]
                    break;
                  case 'image':
                    if(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0] != undefined)
                      scope.editEvent.widgets[i].image = scope.editEvent.eventIdent + '/widgets/' + document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0].name
                      let imageFolder = './gallery/eventsGallery/' + scope.editEvent.eventIdent + '/widgets';
                      let type = 'fullImage'
                      DatabaseManageData.uploadImage(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0], imageFolder, type).then(function(){})
                    break;
                }
              }

              if(document.querySelector('#editEventMiniature').files[0] != undefined){
                let imageFolder = './gallery/eventsGallery/' + scope.editEvent.eventIdent;
                let type = 'miniature';
                DatabaseManageData.uploadImage(scope.editEventMiniature, imageFolder, type).then(function(){
                  DatabaseManageData.editEvent(scope.editEvent).then(function(eventsData){
                    if(eventsData.editEventsStatus){
                      alert('Wydarzenie zostało poprawnie edytowane');
                      $window.location.reload()
                    }
                  })
                })
              }else{
                DatabaseManageData.editEvent(scope.editEvent).then(function(eventsData){
                  if(eventsData.editEventsStatus){
                    alert('Wydarzenie zostało poprawnie edytowane');
                    $window.location.reload()
                  }
                })
              }
            }else{
            alert('Uzupełnij puste pola!')
          }
        }
      }
    }
  };
}

export default {
  name: 'editEvents',
  fn: editEvents
};
