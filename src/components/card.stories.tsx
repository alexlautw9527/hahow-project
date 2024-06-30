import type { Meta, StoryObj } from '@storybook/react';

import Card from '@/components/card';
import { css } from '@emotion/react';

const meta: Meta<typeof Card> = {
  title: 'components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div css={css({ width: 200 })}>
        <Story />
      </div>
    ),
  ],
  args: {
    src: 'https://cdn.tatlerasia.com/tatlerasia/i/2021/12/28122102-doctor-strange-benedict-cumberbatch_cover_1000x1334.jpeg',
    caption: 'Doctor Strange',
    isActive: false,
  },
};
