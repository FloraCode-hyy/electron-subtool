const { app, BrowserWindow, Notification} = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      contextIsolation:false,
      enableRemoteModule:true
    }
  })
  require('./main/menu.js')

  win.loadFile('index.html')
  

  // win.setThumbarButtons([
  //   {
  //     tooltip: 'button1',
  //     icon: path.join(__dirname, 'button1.png'),
  //     click () { console.log('button1 clicked') }
  //   }, 
  //   {
  //     tooltip: 'button2',
  //     icon: path.join(__dirname, 'button2.png'),
  //     flags: ['enabled', 'dismissonclick'],
  //     click () { console.log('button2 clicked.') }
  //   }
  // ])
}

//通知只有在第一次开启的时候，reload不会展示
function showNotification (){
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

// function showNotification () {
//   const notification = new Notification ({title:'title',body:'Notification from the huayingying process'})
//   notification.show()
// }

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}).then(showNotification)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//下方菜单的快捷栏
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
