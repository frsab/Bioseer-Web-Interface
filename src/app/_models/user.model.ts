export class User {
  username: string;
  email: string;
  hash: string;
  firstName: string;
  lastName: string;
  sensorsIds?: [string];
  savedZones?: [string];
  createdDate?: Date;
}
