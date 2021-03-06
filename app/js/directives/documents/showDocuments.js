function showDocuments(Files, AppSettings, Visual) {
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
          default: 
            return 'fas fa-file';
        }
      };

      let showNotification = (ident, oldName, isEdited) => {
        let title = 'Podaj nazwę pliku', icon = 'info', element = 'input', placeholder = '',
          type = 'text', value = '', id = 'fileName';

        if (isEdited)
          value = scope.documents[ident].name;
        else
          value = scope.addNewFile.name;

        Visual.notifications.input(title, icon, element, placeholder, type, value, id).then(success => {
          let regEx = new RegExp(/^(?!^(PRN|AUX|CLOCK\$|NUL|CON|COM\d|LPT\d|\..*)(\..+)?$)[^\x00-\x1f\\?*:\";|/]+$/g);
          let fileName = angular.element(document.querySelector('#fileName'))[0].value;

          if (success === 3)
            return;

          for (let i = 0; i < scope.documents.length; i++) {
            if (fileName == scope.documents[i].name) {
              swal('Upss!', 'Plik o podanej nazwie już istnieje', 'error');
              return;
            }
          }

          if (fileName.length >= 3 && regEx.test(fileName)) {

            let title = 'Podaj opis pliku', icon = 'info', element = 'input', placeholder = 'Opis pliku...',
              type = 'text', value = '', id = 'fileDescription';

            if (isEdited)
              value = scope.documents[ident].description;

            Visual.notifications.input(title, icon, element, placeholder, type, value, id).then(success => {
              let fileDescription = angular.element(document.querySelector('#fileDescription'))[0].value;

              if (success === 3)
                return;

              if (fileDescription.length >= 3) {
                let path = './documents';
                Visual.loading.start();

                Files.upload.file(scope.addNewFile, path, fileName, oldName).then(({ data }) => {
                  if (data.success) {
                    scope.file = {
                      name: fileName,
                      description: fileDescription,
                      class: getFileClass(fileName),
                      display: true
                    };
                    Files.add.info(scope.file, oldName).then(secondData => {
                      if (secondData.success) {
                        if (oldName) {
                          scope.documents.splice(ident, 1);
                          scope.documents.splice(ident, 0, scope.file);
                        } else
                          scope.documents.push(scope.file);

                        Visual.loading.stop();
                        swal('Dobra robota!', secondData.message, 'success');
                      } else {
                        Visual.loading.stop();
                        swal('Upss!', 'Coś poszło nie tak', 'error');
                      }
                    }, err => {
                      Visual.loading.stop();
                      swal('Upss!', err, 'error');
                    });
                  } else {
                    Visual.loading.stop();
                    swal('Upss!', 'Coś poszło nie tak', 'error');
                  }
                }, err => {
                  Visual.loading.stop();
                  swal('Upss!', err, 'error');
                });
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

      let uploadFile = (ident, oldName, isEdited) => {
        document.querySelector('#addNewFile').value = null;
        if (isEdited)
          showNotification(ident, oldName, isEdited);
        else
          document.querySelector('#addNewFile').click();


        document.querySelector('#addNewFile').onchange = function () {
          showNotification(ident, oldName, isEdited);
        };
      };

      let loadDocuments = () => {
        Visual.loading.start();
        Files.load.documents().then(data => {
          if (data.success) {
            scope.documents = data.object;
            scope.documentsUrl = AppSettings.documentsUrl;
            Visual.loading.stop();
            for (let value of scope.documents) {
              value.display = true;
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

      scope.deleteFile = (ident) => {
        let title = 'Czy jesteś pewien?', text = 'Czy na pewno usunąć ten plik?!',
          icon = 'warning', buttons = ['Anuluj', 'Potwierdź'], dangerMode = true;

        Visual.notifications.asking(title, text, icon, buttons, dangerMode).then(buttonStatus => {
          if (buttonStatus) {
            Visual.loading.start();
            Files.delete.file(scope.documents[ident].name).then(data => {
              if (data.success) {
                scope.documents.splice(ident, 1);
                Visual.loading.stop();
                swal('Dobra robota!', data.message, 'success');
              } else {
                Visual.loading.stop();
                swal('Upss!', 'Coś poszło nie tak', 'error');
              }
            }, err => {
              Visual.loading.stop();
              swal('Upss!', err, 'error');
            });

            Visual.loading.stop();
          } else {
            swal('Uff!', 'Plik nie został usunięty', 'info');
          }
        }, err => {
          swal('Upss!', err, 'error');
        });
      };

      scope.editFile = (ident) => {
        uploadFile(ident, scope.documents[ident].name, true);
      };

      scope.addFile = () => {
        uploadFile();
      };

      //Init page
      loadDocuments();
    }
  };
}

export default {
  name: 'showDocuments',
  fn: showDocuments
};
