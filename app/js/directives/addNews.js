function addNews($location) {
  'ngInject';
  
  return {
    restrict: 'E',
    templateUrl: 'directives/addNews.html',
    controller: 'AddNewsController',
    link: (scope) => {

      
      if(($location.path().split('/')[2]) == 'dodaj-nowy-post'){
        document.getElementById('addNewPostButton').style.display = 'none'

        scope.changePostMiniature = function(){
          document.getElementById('addPostMiniature').click();
        }

        document.getElementById('addPostMiniature').onchange = function(){
          var vals = this.value,
          val = vals.length ? vals.split('\\').pop() : '';

          document.getElementById('addPostMiniatureImage').value = val;

          var reader = new FileReader();
          reader.onload = function(){
            var dataURL = reader.result;
            var output = document.getElementById('addPostMiniatureImage');
            output.src = dataURL;
          };
          reader.readAsDataURL(document.getElementById('addPostMiniature').files[0]);
        }
      }
    }
  };
}

export default {
  name: 'addNews',
  fn: addNews
};
