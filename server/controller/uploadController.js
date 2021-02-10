const multer = require('multer')
const util = require('util')
const GridFsStorage = require('multer-gridfs-storage')
const {mongoUri} = require('../config/config')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename(req, file, cb) {
        
        const {originalname: originalName} = file;
        // if you want to get the name of the file w/o the extension
        let ogName = originalName.split('.')[0]
        // set the name based on the field that came with the request
        // let someNameToSet = JSON.parse(req.body.kode)
        // check extension
        const fileExtension = (originalName.match(/\.+[\S]+$/) || [])[0];
        // set the name
        cb(null, `${ogName}${fileExtension}`);
    }
});




// const storage = new GridFsStorage({
//     url : mongoUri,
//     options : {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true,
//             useFindAndModify : true
//         },
//     file : (req, file) => {
//         return {
//             bucketName : 'photo',
//             filename : file.originalname
//         }

//     }
// })

const upload = multer({storage : storage})

module.exports = upload
