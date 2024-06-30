type Hero = {
  id: string;
  name: string;
  image: string;
};

type FetchHeroData = Hero;

type FetchHeroRequestOptions = {
  pathParams: {
    heroId: string;
  };
};

type FetchHeroProfileRequestOptions = FetchHeroRequestOptions;

type FetchHeroListData = Hero[];

type FetchHeroProfileData = {
  str: number;
  int: number;
  agi: number;
  luk: number;
};

type UpdateHeroProfileRequestOptions = {
  reqBody: FetchHeroProfileData;
} & FetchHeroRequestOptions;

type UpdateHeroProfileData = FetchHeroProfileData;

export type {
  Hero,
  FetchHeroListData,
  FetchHeroRequestOptions,
  FetchHeroData,
  FetchHeroProfileRequestOptions,
  FetchHeroProfileData,
  UpdateHeroProfileRequestOptions,
  UpdateHeroProfileData,
};
