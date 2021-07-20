import {User} from "./user.model";
import {CertificationRequestStatus} from "../enums/CertificationRequestStatus.enum";

export class CertificationRequest {
  id: string;
  comment: string;
  user: User;
  certificationRequestStatus: CertificationRequestStatus
  createdAt: Date;
}
