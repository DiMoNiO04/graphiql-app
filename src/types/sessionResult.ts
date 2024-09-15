import { DecodedIdToken } from 'firebase-admin/auth';

export interface SessionResult {
  user?: DecodedIdToken;
  expired: boolean;
  name?: string;
  error?: string;
}
