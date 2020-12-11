"use strict";
exports.__esModule = true;
exports.migrations = void 0;
var _1607467378403_InitialMigration_1 = require("src/database/migrations/1607467378403-InitialMigration");
var _1607642537673_AddUserRelationsMigration_1 = require("src/database/migrations/1607642537673-AddUserRelationsMigration");
exports.migrations = [
    _1607467378403_InitialMigration_1.InitialMigration1607467378403,
    _1607642537673_AddUserRelationsMigration_1.AddUserRelationsMigration1607642537673
];
