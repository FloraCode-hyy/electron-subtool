 const { Menu } = require('electron')

 var template = [
     {
         label:' hyy-file',
         submeun:[
             {
                 label:'open file'
             },
             {
                 label:'close file'
             }
         ]
     },
     {
         label:'hyy-edit',
         submeun:[
             {
                 label:'cut'
             },
             {
                 label:'paste'
             },
             {
                 label:'copy'
             }
         ]
     }
 ]

 var m = Menu.buildFromTemplate(template)

 Menu.getApplicationMenu(m)