function showNews($location, $filter, News, Visual) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/news/showNews.html',
    link: (scope) => {

      document.getElementById('addNewPostButton').style.display = 'block';

      if (($location.path().split('/')[2]) === undefined) {
        Visual.loading.start();
        News.load.all().then(data => {
          if (data.success) {
            scope.newsData = data.object;
            for (let value of scope.newsData) {
              value.display = true;
            }
            Visual.loading.stop();
          } else {
            scope.newsData = [];
            Visual.loading.stop();
          }
        }, err => {
          swal('Upss!', err, 'error');
          scope.newsData = [];
          Visual.loading.stop();
        });
      }

      scope.editPost = (postIdent) => {
        $location.path(`/aktualnosci/edytuj-post/${postIdent}`);
        return false;
      };

      scope.removePost = (postIdent) => {

        let title = 'Czy jesteś pewien?', text = 'Czy na pewno usunąć ten post?!',
          icon = 'warning', buttons = ['Anuluj', 'Potwierdź'], dangerMode = true;

        Visual.notifications.asking(title, text, icon, buttons, dangerMode).then(buttonStatus => {
          if (buttonStatus) {
            Visual.loading.start();
            News.post.delete(postIdent).then(function (data) {
              if (data.success) {
                let found = $filter('ArrayFilter')('postIdent', postIdent, scope.newsData);
                scope.newsData.splice(found, 1);
                Visual.loading.stop();
                swal('Dobra robota!', data.message, 'success');
                Visual.loading.stop();
              } else {
                Visual.loading.stop();
                swal('Upss!', 'Coś poszło nie tak', 'error');
              }
            }, err => {
              Visual.loading.stop();
              swal('Upss!', err, 'error');
            });

          } else {
            swal('Uff!', 'Post nie został usunięty', 'info');
          }
        }, err => {
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

