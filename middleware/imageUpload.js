const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './static/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
// Create a multer instance with the storage configuration
const upload = multer({ storage });

module.exports = upload