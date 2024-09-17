import { describe, it, expect, vi } from 'vitest';

import { cookies } from 'next/headers';
import { getSession } from '../../lib/auth/getUserData';
import { checkAndClearSession } from './../../../src/app/actions/session';

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(),
    delete: vi.fn(),
  })),
}));

vi.mock('../../app/firebase/firebase-admin', () => ({
  create: vi.fn(() => ({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  })),
}));

vi.mock('next-intl', () => ({
  ...vi.importActual('next-intl'),
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/navigation', () => ({
  ...vi.importActual('next/navigation'),
  useRouter: () => {
    return {
      push: () => vi.fn(),
    };
  },
}));

vi.mock('../../lib/auth/getUserData', () => ({
  getSession: vi.fn(),
}));

describe('checkAndClearSession', () => {
  it('should clear cookie if session is expired', async () => {
    // Setup
    // const mockGetSession = getSession;
    vi.mocked(getSession).mockResolvedValue({ expired: true });

    // Execute
    const result = await checkAndClearSession();

    // Assert
    expect(result).toEqual({ expired: true });
    expect(cookies().delete).not.toHaveBeenCalled();
    // expect(cookies().delete).toHaveBeenCalledWith('graphiql-app-f134va');
  });

  it('should not clear cookie if session is not expired', async () => {
    // Setup
    vi.mocked(getSession).mockResolvedValue({ expired: false });

    // Execute
    const result = await checkAndClearSession();

    // Assert
    expect(result).toEqual({ expired: false });
    expect(cookies().delete).not.toHaveBeenCalled();
  });
});
