function showNews($location, $filter, DatabaseManageData) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/showNews.html',
    link: (scope) => {

      document.getElementById('addNewPostButton').style.display = 'block'

    	if(($location.path().split('/')[2]) === undefined){
    		DatabaseManageData.loadAllNews().then(function(data){
	    		if(data.loadNewsStatus == true){
	    			scope.newsData = data.loadNewsData;
	    		}else{
	    			scope.newsData = [];
	    		}
	    	});
    	}

    	scope.editPosts = (postIdent) => {
    		$location.path('/aktualnosci/edytuj-post/' + postIdent);
    		return false;
    	}

    	scope.removePost = (postIdent) => {
    		DatabaseManageData.deleteNews(postIdent).then(function(data){
          if(data.deleteNewsStatus){
            alert(data.deleteNewsMessage)
            let found = $filter('ArrayFilter')('postIdent', postIdent, scope.newsData);
            scope.newsData.splice(found, 1)
          }
        })
    	}
    }
  };
}

export default {
  name: 'showNews',
  fn: showNews
};
