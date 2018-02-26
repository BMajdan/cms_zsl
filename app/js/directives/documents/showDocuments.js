function showDocuments(UploadFiles, AppSettings, VisualSiteService) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/documents/showDocuments.html',
    controller: 'ShowDocumentsController',
    link: (scope) => {
      
      //let bodyTable = angular.element(document.querySelector('#fileTableBody'));

      let getFileClass = (name) => {
        let ext = name.substring(name.lastIndexOf('.') + 1, name.length) || name;
        switch (ext) {
          case 'xlsx':
            return 'fas fa-file-excel';
          case 'xls':
            return 'fas fa-file-excel';
          case 'docx':
            return 'fas fa-file-word';
          case 'doc':
            return 'fas fa-file-word';
          case 'ppt':
            return 'fas fa-file-powerpoint';
          case 'pptx':
            return 'fas fa-file-powerpoint';
          case 'txt':
            return 'fas fa-file-alt';
          case 'pdf':
            return 'fas fa-file-pdf';
          case 'zip':
            return 'fas fa-file-archive';
          case 'rar':
            return 'fas fa-file-archive';
          case 'xml':
            return 'fas fa-file-code';
        }
      };

      VisualSiteService.loadingScreen.start();
      UploadFiles.loadDocuments().then(data => {
        if(data.success){
          scope.documents = data.object;
          scope.documentsUrl = AppSettings.documentsUrl;
          VisualSiteService.loadingScreen.stop();
        }else{
          VisualSiteService.loadingScreen.stop();
          swal('Upss!', 'Coś poszło nie tak', 'error');
        }
      }, err => {
        VisualSiteService.loadingScreen.stop();
        swal('Upss!', err, 'error');
      });

      scope.removeFile = (ident) =>{
        scope.documents.splice(ident, 1);
      };

      scope.editFile = (ident) =>{
        document.querySelector('#addNewFile').click();

        document.querySelector('#addNewFile').onchange = function () {
          scope.documents[ident].name = scope.addNewFile.name;
          scope.documents[ident].class = getFileClass(scope.addNewFile.name);
          scope.documents[ident].file = scope.addNewFile.name;
        };
      };

      scope.addFile = () => {
        document.querySelector('#addNewFile').click();
        document.querySelector('#addNewFile').onchange = function () {
          VisualSiteService.loadingScreen.start();
          let path = './documents';
          UploadFiles.uploadFile(scope.addNewFile, path).then(({data}) => {
            if(data.success){
              scope.file = {
                name: scope.addNewFile.name,
                description: 'Opis pliku...',
                class: getFileClass(scope.addNewFile.name)
              };
              UploadFiles.addInfoFile(scope.file).then(secondData => {
                if(secondData.success){
                  scope.documents.push(scope.file);
                  VisualSiteService.loadingScreen.stop();
                  swal('Dobra robota!', secondData.message, 'success');
                }else{
                  VisualSiteService.loadingScreen.stop();
                  swal('Upss!', 'Coś poszło nie tak', 'error');
                }
              }, err => {
                VisualSiteService.loadingScreen.stop();
                swal('Upss!', err, 'error');
              });
            }else{
              VisualSiteService.loadingScreen.stop();
              swal('Upss!', 'Coś poszło nie tak', 'error');
            }
          }, err => {
            VisualSiteService.loadingScreen.stop();
            swal('Upss!', err, 'error');
          });
        };
      };
    }
  };
}

export default {
  name: 'showDocuments',
  fn: showDocuments
};
