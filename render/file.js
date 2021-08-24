const compressing = require('compressing')
const path = require('path')
const fs = require('fs')
const openFileBtn  = document.querySelector('#open-file')

const goal_path = [
  path.join(process.env.APPDATA,'../Local/Trend Micro/DrSDK'),
  path.join(process.env.APPDATA,'../Local/Trend Micro/DRScanner')
]

openFileBtn.onclick = () =>{
    const temp_path=path.join(__dirname,'/temp')
    if(!fs.existsSync(temp_path)){
      createDir(temp_path)
    }
    for(let i = 0; i< goal_path.length;i++){
      let fileName = goal_path[i].split("\\").pop()
      let file_path = path.join(__dirname,'/temp',`/${fileName}`)
      copyFolder(goal_path[i], file_path, true);
    }
    zipFile();
}

function createDir (dirPath) {
    fs.mkdirSync(dirPath)        
}

function copyFolder(copiedPath, resultPath, direct) {
    if(!direct) {
        copiedPath = path.join(__dirname, copiedPath)
        resultPath = path.join(__dirname, resultPath)
    }

    if (fs.existsSync(copiedPath)) {
        createDir(resultPath)
        const files = fs.readdirSync(copiedPath, { withFileTypes: true });
        for (let i = 0; i < files.length; i++) {
            const cf = files[i]
            const ccp = path.join(copiedPath, cf.name)
            const crp = path.join(resultPath, cf.name)  
            if (cf.isFile()) {
                /**
                 * @des 创建文件,使用流的形式可以读写大文件
                 */
                const readStream = fs.createReadStream(ccp)
                const writeStream = fs.createWriteStream(crp)
                readStream.pipe(writeStream)
            } else {
                try {
                    /**
                     * @des 判断读(R_OK | W_OK)写权限
                     */
                    fs.accessSync(path.join(crp, '..'), fs.constants.W_OK)
                    copyFolder(ccp, crp, true)
                } catch (error) {
                    console.log('folder write error:', error);
                }
  
            }
        }
    } else {
        console.log('do not exist path: ', copiedPath);
    }
}

function zipFile (){
    compressing.zip.compressDir('temp','temp.zip')
    .then(() => {
      console.log('success');
      // upload();
    })
    .catch(err => {
      console.error(err);
    });
}