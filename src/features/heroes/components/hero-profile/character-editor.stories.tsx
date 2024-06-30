import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import CharacterEditor from '@/features/heroes/components/hero-profile/character-editor';
import { css } from '@emotion/react';

const meta: Meta<typeof CharacterEditor> = {
  title: 'heros/CharacterEditor',
  component: CharacterEditor,
};

export default meta;
type Story = StoryObj<typeof CharacterEditor>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div css={css({ width: 400 })}>
        <Story />
      </div>
    ),
  ],
  args: {
    totalPoints: 10,
    characterAttributes: {
      str: 1,
      int: 2,
      agi: 3,
      luk: 4,
    },
    onSubmit: fn(),
  },
};
