import type { Meta, StoryObj } from '@storybook/react';

import { BoxSkeleton } from '@/components/skeleton';
import { css } from '@emotion/react';

const meta: Meta<typeof BoxSkeleton> = {
  title: 'components/BoxSkeleton',
  component: BoxSkeleton,
};

export default meta;
type Story = StoryObj<typeof BoxSkeleton>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div css={css({ width: 200 })}>
        <Story />
      </div>
    ),
  ],
  args: {
    width: 'full',
  },
};
