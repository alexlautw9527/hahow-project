import { useRef, type ReactElement } from 'react';
import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';
import { css } from '@emotion/react';

export type CardProps = {
  src: string;
  caption: string;
  href?: string;
  isActive?: boolean;
};

type CardContainerProps = {
  isActive?: boolean;
};

const baseStyles = css`
  --gallery-height: 10rem;
  --gallery-aspect-ratio: 3/4;
  margin: 0;
  background-color: hsl(200, 85%, 2%);
  display: grid;
  grid-template-areas: 'card';
  place-items: end;
  border-radius: 1rem;
  border: 6px solid;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-out;
`;

const activeStyles = css`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: grayscale(1) brightness(0.7);
    z-index: 1;
  }
`;

const hoverStyles = css`
  &:hover {
    transform: rotateX(var(--x-rotation)) rotateY(var(--y-rotation)) scale(1.05);
  }
`;

const aspectRatioStyles = css`
  @supports (aspect-ratio: 1) {
    aspect-ratio: var(--gallery-aspect-ratio);
    height: auto;
  }
`;

const CardContainer = styled.figure<CardContainerProps>`
  ${baseStyles}
  height: var(--gallery-height);

  ${({ isActive }) => (isActive ? activeStyles : hoverStyles)}
  ${aspectRatioStyles}
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-area: card;
`;

const CardCaption = styled.p`
  position: absolute;
  font-size: 1rem;
  font-family: Anton;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
`;

function HoverTiltContainer({ children }: { children: ReactElement }) {
  const boundingRef = useRef<DOMRect | null>(null);

  return (
    <div
      css={css({
        perspective: '500px',
        '@media (max-width: 768px)': {
          perspective: '800px',
        },
        '@media (max-width: 480px)': {
          perspective: '1000px',
        },
      })}
      onMouseLeave={() => {
        boundingRef.current = null;
      }}
      onMouseEnter={(ev) => {
        boundingRef.current = ev.currentTarget.getBoundingClientRect();
      }}
      onMouseMove={(ev) => {
        if (!boundingRef.current) return;
        const x = ev.clientX - boundingRef.current.left;
        const y = ev.clientY - boundingRef.current.top;
        const xPercentage = x / boundingRef.current.width;
        const yPercentage = y / boundingRef.current.height;
        const xRotation = (xPercentage - 0.5) * 20;
        const yRotation = (0.5 - yPercentage) * 20;

        ev.currentTarget.style.setProperty('--x-rotation', `${yRotation}deg`);
        ev.currentTarget.style.setProperty('--y-rotation', `${xRotation}deg`);
        ev.currentTarget.style.setProperty('--x', `${xPercentage * 100}%`);
        ev.currentTarget.style.setProperty('--y', `${yPercentage * 100}%`);
      }}
    >
      {children}
    </div>
  );
}

export default function Card({
  src,
  caption,
  href = '',
  isActive = false,
}: CardProps) {
  if (href) {
    return (
      <Link to={href} tabIndex={0}>
        <HoverTiltContainer>
          <CardContainer isActive={isActive}>
            <Img alt={caption} src={src} />
            <CardCaption>{caption}</CardCaption>
          </CardContainer>
        </HoverTiltContainer>
      </Link>
    );
  }

  return (
    <HoverTiltContainer>
      <CardContainer isActive={isActive}>
        <Img alt={caption} src={src} />
        <CardCaption>{caption}</CardCaption>
      </CardContainer>
    </HoverTiltContainer>
  );
}
