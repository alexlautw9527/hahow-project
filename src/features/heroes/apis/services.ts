import { createService } from '@/lib/api/api-service-factory';
import { API_SERVICES, apiPath } from './configs';

import type {
  FetchHeroListData,
  FetchHeroRequestOptions,
  FetchHeroData,
  FetchHeroProfileRequestOptions,
  FetchHeroProfileData,
  UpdateHeroProfileRequestOptions,
  UpdateHeroProfileData,
} from './types';

export const apiService = {
  [API_SERVICES.FETCH_HERO_LIST]: createService<null, FetchHeroListData>({
    url: apiPath[API_SERVICES.FETCH_HERO_LIST].path,
    method: apiPath[API_SERVICES.FETCH_HERO_LIST].method,
  }),
  [API_SERVICES.FETCH_HERO]: createService<
    FetchHeroRequestOptions,
    FetchHeroData
  >({
    url: apiPath[API_SERVICES.FETCH_HERO].path,
    method: apiPath[API_SERVICES.FETCH_HERO].method,
  }),
  [API_SERVICES.FETCH_HERO_PROFILE]: createService<
    FetchHeroProfileRequestOptions,
    FetchHeroProfileData
  >({
    url: apiPath[API_SERVICES.FETCH_HERO_PROFILE].path,
    method: apiPath[API_SERVICES.FETCH_HERO_PROFILE].method,
  }),
  [API_SERVICES.UPDATE_HERO_PROFILE]: createService<
    UpdateHeroProfileRequestOptions,
    UpdateHeroProfileData
  >({
    url: apiPath[API_SERVICES.UPDATE_HERO_PROFILE].path,
    method: apiPath[API_SERVICES.UPDATE_HERO_PROFILE].method,
  }),
};
