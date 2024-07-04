import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import { Button, Stack } from '@chakra-ui/react';

import {
  FetchHeroProfileData,
  UpdateHeroProfileRequestOptions,
} from '@/features/heroes/apis/types';
import SingleAttribute from '@/features/heroes/components/hero-profile/single-attribute';
import { TEST_IDS } from '@/features/heroes/constants/test-id';

export type CharacterEditorProps = {
  totalPoints: number;
  characterAttributes: FetchHeroProfileData;
  isLoading: boolean;
  onSubmit: (
    characterAttribute: UpdateHeroProfileRequestOptions['reqBody']
  ) => void;
};

export default function CharacterEditor({
  totalPoints,
  characterAttributes,
  onSubmit,
  isLoading,
}: CharacterEditorProps) {
  const [attributes, setAttributes] =
    useState<FetchHeroProfileData>(characterAttributes);

  type Attributes = keyof typeof attributes;

  const remainingPoint =
    totalPoints -
    Object.values(attributes).reduce((acc, point) => acc + point, 0);

  const hasChangedAttributes = Object.keys(attributes).some(
    (key) =>
      attributes[key as Attributes] !== characterAttributes[key as Attributes]
  );
  const isSubmitDisabled = remainingPoint >= 1 || !hasChangedAttributes;

  const isAddDisabled = remainingPoint <= 0;

  const handleAddPoint = ({ type }: { type: Attributes }) => {
    if (remainingPoint <= 0) return;
    setAttributes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleSubmit = () => {
    onSubmit(attributes);
  };

  const handleMinusPoint = ({ type }: { type: Attributes }) => {
    if (attributes[type] <= 1) return;
    setAttributes((prev) => ({
      ...prev,
      [type]: prev[type] - 1,
    }));
  };

  const { t } = useTranslation(['hero']);

  const attributeI18nKeyMapping = {
    str: 'character-editor.text.str',
    int: 'character-editor.text.int',
    agi: 'character-editor.text.agi',
    luk: 'character-editor.text.luk',
  } as const;

  return (
    <>
      <Stack
        direction="column"
        spacing={4}
        css={css({ marginBottom: 24 })}
        width="full"
      >
        {Object.keys(attributes).map((key) => {
          const attribute = key as Attributes;
          const labelKey = attributeI18nKeyMapping[attribute];
          return (
            <SingleAttribute
              key={attribute}
              label={t([labelKey])}
              point={attributes[attribute]}
              isAddDisabled={isAddDisabled}
              isDisabled={isLoading}
              onAdd={() => {
                handleAddPoint({ type: attribute });
              }}
              onMinus={() => {
                handleMinusPoint({ type: attribute });
              }}
            />
          );
        })}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="full"
      >
        <p data-testid={TEST_IDS.REMAINING_POINTS}>
          {t('character-editor.text.remaining-points')} : {remainingPoint}
        </p>
        <Button
          data-testid={TEST_IDS.SAVE_BUTTON}
          onClick={handleSubmit}
          isDisabled={isSubmitDisabled}
          isLoading={isLoading}
        >
          {t('character-editor.text.save')}
        </Button>
      </Stack>
    </>
  );
}
