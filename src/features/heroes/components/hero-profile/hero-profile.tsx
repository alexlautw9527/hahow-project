import {
  useFetchHeroProfile,
  useUpdateHeroProfile,
} from '@/features/heroes/apis/queries';
import { BoxSkeleton } from '@/components/skeleton';

import { useAppDispatch } from '@/stores';
import { updateSelectedHeroId } from '@/stores/global/global-slice';

import { useEffect } from 'react';
import CharacterEditor from './character-editor';

import type { CharacterEditorProps } from './character-editor';

type HeroProfileProps = {
  heroId: string;
};

export default function HeroProfile({ heroId }: HeroProfileProps) {
  const dispatch = useAppDispatch();
  const { data: heroProfile, isFetching } = useFetchHeroProfile({
    pathParams: { heroId },
  });

  const { mutate: updateHeroProfile, isPending: isUpdateHeroProfilePending } =
    useUpdateHeroProfile({
      pathParams: { heroId },
    });

  const handleSubmit: CharacterEditorProps['onSubmit'] = (
    characterAttributes
  ) => {
    updateHeroProfile({ reqBody: characterAttributes });
  };

  const totalPoint = heroProfile
    ? Object.values(heroProfile).reduce((acc, point) => acc + point, 0)
    : 0;

  useEffect(() => {
    dispatch(updateSelectedHeroId(heroId));
  }, [heroId, dispatch]);

  if (!heroProfile || isFetching) {
    return <BoxSkeleton />;
  }

  return (
    <CharacterEditor
      totalPoints={totalPoint}
      characterAttributes={heroProfile}
      onSubmit={handleSubmit}
      isLoading={isUpdateHeroProfilePending}
    />
  );
}
