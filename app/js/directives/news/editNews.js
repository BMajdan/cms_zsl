function editNews($location, $compile, $window, $rootScope, News, Teachers, Files, Widgets, Visual) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/news/editNews.html',
		controller: 'EditNewsController',
		link: (scope) => {
			if (($location.path().split('/')[2]) == 'edytuj-post') {

				document.querySelector('#addNewPostButton').style.display = 'none';

				/* Open, Close, Edit elements etc. */

				let sendEditPost = (edit, published) => {
					News.post.edit(edit).then(newsData => {
						if (newsData.success) {
							if (published) {
								Visual.loading.stop();
								swal('Dobra robota!', newsData.message, 'success').then(() => {
									$window.location.reload();
								});
							} else {
								Visual.loading.stop();
								swal('Uwaga!', 'Trwa przenoszenie na stronę szkoły', 'warning').then(() => {
									$window.location.reload();
								});
							}
						} else {
							Visual.loading.stop();
							swal('Upss!', 'Coś poszło nie tak', 'error');
						}
					}, err => {
						Visual.loading.stop();
						swal('Upss!', err, 'error');
					});
				};

				scope.removeWidget = (type, ident) => {
					let arrayIndex = Widgets.manage.remove(type, ident, scope.editPost.widgets);
					scope.editPost.splice(arrayIndex, 1);
				};

				scope.addImageToPost = (element) => {
					Widgets.manage.input(`addImageInput_${element}`, `addImage_${element}`);
				};

				scope.changePostMiniature = () => {
					Widgets.manage.input('editPostMiniature', 'editPostMiniatureImage');
				};

				scope.openWidgetMenu = () => {
					angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="editPost" addform=".editNewsForm"></post-widgets>')(scope));
				};

				/* ********************************************************* */

				/*Load news, define variable */
				Visual.loading.start();
				News.load.one($location.path().split('/')[3]).then(data => {
					if (data.success && data.object.length > 0) {
						scope.news = data.object[0];
						scope.editArticleTitle = scope.news.postTitle;
						scope.editArticleShortText = scope.news.postShort;
						scope.editArticlePostText = scope.news.postText;
						scope.editArticleTags = scope.news.postTags;

						scope.editPost = {
							postTitle: scope.news.postTitle,
							postIdent: scope.news.postIdent,
							postData: scope.news.postData,
							postShort: scope.news.postShort,
							postMiniature: scope.news.postMiniature,
							postMiniatureSmall: scope.news.postMiniatureSmall,
							postTags: scope.news.postTags,
							postText: scope.news.postText,
							postAuthor: scope.news.postAuthor,
							postTeacher: scope.news.postTeacher,
							postPublished: scope.news.postPublished,
							widgets: scope.news.widgets
						};

						scope.miniatureUrl = `${scope.galleryUrl}/newsGallery/${scope.editPost.postMiniature}`;

						for (let value of scope.editPost.widgets) {
							if (value.type == 'image') {
								scope.addNewImage = value.id.split('_')[1];
								let src = `${scope.galleryUrl}/newsGallery/${value.image}`;
								Widgets.manage.image(scope, '.editNewsForm', src);
								scope.addNewImage++;
							} else if (value.type == 'text') {
								scope.addNewText = value.id.split('_')[1];
								scope.addTextColumn[scope.addNewText] = value.text;
								Widgets.manage.text(scope, '.editNewsForm');
								scope.addNewText++;
							}
						}
						Visual.loading.stop();
					} else {
						Visual.loading.stop();
						scope.news = [];
						$location.path('/aktualnosci');
						return false;
					}
				}, err => {
					console.log(err);
					Visual.loading.stop();
					scope.news = [];
					$location.path('/aktualnosci');
					return false;
				});

				/* ********************************************************* */

				/* Manage Teachers */

				Teachers.load.all().then(data => {
					if (data.success) scope.teachers = data.object;
				});

				scope.checkTeacher = (teacher) => {
					for (let value of scope.teachers) {
						if ((`${value.name} ${value.surname}`) == teacher) return true;
					}
					return false;
				};

				scope.editNews = published => {
					Visual.loading.start();
					let editPost = scope.editPost,
						d = new Date(),
						day = ((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate()),
						month = ((d.getMonth() + 1 < 10) ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1)),
						hr = ((d.getHours() < 10) ? `0${d.getHours()}` : d.getHours()),
						min = ((d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes()),
						sec = ((d.getSeconds() < 10) ? `0${d.getSeconds()}` : d.getSeconds()),
						postD = `${day}/${month}/${d.getFullYear()} ${hr}:${min}:${sec}`;

					editPost.postData = postD;

					if (document.querySelector('#editPostMiniature').files[0] != undefined) {
						editPost.postMiniature = `${editPost.postIdent}/${document.querySelector('#editPostMiniature').files[0].name}`;
						editPost.postMiniatureSmall = `${editPost.postIdent}/min_${document.querySelector('#editPostMiniature').files[0].name}`;
					}

					if (editPost.postTitle.length >= 1 && editPost.postTitle.length <= 80 &&
						editPost.postShort.length >= 1 && editPost.postShort.length <= 300 &&
						editPost.postText.length > 5 && editPost.postMiniature != undefined &&
						editPost.postTags.length >= 1 && scope.checkTeacher(editPost.postTeacher)) {

						editPost.postAuthor = $rootScope.userData.userName;
						editPost.postPublished = published;
						for (let value of editPost.widgets) {
							switch (value.type) {
								case 'text':
									value.text = scope.addTextColumn[value.id.split('_')[1]];
									break;
								case 'image':
									if (document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0] != undefined) {
										value.image = `${editPost.postIdent}/widgets/${document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0].name}`;
										let imageFolder = `./gallery/newsGallery/${editPost.postIdent}/widgets`,
											type = 'fullImage';
										Files.upload.image(document.querySelector(`#addImageInput_${value.id.split('_')[1]}`).files[0], imageFolder, type).then(function () { });
									}
									break;
							}
						}

						if (document.querySelector('#editPostMiniature').files[0] != undefined) {
							let imageFolder = `./gallery/newsGallery/${editPost.postIdent}`;
							let type = 'miniature';
							Files.upload.image(scope.editPostMiniature, imageFolder, type).then(() => {
								sendEditPost(editPost, published);
							}, err => {
								Visual.loading.stop();
								swal('Upss!', err, 'error');
							});
						} else {
							sendEditPost(editPost, published);
						}
					} else {
						Visual.loading.stop();
						swal('Uwaga!', 'Uzupełnij wszystkie wymagane pola!', 'warning');
					}
				};
			}
		}
	};
}

export default {
	name: 'editNews',
	fn: editNews
};
