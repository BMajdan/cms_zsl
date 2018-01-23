function editNews($location, $timeout, DatabaseManageData) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/editNews.html',
    controller: 'EditNewsController',
    link: (scope) => {
      if(($location.path().split('/')[2]) == 'edytuj-post'){
        document.getElementById('addNewPostButton').style.display = 'none'
        DatabaseManageData.loadOneNews($location.path().split('/')[3]).then(function(data){
          if(data.loadNewsStatus == true && data.loadNewsData.length > 0){
            scope.oneNewsData = data.loadNewsData[0];
            scope.editArticleTitle = scope.oneNewsData.title;
            scope.editArticleShortText = scope.oneNewsData.shortText;
            scope.editArticleLongText = scope.oneNewsData.longText;
            scope.editArticleTags = scope.oneNewsData.tags
          }else{
            scope.oneNewsData = [];
            $location.path('/aktualnosci');
            return false;
          }
        });

        scope.changePostMiniature = function(){
          document.getElementById('editPostMiniature').click();
        }

        document.getElementById('editPostMiniature').onchange = function(){
          var vals = this.value,
          val = vals.length ? vals.split('\\').pop() : '';

          document.getElementById('editPostMiniatureImage').value = val;

          var reader = new FileReader();
          reader.onload = function(){
            var dataURL = reader.result;
            var output = document.getElementById('editPostMiniatureImage');
            output.src = dataURL;
          };
          reader.readAsDataURL(document.getElementById('editPostMiniature').files[0]);
        }
      }
    }
  };
}

export default {
  name: 'editNews',
  fn: editNews
};
