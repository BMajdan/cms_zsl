function addNews($location, $compile, NewsDatabase, TeachersDatabase, UploadFiles) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/news/addNews.html',
		controller: 'AddNewsController',
		link: (scope) => {

			if(($location.path().split('/')[2]) == 'dodaj-nowy-post'){
				document.querySelector('#addNewPostButton').style.display = 'none';

				scope.checkTeacher = (teacher) => {
						for(let i = 0; i < scope.teachers.length; i++){
							if((scope.teachers[i].name + ' ' + scope.teachers[i].surname) == teacher){
								return true;
							}
						}
					return false;
				};

				scope.changePostMiniature = () => {
					document.querySelector('#addPostMiniature').click();
				};

				document.querySelector('#addPostMiniature').onchange = function(){
					let vals = this.value,
					val = vals.length ? vals.split('\\').pop() : '';

					document.querySelector('#addPostMiniatureImage').value = val;

					let reader = new FileReader();
					reader.onload = function(){
						let dataURL = reader.result;
						let output = document.querySelector('#addPostMiniatureImage');
						output.src = dataURL;
					};
					reader.readAsDataURL(document.querySelector('#addPostMiniature').files[0]);
				};

				scope.openWidgetMenu = () =>{
					angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="newPost" addform=".addNewsForm"></post-widgets>')(scope));
				};

				TeachersDatabase.loadAllTeachers().then(function(data){
					if(data.loadTeachersStatus){
						scope.teachers = data.loadTeachersData;
					}
				});

				scope.addNews = (published) => {

					let d = new Date();
					let day = ((d.getDate() < 10) ? '0' + d.getDate() : d.getDate());
					let month = ((d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1));
					let hr = ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours());
					let min = ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes());
					let sec = ((d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds());

					let postD = day + '/' + month + '/' + d.getFullYear() + ' ' + hr + ':' + min + ':' + sec;
					scope.newPost.postData = postD;
					scope.newPost.postIdent = (scope.newPost.postTitle.trim().replace(/ /g, '-') + '-' + postD.replace(/\//g, '-').replace(/ /g, '-').replace(/:/g, '-')).toLowerCase();
					if(document.querySelector('#addPostMiniature').files[0] != undefined){
						scope.newPost.postMiniature = scope.newPost.postIdent + '/' + document.querySelector('#addPostMiniature').files[0].name;
						scope.newPost.postMiniatureSmall = scope.newPost.postIdent + '/min_' + document.querySelector('#addPostMiniature').files[0].name;
					}

					if(scope.newPost.postTitle.length >= 1 && scope.newPost.postTitle.length <= 80 && 
						scope.newPost.postShort.length >= 1 && scope.newPost.postShort.length <= 300 &&
						scope.newPost.postText.length > 5 && scope.newPost.postMiniature != undefined &&
						scope.newPost.postTags.length >= 1 && scope.checkTeacher(scope.newPost.postTeacher)){

							for(let i = 0; i < scope.newPost.widgets.length; i++){
								let data = scope.newPost.widgets[i];
								switch(scope.newPost.widgets[i].type){
									case 'text':
										scope.newPost.widgets[i].text = scope.addTextColumn[data.id.split('_')[1]];
										break;
									case 'image':
										if(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0] != undefined){
											scope.newPost.widgets[i].image = scope.newPost.postIdent + '/widgets/' + document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0].name;
											let imageFolder = './gallery/newsGallery/' + scope.newPost.postIdent + '/widgets';
											let type = 'fullImage';
											UploadFiles.uploadImage(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0], imageFolder, type).then(function(){});
										}
										break;
								}
							}

							let imageFolder = './gallery/newsGallery/' + scope.newPost.postIdent;
							let type = 'miniature';
							UploadFiles.uploadImage(scope.addPostMiniature, imageFolder, type).then(function(){
								scope.newPost.postPublished = published;
								NewsDatabase.addNews(scope.newPost).then(function(newsData){
									if(newsData.addNewsStatus){
										alert('Post został poprawnie dodany');
										let local = scope.newPost.postIdent;
										scope.newPost = undefined;
										$location.path('/aktualnosci/edytuj-post/' + local);
									}
								});
							});

					}else{
						alert('Uzupełnij puste pola!');
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
