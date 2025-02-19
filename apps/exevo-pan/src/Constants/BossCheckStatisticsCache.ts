import { MILLISECONDS_IN } from 'shared-utils/dist/time'

export const BOSS_CHECK_STATISTICS_CACHE = {
  version: 1,
  MINIMUM_CACHE_ENTRIES: 1000,
  MAX_AGE: MILLISECONDS_IN.HOUR * 8,
}
