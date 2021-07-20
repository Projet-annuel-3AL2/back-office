import {User} from "./user.model";

export class Certification {
  id: string;
  user: User;
  issuer: User;
  createdAt: Date;
}
