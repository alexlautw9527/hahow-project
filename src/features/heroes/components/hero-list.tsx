import { useFetchHeroList } from '@/features/heroes/apis/queries';
import Gallery from '@/components/gallery';
import Card from '@/components/card';
import { useAppSelector } from '@/stores';
import { selectedHeroIdSelector } from '@/stores/global/global-slice';
import { BoxSkeleton } from '@/components/skeleton';

export default function HeroList() {
  const { data: heroList } = useFetchHeroList();
  const selectedHeroId = useAppSelector(selectedHeroIdSelector);

  if (!heroList) {
    return <BoxSkeleton />;
  }

  return (
    <Gallery>
      {heroList.map((hero) => (
        <Card
          key={hero.caption}
          src={hero.src}
          caption={hero.caption}
          href={hero.href}
          isActive={hero.id === selectedHeroId}
        />
      ))}
    </Gallery>
  );
}
