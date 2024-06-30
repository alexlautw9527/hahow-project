import { useFetchHeroList } from '@/features/heroes/apis/queries';
import { Flex, Heading, Select } from '@chakra-ui/react';

import { createFileRoute } from '@tanstack/react-router';
import HeroProfile from '@/features/heroes/components/hero-profile/';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/heroes/$heroId')({
  component: HeroIdPage,
});

function HeroIdPage() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };
  const { heroId } = Route.useParams();
  const { data: heroList } = useFetchHeroList();
  if (!heroList) return null;
  const heroName = heroList.find((hero) => hero.id === heroId)?.caption;
  return (
    <div
      css={css({
        maxWidth: 500,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 24,
        paddingTop: 0,
      })}
    >
      <Heading as="h2">{heroName}</Heading>
      <HeroProfile heroId={heroId} />
      <Flex justifyContent="end" width="full">
        <Select
          defaultValue={i18n.language}
          width="150px"
          onChange={handleChangeLanguage}
          css={css({
            width: 150,
          })}
        >
          <option value="en">English</option>
          <option value="zh-TW">繁體中文</option>
        </Select>
      </Flex>
    </div>
  );
}
