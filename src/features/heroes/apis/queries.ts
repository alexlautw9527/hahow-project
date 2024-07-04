import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/features/heroes/apis/services';
import { API_SERVICES } from '@/features/heroes/apis/configs';
import {
  FetchHeroProfileRequestOptions,
  FetchHeroRequestOptions,
  UpdateHeroProfileRequestOptions,
} from '@/features/heroes/apis/types';

export function useFetchHeroList() {
  const query = useQuery({
    queryKey: [API_SERVICES.FETCH_HERO_LIST],
    queryFn: apiService[API_SERVICES.FETCH_HERO_LIST],
    select: (serviceResult) => {
      if (!serviceResult?.data) return [];
      return serviceResult.data.map((hero) => ({
        src: hero.image,
        caption: hero.name,
        href: `/heroes/${hero.id}`,
        id: hero.id,
      }));
    },
  });

  return query;
}

export function useFetchHero(reqOptions: FetchHeroRequestOptions) {
  const { heroId } = reqOptions.pathParams;
  const query = useQuery({
    queryKey: [API_SERVICES.FETCH_HERO, { pathParams: { heroId } }],
    queryFn: () =>
      apiService[API_SERVICES.FETCH_HERO]({ pathParams: { heroId } }),
    select: (serviceResult) => serviceResult?.data,
  });

  return query;
}

export function useFetchHeroProfile(
  reqOptions: FetchHeroProfileRequestOptions
) {
  const { heroId } = reqOptions.pathParams;
  const query = useQuery({
    queryKey: [API_SERVICES.FETCH_HERO_PROFILE, { pathParams: { heroId } }],
    queryFn: () =>
      apiService[API_SERVICES.FETCH_HERO_PROFILE]({ pathParams: { heroId } }),
    select: (serviceResult) => serviceResult?.data,
  });

  return query;
}

export function useUpdateHeroProfile(
  reqOptions: Omit<UpdateHeroProfileRequestOptions, 'reqBody'>
) {
  const {
    pathParams: { heroId },
  } = reqOptions;

  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: [API_SERVICES.UPDATE_HERO_PROFILE, { pathParams: { heroId } }],
    mutationFn: ({
      reqBody,
    }: {
      reqBody: UpdateHeroProfileRequestOptions['reqBody'];
    }) =>
      apiService[API_SERVICES.UPDATE_HERO_PROFILE]({
        pathParams: { heroId },
        reqBody,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_SERVICES.FETCH_HERO_PROFILE, { pathParams: { heroId } }],
      });
    },
  });

  return query;
}
