function editNews($location, $compile, $window, DatabaseManageData, WidgetsService) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/editNews.html',
    controller: 'EditNewsController',
    link: (scope) => {
      if(($location.path().split('/')[2]) == 'edytuj-post'){
        document.querySelector('#addNewPostButton').style.display = 'none'

        DatabaseManageData.loadOneNews($location.path().split('/')[3]).then(function(data){
          if(data.loadNewsStatus && data.loadNewsData.length > 0){
            scope.news = data.loadNewsData[0];
            scope.editArticleTitle = scope.news.postTitle;
            scope.editArticleShortText = scope.news.postShort;
            scope.editArticlePostText = scope.news.postText;
            scope.editArticleTags = scope.news.postTags

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
            }

            for(let i = 0; i < scope.editPost.widgets.length; i++){
              if(scope.editPost.widgets[i].type == 'image'){
                scope.addNewImage = scope.editPost.widgets[i].id.split('_')[1];
                WidgetsService.insertImageBlock(scope, '.editNewsForm', 'newsGallery', scope.editPost.widgets[i].image)
                scope.addNewImage++;
              }else if(scope.editPost.widgets[i].type == 'text'){
                scope.addNewText = scope.editPost.widgets[i].id.split('_')[1];
                scope.addTextColumn[scope.addNewText] = scope.editPost.widgets[i].text
                WidgetsService.insertInputBlock(scope, '.editNewsForm')
                scope.addNewText++;
              }
            }
          }else{
            scope.news = [];
            $location.path('/aktualnosci');
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

        scope.removeWidget = (type, ident) => {
          let arrayIndex = WidgetsService.removeWidget(type, ident, scope.editPost.widgets)
          scope.editPost.widgets.splice(arrayIndex, 1)
        }

        scope.addImageToPost = (element) => {
          WidgetsService.addImageToPost(element)
        }

        scope.changePostMiniature = () => {
          document.querySelector('#editPostMiniature').click();
        }

        document.querySelector('#editPostMiniature').onchange = function(){
          let vals = this.value,
          val = vals.length ? vals.split('\\').pop() : '';
          document.querySelector('#editPostMiniatureImage').value = val;
          let reader = new FileReader();
          reader.onload = function(){
            let dataURL = reader.result;
            let output = document.querySelector('#editPostMiniatureImage');
            output.src = dataURL;
          };
          reader.readAsDataURL(document.querySelector('#editPostMiniature').files[0]);
        }

        scope.openWidgetMenu = () =>{
          angular.element(document.querySelector('#widget-manage')).append($compile('<post-widgets class="newWidget" object="editPost" addform=".editNewsForm"></post-widgets>')(scope))
        }

        DatabaseManageData.loadAllTeachers().then(function(data){
          if(data.loadTeachersStatus){
            scope.teachers = data.loadTeachersData
          }
        })

        scope.editNews = () => {
            //edytuj post

            let d = new Date();
            let day = ((d.getDate() < 10) ? '0' + d.getDate() : d.getDate());
            let month = ((d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1));
            let hr = ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours());
            let min = ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes());
            let sec = ((d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds());

            let postD = day + '/' + month + '/' + d.getFullYear() + ' ' + hr + ':' + min + ':' + sec;
            scope.editPost.postData = postD;

            if(document.querySelector('#editPostMiniature').files[0] != undefined){
              scope.editPost.postMiniature = scope.editPost.postIdent + '/' + document.querySelector('#editPostMiniature').files[0].name
              scope.editPost.postMiniatureSmall = scope.editPost.postIdent + '/min_' + document.querySelector('#editPostMiniature').files[0].name
            }

            if(scope.editPost.postTitle.length >= 1 && scope.editPost.postTitle.length <= 80 && 
              scope.editPost.postShort.length >= 1 && scope.editPost.postShort.length <= 300 &&
              scope.editPost.postText.length > 5 && scope.editPost.postMiniature != undefined &&
              scope.editPost.postTags.length >= 1 && scope.checkTeacher(scope.editPost.postTeacher)){

              scope.editPost.postPublished = true;
              for(let i = 0; i < scope.editPost.widgets.length; i++){
                let data = scope.editPost.widgets[i];
                switch(scope.editPost.widgets[i].type){
                  case 'text':
                    scope.editPost.widgets[i].text = scope.addTextColumn[data.id.split('_')[1]]
                    break;
                  case 'image':
                    if(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0] != undefined)
                      scope.editPost.widgets[i].image = scope.editPost.postIdent + '/widgets/' + document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0].name
                      let imageFolder = './gallery/newsGallery/' + scope.editPost.postIdent + '/widgets';
                      let type = 'fullImage'
                      DatabaseManageData.uploadImage(document.querySelector('#addImageInput_' + data.id.split('_')[1]).files[0], imageFolder, type).then(function(){})
                    break;
                }
              }

              if(document.querySelector('#editPostMiniature').files[0] != undefined){
                let imageFolder = './gallery/newsGallery/' + scope.editPost.postIdent;
                let type = 'miniature';
                DatabaseManageData.uploadImage(scope.editPostMiniature, imageFolder, type).then(function(){
                  DatabaseManageData.editNews(scope.editPost).then(function(newsData){
                    if(newsData.editNewsStatus){
                      alert('Post został poprawnie edytowany');
                      $window.location.reload()
                    }
                  })
                })
              }else{
                DatabaseManageData.editNews(scope.editPost).then(function(newsData){
                  if(newsData.editNewsStatus){
                    alert('Post został poprawnie edytowany');
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
  name: 'editNews',
  fn: editNews
};
