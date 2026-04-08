"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePassword = encodePassword;
exports.comparePassword = comparePassword;
const bcrypt = require("bcrypt");
const SALT = 10;
function encodePassword(rawPassword) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}
function comparePassword(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
//# sourceMappingURL=bcrypt.js.map