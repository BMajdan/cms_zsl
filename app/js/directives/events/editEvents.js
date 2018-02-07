function editEvents($location, $window, $compile, EventsDatabase, TeachersDatabase, UploadFiles, WidgetsService) {
	'ngInject';
	
	return {
		restrict: 'E',
		templateUrl: 'directives/events/editEvents.html',
		controller: 'EditEventsController',
		link: (scope) => {
			if(($location.path().split('/')[2]) == 'edytuj-wydarzenie'){
				document.querySelector('#addNewEventButton').style.display = 'none';
				scope.miniatureUrl = '';

				EventsDatabase.loadOneEvent($location.path().split('/')[3]).then(function(data){
					if(data.loadEventsStatus && data.loadEventsData.length > 0){
						scope.events = data.loadEventsData[0];
						scope.editEventTitle = scope.events.eventTitle;
						scope.editEventShortText = scope.events.eventShort;
						scope.editEventText = scope.events.eventText;
						scope.editEventTags = scope.events.eventTags;

						scope.editEvent = {
							eventTitle: scope.events.eventTitle,
							eventIdent: scope.events.eventIdent,
							eventData: scope.events.eventData,
							eventStartDate: scope.events.eventStartDate,
							eventStopDate: scope.events.eventStopDate,
							eventStartTime: scope.events.eventStartTime,
							eventStopTime: scope.events.eventStopTime,
							eventShort: scope.events.eventShort,
							eventMiniature: scope.events.eventMiniature,
							eventMiniatureSmall: scope.events.eventMiniatureSmall,
							eventTags: scope.events.eventTags,
							eventText: scope.events.eventText,
							eventAuthor: scope.events.eventAuthor,
							eventTeacher: scope.events.eventTeacher,
							eventPublished: scope.events.eventPublished,
							widgets: scope.events.widgets
						};

						scope.miniatureUrl = scope.galleryUrl + '/eventsGallery/' + scope.editEvent.eventMiniature;
						let hour = parseInt(scope.editEvent.eventStopTime.split(':')[0]) - 1;
						let minutes = parseInt(scope.editEvent.eventStopTime.split(':')[1]);
						let date = new Date((hour * 60 * 60 * 1000) + (minutes * 60 * 1000));
						scope.eventStopTime = date;

						hour = parseInt(scope.editEvent.eventStartTime.split(':')[0]) - 1;
						minutes = parseInt(scope.editEvent.eventStartTime.split(':')[1]);
						date = new Date((hour * 60 * 60 * 1000) + (minutes * 60 * 1000));
						scope.eventStartTime = date;

						for(let i = 0; i < scope.editEvent.widgets.length; i++){
							if(scope.editEvent.widgets[i].type == 'image'){
								scope.addNewImage = scope.editEvent.widgets[i].id.split('_')[1];
								WidgetsService.insertImageBlock(scope, '.editEventsForm', 'eventsGallery', scope.editEvent.widgets[i].image);
								scope.addNewImage++;
							}else if(scope.editEvent.widgets[i].type == 'text'){
								scope.addNewText = scope.editEvent.widgets[i].id.split('_')[1];
								scope.addTextColumn[scope.addNewText] = scope.editEvent.widgets[i].text;
								WidgetsService.insertInputBlock(scope, '.editEventsForm');
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
							}
						}
					return false;
				};

				scope.addImageToPost = (element) => {
					WidgetsService.addImageToPost(element);
				};

				scope.changeEventMiniature = () => {
					document.querySelector('#editEventMiniature').click();
				};

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
				};

				scope.openWidgetMenu = () =>{
					angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="editEvent" addform=".editEventsForm"></post-widgets>')(scope));
				};

				scope.removeWidget = (type, ident) => {
					let arrayIndex = WidgetsService.removeWidget(type, ident, scope.editEvent.widgets);
					scope.editEvent.widgets.splice(arrayIndex, 1);
				};

				TeachersDatabase.loadAllTeachers().then(function(data){
					if(data.loadTeachersStatus){
						scope.teachers = data.loadTeachersData;
					}
				});

				scope.editEvents = (published) => {

						let d = new Date();
						let day = ((d.getDate() < 10) ? '0' + d.getDate() : d.getDate());
						let month = ((d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1));
						let hr = ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours());
						let min = ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes());
						let sec = ((d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds());

						let eventD = day + '/' + month + '/' + d.getFullYear() + ' ' + hr + ':' + min + ':' + sec;
						scope.editEvent.eventData = eventD;

						if(document.querySelector('#editEventMiniature').files[0] != undefined){
							scope.editEvent.eventMiniature = scope.editEvent.eventIdent + '/' + document.querySelector('#editEventMiniature').files[0].name;
							scope.editEvent.eventMiniatureSmall = scope.editEvent.eventIdent + '/min_' + document.querySelector('#editEventMiniature').files[0].name;
						}

						if(scope.editEvent.eventTitle.length >= 1 && scope.editEvent.eventTitle.length <= 80 && 
							scope.editEvent.eventShort.length >= 1 && scope.editEvent.eventShort.length <= 300 &&
							scope.editEvent.eventText.length > 5 && scope.editEvent.eventMiniature != undefined &&
							scope.editEvent.eventStartDate != undefined && scope.editEvent.eventStopDate != undefined &&
							scope.eventStartTime != undefined && scope.eventStopTime != undefined &&
							scope.editEvent.eventTags.length >= 1 && scope.checkTeacher(scope.editEvent.eventTeacher)){

							let startTime = new Date(scope.eventStartTime);
							scope.editEvent.eventStartTime = startTime.getHours() + ':' + startTime.getMinutes();
							let stopTime = new Date(scope.eventStopTime);
							scope.editEvent.eventStopTime = stopTime.getHours() + ':' + stopTime.getMinutes();

							let a = scope.editEvent.eventStartDate.split('-');
							let startDate = new Date(a[2], parseInt(a[1]) - 1, a[0], startTime.getHours(), startTime.getMinutes(), 0, 0);
							let b = scope.editEvent.eventStopDate.split('-');
							let stopDate = new Date(b[2], parseInt(a[1]) - 1, b[0], stopTime.getHours(), stopTime.getMinutes(), 0, 0);

							if (stopDate >= startDate) {
								scope.editEvent.eventPublished = published;
								for(let i = 0; i < scope.editEvent.widgets.length; i++){
									let data = scope.editEvent.widgets[i];
									switch(scope.editEvent.widgets[i].type){
										case 'text':
											scope.editEvent.widgets[i].text = scope.addTextColumn[data.id.split('_')[1]];
											break;
										case 'image':
											if(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0] != undefined){
												scope.editEvent.widgets[i].image = scope.editEvent.eventIdent + '/widgets/' + document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0].name;
												let imageFolder = './gallery/eventsGallery/' + scope.editEvent.eventIdent + '/widgets';
												let type = 'fullImage';
												UploadFiles.uploadImage(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0], imageFolder, type).then(function(){});
											}
											break;
									}
								}

								if(document.querySelector('#editEventMiniature').files[0] != undefined){
									let imageFolder = './gallery/eventsGallery/' + scope.editEvent.eventIdent;
									let type = 'miniature';
									UploadFiles.uploadImage(scope.editEventMiniature, imageFolder, type).then(function(){
										EventsDatabase.editEvent(scope.editEvent).then(function(eventsData){
											if(eventsData.editEventsStatus){
												if (published){
													alert('Wydarzenie zostało poprawnie edytowane');
													$window.location.reload();
												}else{
													alert('Przenoszę na stronę główną!');
												}
											}
										});
									});
								}else{
									EventsDatabase.editEvent(scope.editEvent).then(function(eventsData){
										if(eventsData.editEventsStatus){
											if (published) {
												alert('Wydarzenie zostało poprawnie edytowane');
												$window.location.reload();
											} else {
												alert('Przenoszę na stronę główną!');
											}
										}
									});
								}
							}else{
								alert('Podaj poprawną datę!');
							}
						}else{
						alert('Uzupełnij puste pola!');
					}
				};
			}
		}
	};
}

export default {
	name: 'editEvents',
	fn: editEvents
};
