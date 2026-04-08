"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileFilter = void 0;
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
//# sourceMappingURL=file-uploading.utils.js.map