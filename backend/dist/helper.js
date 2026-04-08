"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesHelper = void 0;
class FilesHelper {
    static customFileName(req, file, cb) {
        const datenow = new Date();
        let fileExtension = "";
        if (file.mimetype.indexOf("application/pdf") > -1) {
            fileExtension = "pdf";
        }
        if (file.mimetype.indexOf("image/png") > -1) {
            fileExtension = "png";
        }
        if (file.mimetype.indexOf("image/jpeg") > -1) {
            fileExtension = "jpeg";
        }
        if (file.mimetype.indexOf("image/jpg") > -1) {
            fileExtension = "jpg";
        }
        var originalName = "";
        var fileArray = file.originalname.split(".");
        for (var i = 0; i < fileArray.length; i++) {
            fileArray[i] = fileArray[i].replaceAll(",", '');
            if (i == fileArray.length - 2) {
                fileArray[i] = fileArray[i].replace(/[^a-zA-Z0-9 _-]/g, '');
                originalName += fileArray[i];
            }
            else {
                originalName += fileArray[i] + ".";
            }
            if (i == fileArray.length - 2)
                break;
        }
        cb(null, originalName + "." + fileExtension);
    }
    static destinationPath(req, file, cb) {
        cb(null, '../file_list/');
    }
}
exports.FilesHelper = FilesHelper;
//# sourceMappingURL=helper.js.map