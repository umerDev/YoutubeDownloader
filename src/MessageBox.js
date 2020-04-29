const { dialog } = require('electron')

const options = {
    type: 'question',
    buttons: ['ok'],
    defaultId: 2,
    title: 'Question',
    message: 'Download complete',
    detail: 'All files have been downloaded successfully',
    checkboxLabel: 'Remember my answer',
    checkboxChecked: true,
  };

 module.exports.DialogueMessage = DialogueMessage = () => {
    let r = dialog.showMessageBox(options)
    console.log(r);
}