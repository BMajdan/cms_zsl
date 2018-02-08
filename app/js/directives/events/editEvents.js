function editEvents($location, $window, $compile, EventsDatabase, TeachersDatabase, UploadFiles, WidgetsService) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/events/editEvents.html',
		controller: 'EditEventsController',
		link: (scope) => {
			if (($location.path().split('/')[2]) == 'edytuj-wydarzenie') {

				/* Open, Close, Edit elements etc. */

				document.querySelector('#addNewEventButton').style.display = 'none';

				scope.changeEventMiniature = () => {
					document.querySelector('#editEventMiniature').click();
				};

				document.querySelector('#editEventMiniature').onchange = function () {
					let vals = this.value,
						val = vals.length ? vals.split('\\').pop() : '';
					document.querySelector('#editEventMiniatureImage').value = val;
					let reader = new FileReader();
					reader.onload = function () {
						let dataURL = reader.result;
						let output = document.querySelector('#editEventMiniatureImage');
						output.src = dataURL;
					};
					reader.readAsDataURL(document.querySelector('#editEventMiniature').files[0]);
				};

				scope.openWidgetMenu = () => {
					angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="editEvent" addform=".editEventsForm"></post-widgets>')(scope));
				};

				scope.addImageToPost = (element) => {
					WidgetsService.addImageToPost(element);
				};

				scope.removeWidget = (type, ident) => {
					let arrayIndex = WidgetsService.removeWidget(type, ident, scope.editEvent.widgets);
					scope.editEvent.widgets.splice(arrayIndex, 1);
				};

				/* ********************************************************* */

				/*Load events, define variable */

				EventsDatabase.loadOneEvent($location.path().split('/')[3]).then(function (data) {
					if (data.loadEventsStatus && data.loadEventsData.length > 0) {
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

						scope.miniatureUrl = `${scope.galleryUrl}/eventsGallery/${scope.editEvent.eventMiniature}`;
						let hour = parseInt(scope.editEvent.eventStopTime.split(':')[0]) - 1;
						let minutes = parseInt(scope.editEvent.eventStopTime.split(':')[1]);
						let date = new Date((hour * 60 * 60 * 1000) + (minutes * 60 * 1000));
						scope.eventStopTime = date;

						hour = parseInt(scope.editEvent.eventStartTime.split(':')[0]) - 1;
						minutes = parseInt(scope.editEvent.eventStartTime.split(':')[1]);
						date = new Date((hour * 60 * 60 * 1000) + (minutes * 60 * 1000));
						scope.eventStartTime = date;

						for (let value of scope.editEvent.widgets) {
							if (value.type == 'image') {
								scope.addNewImage = value.id.split('_')[1];
								WidgetsService.insertImageBlock(scope, '.editEventsForm', 'eventsGallery', value.image);
								scope.addNewImage++;
							} else if (value.type == 'text') {
								scope.addNewText = value.id.split('_')[1];
								scope.addTextColumn[scope.addNewText] = value.text;
								WidgetsService.insertInputBlock(scope, '.editEventsForm');
								scope.addNewText++;
							}
						}
					} else {
						scope.events = [];
						$location.path('/wydarzenia');
						return false;
					}
				});

				/* ********************************************************* */

				/* Manage Teachers */

				TeachersDatabase.loadAllTeachers().then(function (data) {
					if (data.loadTeachersStatus) {
						scope.teachers = data.loadTeachersData;
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

					let editEvent = scope.editEvent;

					let d = new Date();
					let day = ((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate());
					let month = ((d.getMonth() + 1 < 10) ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1));
					let hr = ((d.getHours() < 10) ? `0${d.getHours()}` : d.getHours());
					let min = ((d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes());
					let sec = ((d.getSeconds() < 10) ? `0${d.getSeconds()}` : d.getSeconds());

					let eventD = `${day}/${month}/${d.getFullYear()} ${hr}:${min}:${sec}`;
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
											value.image = `${editEvent.eventIdent}/widgets/${document.querySelector(`#addImageInput_"${value.id.split('_')[1]}`).files[0].name}`;
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
								UploadFiles.uploadImage(scope.editEventMiniature, imageFolder, type).then(function () {
									EventsDatabase.editEvent(editEvent).then(function (eventsData) {
										if (eventsData.editEventsStatus) {
											if (published) {
												alert('Wydarzenie zostało poprawnie edytowane');
												$window.location.reload();
											} else {
												alert('Przenoszę na stronę główną!');
											}
										}
									});
								});
							} else {
								EventsDatabase.editEvent(editEvent).then(function (eventsData) {
									if (eventsData.editEventsStatus) {
										if (published) {
											alert('Wydarzenie zostało poprawnie edytowane');
											$window.location.reload();
										} else {
											alert('Przenoszę na stronę główną!');
										}
									}
								});
							}
						} else {
							alert('Podaj poprawną datę!');
						}
					} else {
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
