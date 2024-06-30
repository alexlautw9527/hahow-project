// import { css } from '@emotion/react';
import { type ReactElement } from 'react';
import styled from '@emotion/styled';
import type { CardProps } from '@/components/card';

const GalleryContainer = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

type GalleryProps = {
  children: ReactElement<CardProps>[];
};

export default function Gallery({ children }: GalleryProps) {
  return <GalleryContainer>{children}</GalleryContainer>;
}
