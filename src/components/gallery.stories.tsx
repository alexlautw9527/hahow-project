import type { Meta, StoryObj } from '@storybook/react';

import Gallery from '@/components/gallery';
import Card from '@/components/card';

import { css } from '@emotion/react';

const meta: Meta<typeof Gallery> = {
  title: 'components/Gallery',
  component: Gallery,
  decorators: [
    (Story) => (
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div css={css({ width: 700 })}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: [
      <Card
        key="Doctor Strange 1"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="Doctor Strange"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 2"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="史傳奇"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 2"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="奇異博士"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 1"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="至尊魔法師"
        isActive={false}
      />,
    ],
  },
};

export const MediumSize: Story = {
  decorators: [
    (Story) => (
      <div css={css({ width: 500 })}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: [
      <Card
        key="Doctor Strange 1"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="Doctor Strange"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 2"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="史傳奇"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 2"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="奇異博士"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 1"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="至尊魔法師"
        isActive={false}
      />,
    ],
  },
};

export const SmallSize: Story = {
  decorators: [
    (Story) => (
      <div css={css({ width: 400 })}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: [
      <Card
        key="Doctor Strange 1"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="Doctor Strange"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 2"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="史傳奇"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 2"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="奇異博士"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 1"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="至尊魔法師"
        isActive={false}
      />,
    ],
  },
};

export const BaseSize: Story = {
  decorators: [
    (Story) => (
      <div css={css({ width: 300 })}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: [
      <Card
        key="Doctor Strange 1"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="Doctor Strange"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 2"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="史傳奇"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 2"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="奇異博士"
        isActive={false}
      />,
      <Card
        key="Doctor Strange 1"
        src="https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg"
        caption="至尊魔法師"
        isActive={false}
      />,
    ],
  },
};
