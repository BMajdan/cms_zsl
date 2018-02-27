function showDocuments(UploadFiles, AppSettings, VisualSiteService) {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'directives/documents/showDocuments.html',
    controller: 'ShowDocumentsController',
    link: (scope) => {

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

      let uploadFile = (path, fileName, fileDescription, ident, oldName) => {
        VisualSiteService.loadingScreen.start();
        UploadFiles.uploadFile(scope.addNewFile, path, fileName, oldName).then( ({data}) => {
          if (data.success) {
            scope.file = {
              name: fileName,
              description: fileDescription,
              class: getFileClass(scope.addNewFile.name),
              display: true
            };
            UploadFiles.addInfoFile(scope.file, oldName).then(secondData => {
              if (secondData.success) {
                if (oldName){
                  scope.documents.splice(ident, 1);
                  scope.documents.splice(ident, 0, scope.file);
                }else
                  scope.documents.push(scope.file);

                VisualSiteService.loadingScreen.stop();
                swal('Dobra robota!', secondData.message, 'success');
              } else {
                VisualSiteService.loadingScreen.stop();
                swal('Upss!', 'Coś poszło nie tak', 'error');
              }
            }, err => {
              VisualSiteService.loadingScreen.stop();
              swal('Upss!', err, 'error');
            });
          } else {
            VisualSiteService.loadingScreen.stop();
            swal('Upss!', 'Coś poszło nie tak', 'error');
          }
        }, err => {
          VisualSiteService.loadingScreen.stop();
          swal('Upss!', err, 'error');
        });
      };

      VisualSiteService.loadingScreen.start();
      UploadFiles.loadDocuments().then(data => {
        if (data.success) {
          scope.documents = data.object;
          scope.documentsUrl = AppSettings.documentsUrl;
          VisualSiteService.loadingScreen.stop();
          for (let value of scope.documents) {
            value.display = true;
          }
        } else {
          VisualSiteService.loadingScreen.stop();
          swal('Upss!', 'Coś poszło nie tak', 'error');
        }
      }, err => {
        VisualSiteService.loadingScreen.stop();
        swal('Upss!', err, 'error');
      });

      scope.deleteFile = (ident) => {
        let title = 'Czy jesteś pewien?', text = 'Czy na pewno usunąć ten plik?!',
          icon = 'warning', buttons = ['Anuluj', 'Potwierdź'], dangerMode = true;

        VisualSiteService.notifications.asking(title, text, icon, buttons, dangerMode).then(buttonStatus => {
          if (buttonStatus) {
            VisualSiteService.loadingScreen.start();
            UploadFiles.deleteFile(scope.documents[ident].name).then(data => {
              if (data.success) {
                scope.documents.splice(ident, 1);
                VisualSiteService.loadingScreen.stop();
                swal('Dobra robota!', data.message, 'success');
              }else{
                VisualSiteService.loadingScreen.stop();
                swal('Upss!', 'Coś poszło nie tak', 'error');
              }
            }, err => {
              VisualSiteService.loadingScreen.stop();
              swal('Upss!', err, 'error');
            });
            
            VisualSiteService.loadingScreen.stop();
          } else {
            swal('Uff!', 'Plik nie został usunięty', 'info');
          }
        }, err => {
          swal('Upss!', err, 'error');
        });
      };

      scope.editFile = (ident) => {
        document.querySelector('#addNewFile').value = null;
        document.querySelector('#addNewFile').click();
        document.querySelector('#addNewFile').onchange = function () {
          let title = 'Podaj nazwę pliku', icon = 'info', element = 'input', placeholder = '',
            type = 'text', value = scope.addNewFile.name, id = 'fileName';

          VisualSiteService.notifications.input(title, icon, element, placeholder, type, value, id).then(success => {
            let regEx = new RegExp(/^(?!^(PRN|AUX|CLOCK\$|NUL|CON|COM\d|LPT\d|\..*)(\..+)?$)[^\x00-\x1f\\?*:\";|/]+$/g);
            let fileName = angular.element(document.querySelector('#fileName'))[0].value;

            for (let i = 0; i < scope.documents.length; i++) {
              if (fileName == scope.documents[i].name) {
                swal('Upss!', 'Plik o podanej nazwie już istnieje', 'error');
                return;
              }
            }

            if (success === 3)
              return;

            if (fileName.length >= 3 && regEx.test(fileName)) {
              let title = 'Podaj opis pliku', icon = 'info', element = 'input', placeholder = 'Opis pliku...',
                type = 'text', value = '', id = 'fileDescription';

              VisualSiteService.notifications.input(title, icon, element, placeholder, type, value, id).then(success => {
                let fileDescription = angular.element(document.querySelector('#fileDescription'))[0].value;

                if (success === 3)
                  return;

                if (fileDescription.length >= 3) {
                  let path = './documents';
                  uploadFile(path, fileName, fileDescription, ident, scope.documents[ident].name);
                } else {
                  swal('Upss!', 'Opis pliku jest niepoprawny', 'error');
                }

              }, err => {
                swal('Upss!', err, 'error');
              });
            } else {
              swal('Upss!', 'Niepoprawna nazwa pliku', 'error');
            }
          }, err => {
            swal('Upss!', err, 'error');
          });
        };
      };

      scope.addFile = () => {
        document.querySelector('#addNewFile').value = null;
        document.querySelector('#addNewFile').click();
        document.querySelector('#addNewFile').onchange = function () {
          let title = 'Podaj nazwę pliku', icon = 'info', element = 'input', placeholder = '',
            type = 'text', value = scope.addNewFile.name, id = 'fileName';

          VisualSiteService.notifications.input(title, icon, element, placeholder, type, value, id).then(success => {
            let regEx = new RegExp(/^(?!^(PRN|AUX|CLOCK\$|NUL|CON|COM\d|LPT\d|\..*)(\..+)?$)[^\x00-\x1f\\?*:\";|/]+$/g);
            let fileName = angular.element(document.querySelector('#fileName'))[0].value;

            for(let i = 0; i < scope.documents.length; i++){
              if (fileName == scope.documents[i].name){
                swal('Upss!', 'Plik o podanej nazwie już istnieje', 'error');
                return;
              }
            }

            if (success === 3)
              return;

            if (fileName.length >= 3 && regEx.test(fileName)) {
              let title = 'Podaj opis pliku', icon = 'info', element = 'input', placeholder = 'Opis pliku...',
                type = 'text', value = '', id = 'fileDescription';

              VisualSiteService.notifications.input(title, icon, element, placeholder, type, value, id).then(success => {
                let fileDescription = angular.element(document.querySelector('#fileDescription'))[0].value;

                if (success === 3)
                  return;

                if (fileDescription.length >= 3) {
                  let path = './documents';
                  uploadFile(path, fileName, fileDescription);
                } else {
                  swal('Upss!', 'Opis pliku jest niepoprawny', 'error');
                }

              }, err => {
                swal('Upss!', err, 'error');
              });
            } else {
              swal('Upss!', 'Niepoprawna nazwa pliku', 'error');
            }
          }, err => {
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
