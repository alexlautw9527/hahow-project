import { css } from '@emotion/react';
import { Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';
import { TEST_IDS } from '@/features/heroes/constants/test-id';

type PointEditorProps = {
  label: string;
  point: number;

  // 需要由剩餘點數來判斷是否可以增加點數, 所以要從外部傳入
  isAddDisabled: boolean;

  // 直接關閉所有按鈕
  isDisabled: boolean;

  onAdd: () => void;
  onMinus: () => void;
};

export default function SingleAttribute({
  label,
  point,
  isAddDisabled,
  isDisabled,
  onAdd,
  onMinus,
}: PointEditorProps) {
  const isMinusDisabled = point <= 1;
  return (
    <Stack
      direction="row"
      width="full"
      justifyContent="space-between"
      alignItems="center"
      data-testid={TEST_IDS.ATTRIBUTE}
    >
      <Text
        fontSize=""
        as="b"
        flexBasis={['50%']}
        data-testid={TEST_IDS.ATTRIBUTE_LABEL}
      >
        {label}
      </Text>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width={['full', 40]}
      >
        <IconButton
          onClick={onAdd}
          borderRadius="full"
          isDisabled={isAddDisabled || isDisabled}
          icon={<IoIosAddCircle size={20} />}
          aria-label="add"
          data-testid={TEST_IDS.ADD_BUTTON}
        />
        <p
          css={css({
            width: 24,
            textAlign: 'center',
          })}
          data-testid={TEST_IDS.ATTRIBUTE_POINT}
        >
          {point}
        </p>
        <IconButton
          onClick={onMinus}
          colorScheme="red"
          borderRadius="full"
          isDisabled={isMinusDisabled || isDisabled}
          icon={<IoIosRemoveCircle size={20} />}
          aria-label="minus"
          data-testid={TEST_IDS.MINUS_BUTTON}
        />
      </Flex>
    </Stack>
  );
}
