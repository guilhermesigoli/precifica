import { InitialMigration1607467378403 } from 'src/database/migrations/1607467378403-InitialMigration';
import { AddUserRelationsMigration1607642537673 } from 'src/database/migrations/1607642537673-AddUserRelationsMigration';

export const migrations = [
  InitialMigration1607467378403,
  AddUserRelationsMigration1607642537673,
];
