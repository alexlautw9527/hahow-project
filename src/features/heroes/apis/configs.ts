export const API_SERVICES = {
  FETCH_HERO_LIST: 'fetchHeroList',
  FETCH_HERO: 'fetchHero',
  FETCH_HERO_PROFILE: 'fetchHeroProfile',
  UPDATE_HERO_PROFILE: 'updateHeroProfile',
} as const;

export const apiPath = {
  [API_SERVICES.FETCH_HERO_LIST]: {
    path: '/heroes',

    // 使用小寫, 讓 axios 和 msw 都能使用
    method: 'get',
  },
  [API_SERVICES.FETCH_HERO]: {
    path: '/heroes/:heroId',
    method: 'get',
  },
  [API_SERVICES.FETCH_HERO_PROFILE]: {
    path: '/heroes/:heroId/profile',
    method: 'get',
  },
  [API_SERVICES.UPDATE_HERO_PROFILE]: {
    path: '/heroes/:heroId/profile',
    method: 'patch',
  },
} as const;
