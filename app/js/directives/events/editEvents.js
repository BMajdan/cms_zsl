function editEvents($location, $window, $compile, $rootScope, EventsDatabase, TeachersDatabase, UploadFiles, WidgetsService, VisualSiteService) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/events/editEvents.html',
		controller: 'EditEventsController',
		link: (scope) => {
			if (($location.path().split('/')[2]) == 'edytuj-wydarzenie') {

				document.querySelector('#addNewEventButton').style.display = 'none';

				/* Open, Close, Edit elements etc. */

				let sendEditEvent = (editEvent, published) => {
					EventsDatabase.editEvent(editEvent).then(eventData => {
						if (eventData.success) {
							if (published) {
								VisualSiteService.loadingScreen.stop();
								swal('Dobra robota!', eventData.message, 'success').then(() => {
									$window.location.reload();
								});
							} else {
								VisualSiteService.loadingScreen.stop();
								swal('Uwaga!', 'Trwa przenoszenie na stronę szkoły', 'warning').then(() => {
									$window.location.reload();
								});
							}
						}
					}, function (err) {
						VisualSiteService.loadingScreen.stop();
						swal('Upss!', err, 'error');
					});
				};

				scope.changeEventMiniature = () => {
					WidgetsService.widgets.imageInputChange('editEventMiniature', 'editEventMiniatureImage');
				};

				scope.openWidgetMenu = () => {
					angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="editEvent" addform=".editEventsForm"></post-widgets>')(scope));
				};

				scope.addImageToPost = (element) => {
					WidgetsService.widgets.imageInputChange(`addImageInput_${element}`, `addImage_${element}`);
				};

				scope.removeWidget = (type, ident) => {
					let arrayIndex = WidgetsService.widgets.remove(type, ident, scope.editEvent.widgets);
					scope.editEvent.widgets.splice(arrayIndex, 1);
				};

				/* ********************************************************* */

				/*Load events, define variable */
				VisualSiteService.loadingScreen.start();
				EventsDatabase.loadOneEvent($location.path().split('/')[3]).then(data => {
					if (data.success && data.object.length > 0) {
						scope.events = data.object[0];
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

						scope.miniatureUrl = `${scope.galleryUrl}/eventsGallery/${scope.editEvent.eventMiniature}`;
						let hour = parseInt(scope.editEvent.eventStopTime.split(':')[0]) - 1,
							minutes = parseInt(scope.editEvent.eventStopTime.split(':')[1]),
							date = new Date((hour * 60 * 60 * 1000) + (minutes * 60 * 1000));
						scope.eventStopTime = date;

						hour = parseInt(scope.editEvent.eventStartTime.split(':')[0]) - 1;
						minutes = parseInt(scope.editEvent.eventStartTime.split(':')[1]);
						date = new Date((hour * 60 * 60 * 1000) + (minutes * 60 * 1000));
						scope.eventStartTime = date;

						for (let value of scope.editEvent.widgets) {
							if (value.type == 'image') {
								scope.addNewImage = value.id.split('_')[1];
								let src = `${scope.galleryUrl}/eventsGallery/${value.image}`;
								WidgetsService.widgets.image(scope, '.editEventsForm', src);
								scope.addNewImage++;
							} else if (value.type == 'text') {
								scope.addNewText = value.id.split('_')[1];
								scope.addTextColumn[scope.addNewText] = value.text;
								WidgetsService.widgets.text(scope, '.editEventsForm');
								scope.addNewText++;
							}
						}
						VisualSiteService.loadingScreen.stop();
					} else {
						VisualSiteService.loadingScreen.stop();
						scope.events = [];
						$location.path('/wydarzenia');
						return false;
					}
				}, err => {
					console.log(err);
					VisualSiteService.loadingScreen.stop();
					scope.events = [];
					$location.path('/wydarzenia');
					return false;
				});

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

				scope.editEvents = (published) => {
					VisualSiteService.loadingScreen.start();
					let editEvent = scope.editEvent,
						d = new Date(),
						day = ((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate()),
						month = ((d.getMonth() + 1 < 10) ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1)),
						hr = ((d.getHours() < 10) ? `0${d.getHours()}` : d.getHours()),
						min = ((d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes()),
						sec = ((d.getSeconds() < 10) ? `0${d.getSeconds()}` : d.getSeconds()),
						eventD = `${day}/${month}/${d.getFullYear()} ${hr}:${min}:${sec}`;

					editEvent.eventData = eventD;
					if (document.querySelector('#editEventMiniature').files[0] != undefined) {
						editEvent.eventMiniature = `${editEvent.eventIdent}/${document.querySelector('#editEventMiniature').files[0].name}`;
						editEvent.eventMiniatureSmall = `${editEvent.eventIdent}/min_${document.querySelector('#editEventMiniature').files[0].name}`;
					}

					if (editEvent.eventTitle.length >= 1 && editEvent.eventTitle.length <= 80 &&
						editEvent.eventShort.length >= 1 && editEvent.eventShort.length <= 300 &&
						editEvent.eventText.length > 5 && editEvent.eventMiniature != undefined &&
						editEvent.eventStartDate != undefined && editEvent.eventStopDate != undefined &&
						scope.eventStartTime != undefined && scope.eventStopTime != undefined &&
						editEvent.eventTags.length >= 1 && scope.checkTeacher(editEvent.eventTeacher)) {

						editEvent.eventAuthor = $rootScope.userData.userName;
						let startTime = new Date(scope.eventStartTime);
						editEvent.eventStartTime = `${startTime.getHours()}:${startTime.getMinutes()}`;
						let stopTime = new Date(scope.eventStopTime);
						editEvent.eventStopTime = `${stopTime.getHours()}:${stopTime.getMinutes()}`;

						let a = editEvent.eventStartDate.split('-');
						let startDate = new Date(a[2], parseInt(a[1]) - 1, a[0], startTime.getHours(), startTime.getMinutes(), 0, 0);
						let b = editEvent.eventStopDate.split('-');
						let stopDate = new Date(b[2], parseInt(a[1]) - 1, b[0], stopTime.getHours(), stopTime.getMinutes(), 0, 0);

						if (stopDate >= startDate) {
							editEvent.eventPublished = published;
							for (let value of editEvent.widgets) {
								switch (value.type) {
									case 'text':
										value.text = scope.addTextColumn[value.id.split('_')[1]];
										break;
									case 'image':
										if (document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0] != undefined) {
											value.image = `${editEvent.eventIdent}/widgets/${document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0].name}`;
											let imageFolder = `./gallery/eventsGallery/${editEvent.eventIdent}/widgets`,
												type = 'fullImage';
											UploadFiles.uploadImage(document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0], imageFolder, type).then(function () { });
										}
										break;
								}
							}

							if (document.querySelector('#editEventMiniature').files[0] != undefined) {
								let imageFolder = `./gallery/eventsGallery/${editEvent.eventIdent}`;
								let type = 'miniature';
								UploadFiles.uploadImage(scope.editEventMiniature, imageFolder, type).then(() => {
									sendEditEvent(editEvent, published);
								}, err => {
									VisualSiteService.loadingScreen.stop();
									swal('Upss!', err, 'error');
								});
							} else {
								sendEditEvent(editEvent, published);
							}
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
	name: 'editEvents',
	fn: editEvents
};
