const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : path.join(__dirname + '/../uploads'),
    filename(req, file = {}, cb) {
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

const upload = multer({storage : storage});

module.exports = upload
