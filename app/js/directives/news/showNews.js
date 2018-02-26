function showNews($location, $filter, NewsDatabase, VisualSiteService) {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'directives/news/showNews.html',
		link: (scope) => {

			document.getElementById('addNewPostButton').style.display = 'block';

			if (($location.path().split('/')[2]) === undefined) {
				VisualSiteService.loadingScreen.start();
				NewsDatabase.loadAllNews().then(data => {
					if (data.success) {
						scope.newsData = data.object;
						for (let value of scope.newsData) {
							value.display = true;
						}
						VisualSiteService.loadingScreen.stop();
					} else {
						scope.newsData = [];
						VisualSiteService.loadingScreen.stop();
					}
				}, err => {
					swal('Upss!', err, 'error');
					scope.newsData = [];
					VisualSiteService.loadingScreen.stop();
				});
			}

			scope.editPost = (postIdent) => {
				$location.path(`/aktualnosci/edytuj-post/${postIdent}`);
				return false;
			};

			scope.removePost = (postIdent) => {
				VisualSiteService.loadingScreen.start();
				NewsDatabase.deletePost(postIdent).then(function (data) {
					if (data.success) {
						let found = $filter('ArrayFilter')('postIdent', postIdent, scope.newsData);
						scope.newsData.splice(found, 1);
						VisualSiteService.loadingScreen.stop();
						swal('Dobra robota!', data.message, 'success');
						VisualSiteService.loadingScreen.stop();
					}else{
						VisualSiteService.loadingScreen.stop();
						swal('Upss!', 'Coś poszło nie tak', 'error');
					}
				}, err => {
					VisualSiteService.loadingScreen.stop();
					swal('Upss!', err, 'error');
				});
			};
		}
	};
}

export default {
	name: 'showNews',
	fn: showNews
};
