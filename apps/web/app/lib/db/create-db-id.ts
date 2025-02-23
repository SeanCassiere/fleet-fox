import { createId } from '@paralleldrive/cuid2';
import { env } from '~/lib/utils/env';

export const dbPrefixes = {
  account: 'acc',
  tenant: 'ten',
  session: 'ses',
} as const;

const dbEnv = {
  live: '',
  dev: 'dev',
} as const;

/**
 * Returns a unique database ID
 * @param key_prefix
 * @param key_env
 * @returns
 * @example
 * ```ts
 * createDbId("account");
 * //=> "acc_01B1E5Z5KQZ
 * ```
 */
export function createDbId(key_prefix: keyof typeof dbPrefixes) {
  return joinDbId(getDbEnvKey(), dbPrefixes[key_prefix], createId());
}

export function joinDbId(...ids: string[]) {
  return ids.filter(Boolean).join('_');
}

export function getDbEnvKey() {
  return dbEnv[env.MODE === 'production' ? 'live' : 'dev'];
}
