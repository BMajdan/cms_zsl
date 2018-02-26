function addEvents($location, $compile, $rootScope, EventsDatabase, TeachersDatabase, UploadFiles, VisualSiteService) {
	'ngInject';
	return {
		restrict: 'E',
		templateUrl: 'directives/events/addEvents.html',
		controller: 'AddEventsController',
		link: (scope) => {
			if (($location.path().split('/')[2]) == 'dodaj-nowe-wydarzenie') {

				/* Open, Close, Edit elements etc. */

				document.querySelector('#addNewEventButton').style.display = 'none';

				scope.openWidgetMenu = () => {
					angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="newEvent" addform=".addEventsForm"></post-widgets>')(scope));
				};

				scope.changeEventMiniature = () => {
					document.querySelector('#addEventMiniature').click();
				};

				document.querySelector('#addEventMiniature').onchange = function () {
					let vals = this.value,
						val = vals.length ? vals.split('\\').pop() : '';
					document.querySelector('#addEventMiniatureImage').value = val;
					let reader = new FileReader();
					reader.onload = function () {
						let dataURL = reader.result;
						let output = document.querySelector('#addEventMiniatureImage');
						output.src = dataURL;
					};
					reader.readAsDataURL(document.querySelector('#addEventMiniature').files[0]);
				};

				/* ********************************************************* */

				/* Manage Teachers */

				TeachersDatabase.loadAllTeachers().then(data => {
					if (data.success) {
						scope.teachers = data.object;
					}
				});

				scope.checkTeacher = (teacher) => {
					for (let value of scope.teachers) {
						if ((`${value.name} ${value.surname}`) == teacher) {
							return true;
						}
					}
					return false;
				};

				/* ********************************************************* */

				scope.addEvent = (published) => {
					VisualSiteService.loadingScreen.start();
					let newEvent = scope.newEvent;
					let d = new Date();
					let day = ((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate());
					let month = ((d.getMonth() + 1 < 10) ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1));
					let hr = ((d.getHours() < 10) ? `0${d.getHours()}` : d.getHours());
					let min = ((d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes());
					let sec = ((d.getSeconds() < 10) ? `0${d.getSeconds()}` : d.getSeconds());

					let eventD = `${day}/${month}/${d.getFullYear()} ${hr}:${min}:${sec}`;
					newEvent.eventData = eventD;
					newEvent.eventIdent = (`${newEvent.eventTitle.trim().replace(/ /g, '-')}-${eventD.replace(/\//g, '-').replace(/ /g, '-').replace(/:/g, '-')}`).toLowerCase();
					if (document.querySelector('#addEventMiniature').files[0] != undefined) {
						newEvent.eventMiniature = `${newEvent.eventIdent}/${document.querySelector('#addEventMiniature').files[0].name}`;
						newEvent.eventMiniatureSmall = `${newEvent.eventIdent}/min_${document.querySelector('#addEventMiniature').files[0].name}`;
					}

					if (newEvent.eventTitle.length >= 1 && newEvent.eventTitle.length <= 80 &&
						newEvent.eventShort.length >= 1 && newEvent.eventShort.length <= 300 &&
						newEvent.eventText.length > 5 && newEvent.eventMiniature != undefined &&
						newEvent.eventStartDate != undefined && newEvent.eventStopDate != undefined &&
						scope.eventStartTime != undefined && scope.eventStopTime != undefined &&
						newEvent.eventTags.length >= 1 && scope.checkTeacher(newEvent.eventTeacher)) {

						newEvent.eventAuthor = $rootScope.userData.userName;
						let startTime = new Date(scope.eventStartTime);
						newEvent.eventStartTime = `${startTime.getHours()}:${startTime.getMinutes()}`;
						let stopTime = new Date(scope.eventStopTime);
						newEvent.eventStopTime = `${stopTime.getHours()}:${stopTime.getMinutes()}`;

						let a = newEvent.eventStartDate.split('-');
						let startDate = new Date(a[2], parseInt(a[1]) - 1, a[0], startTime.getHours(), startTime.getMinutes(), 0, 0);
						let b = newEvent.eventStopDate.split('-');
						let stopDate = new Date(b[2], parseInt(a[1]) - 1, b[0], stopTime.getHours(), stopTime.getMinutes(), 0, 0);

						if (stopDate >= startDate) {
							for (let value of newEvent.widgets) {
								switch (value.type) {
									case 'text':
										value.text = scope.addTextColumn[value.id.split('_')[1]];
										break;
									case 'image':
										if (document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0] != undefined) {
											value.image = `${newEvent.eventIdent}/widgets/${document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0].name}`;
											let imageFolder = `./gallery/eventsGallery/${newEvent.eventIdent}/widgets`,
												type = 'fullImage';
											UploadFiles.uploadImage(document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0], imageFolder, type).then(function () { });
										}
										break;
								}
							}

							let imageFolder = `./gallery/eventsGallery/${newEvent.eventIdent}`;
							let type = 'miniature';
							UploadFiles.uploadImage(scope.addEventMiniature, imageFolder, type).then(function () {
								newEvent.eventPublished = published;
								EventsDatabase.addEvent(newEvent).then(eventData => {
									if (eventData.success) {
										VisualSiteService.loadingScreen.stop();
										swal('Dobra robota!', eventData.message, 'success').then( () => {
											$location.path(`/wydarzenia/edytuj-wydarzenie/${newEvent.eventIdent}`);
										});
									}else{
										VisualSiteService.loadingScreen.stop();
										swal('Upss!', 'Coś poszło nie tak', 'error');
									}
								}, err => {
									VisualSiteService.loadingScreen.stop();
									swal('Upss!', err, 'error');
								});
							}, err => {
								VisualSiteService.loadingScreen.stop();
								swal('Upss!', err, 'error');
							});
						} else {
							VisualSiteService.loadingScreen.stop(); 
							swal('Uwaga!', 'Podaj poprawną datę!', 'warning'); 
						}
					} else { 
						VisualSiteService.loadingScreen.stop();
						swal('Uwaga!', 'Uzupełnij wszystkie wymagane pola!', 'warning'); 
					}
				};
			}
		}
	};
}

export default {
	name: 'addEvents',
	fn: addEvents
};
