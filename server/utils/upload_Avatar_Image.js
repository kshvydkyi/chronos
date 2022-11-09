import multer from 'multer'

const fileStorageEngineAvatar = multer.diskStorage({
    destination: (_req, _file, cb) => {
		cb(null, './avatars');
    },

    filename: (_req, file, cb) => {
      	cb(null, `${file.originalname}`);
		
    },
});

const upload_Avatar_Image = multer({ storage: fileStorageEngineAvatar });

export default upload_Avatar_Image;

