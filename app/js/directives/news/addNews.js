function addNews($location, $compile, $rootScope, NewsDatabase, TeachersDatabase, UploadFiles, WidgetsService, VisualSiteService) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/news/addNews.html',
		controller: 'AddNewsController',
		link: (scope) => {

			if (($location.path().split('/')[2]) == 'dodaj-nowy-post') {

				/* Open, Close, Edit elements etc. */

				document.querySelector('#addNewPostButton').style.display = 'none';

				scope.openWidgetMenu = () => {
					angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="newPost" addform=".addNewsForm"></post-widgets>')(scope));
				};

				scope.changePostMiniature = () => {
					WidgetsService.widgets.imageInputChange('addPostMiniature', 'addPostMiniatureImage');
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
						if ((value.name + ' ' + value.surname) == teacher) {
							return true;
						}
					}
					return false;
				};

				/* ********************************************************* */

				scope.addNews = (published) => {
					VisualSiteService.loadingScreen.start();
					let newPost = scope.newPost,
						d = new Date(),
						day = ((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate()),
						month = ((d.getMonth() + 1 < 10) ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1)),
						hr = ((d.getHours() < 10) ? `0${d.getHours()}` : d.getHours()),
						min = ((d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes()),
						sec = ((d.getSeconds() < 10) ? `0${d.getSeconds()}` : d.getSeconds()),
						postD = `${day}/${month}/${d.getFullYear()} ${hr}:${min}:${sec}`;

					newPost.postData = postD;
					newPost.postIdent = (`${newPost.postTitle.trim().replace(/ /g, '-')}-${postD.replace(/\//g, '-').replace(/ /g, '-').replace(/:/g, '-')}`).toLowerCase();

					if (document.querySelector('#addPostMiniature').files[0] != undefined) {
						newPost.postMiniature = `${newPost.postIdent}/${document.querySelector('#addPostMiniature').files[0].name}`;
						newPost.postMiniatureSmall = `${newPost.postIdent}/min_${document.querySelector('#addPostMiniature').files[0].name}`;
					}

					if (newPost.postTitle.length >= 1 && newPost.postTitle.length <= 80 &&
						newPost.postShort.length >= 1 && newPost.postShort.length <= 300 &&
						newPost.postText.length > 5 && newPost.postMiniature != undefined &&
						newPost.postTags.length >= 1 && scope.checkTeacher(newPost.postTeacher)) {

						newPost.postAuthor = $rootScope.userData.userName;

						for (let value of newPost.widgets) {
							switch (value.type) {
								case 'text':
									value.text = scope.addTextColumn[value.id.split('_')[1]];
									break;
								case 'image':
									if (document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0] != undefined) {
										value.image = `${newPost.postIdent}/widgets/${document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0].name}`;
										let imageFolder = `./gallery/newsGallery/${newPost.postIdent}/widgets`,
											type = 'fullImage';
										UploadFiles.uploadImage(document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0], imageFolder, type).then(function () { });
									}
									break;
							}
						}

						let imageFolder = `./gallery/newsGallery/${newPost.postIdent}`;
						let type = 'miniature';
						UploadFiles.uploadImage(scope.addPostMiniature, imageFolder, type).then(function () {
							newPost.postPublished = published;
							NewsDatabase.addPost(newPost).then(newsData => {
								if (newsData.success) {
									VisualSiteService.loadingScreen.stop();
									swal('Dobra robota!', newsData.message, 'success').then(() => {
										$location.path(`/aktualnosci/edytuj-post/${newPost.postIdent}`);
									});
								} else {
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
						swal('Uwaga!', 'Uzupełnij wszystkie wymagane pola!', 'warning');
					}
				};
			}
		}
	};
}

export default {
	name: 'addNews',
	fn: addNews
};
