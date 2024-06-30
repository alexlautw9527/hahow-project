import HeroList from '@/features/heroes/components/hero-list';
import { Heading } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/heroes')({
  component: HeroListPage,
});

const headingEffect = css`
  background-image: url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmJqMHdhMWVzcGNnaHB1bDl3ZTB0eXBwaWdhNzByYzJwbGZlMWZjMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YqhIK6Gbor6CLeloBq/giphy-downsized.gif);
  background-size: contain;
  color: transparent;
  -moz-background-clip: text;
  -webkit-background-clip: text;
  text-transform: uppercase;
  margin: 10px 0;
`;

export function HeroListPage() {
  return (
    <div css={css({ minHeight: '100vh' })}>
      <div>
        <Heading as="h1" size="4xl" css={headingEffect} textAlign="center">
          CHOOSE Your Heroes
        </Heading>
        <div css={css({ maxWidth: 700, margin: '0 auto', padding: 24 })}>
          <HeroList />
        </div>
      </div>

      <Outlet />
    </div>
  );
}
