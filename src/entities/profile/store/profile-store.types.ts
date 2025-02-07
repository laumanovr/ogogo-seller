export interface IProfile {
  id: string;
  tradeMarkId?: string;
  name: string;
  description: string;
  logoBase64: string;
  currentUser?: IProfile;
  firstName?: string;
  lastName?: string;
  phone?: string;
  logoFileName?: string;
  version?: number;
  organizationId?: string;
  profileObj?: IProfile;
}
