import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import CharacterEditor from '@/features/heroes/components/hero-profile/character-editor';
import { render, screen, fireEvent } from '@testing-library/react';
import { TEST_IDS } from '@/features/heroes/constants/test-id';

describe('CharacterEditor', () => {
  const defaultCharacterAttributes = {
    str: 4,
    int: 3,
    agi: 2,
    luk: 1,
  };

  const totalPoints = Object.values(defaultCharacterAttributes).reduce(
    (acc, point) => acc + point,
    0
  );
  const isLoading = false;
  const onSubmit = vi.fn();

  beforeEach(() => {
    render(
      <CharacterEditor
        totalPoints={totalPoints}
        characterAttributes={defaultCharacterAttributes}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    );
  });

  test('應渲染出所有的能力值', () => {
    const attributeLabels = screen.getAllByTestId('attribute-label');

    expect(attributeLabels).toHaveLength(4);
    expect(attributeLabels[0]).toHaveTextContent(
      'hero:character-editor.text.str'
    );
    expect(attributeLabels[1]).toHaveTextContent(
      'hero:character-editor.text.int'
    );
    expect(attributeLabels[2]).toHaveTextContent(
      'hero:character-editor.text.agi'
    );
    expect(attributeLabels[3]).toHaveTextContent(
      'hero:character-editor.text.luk'
    );
  });

  test('剩餘點數初始值為0', () => {
    const remainingPoints = screen.getByTestId(TEST_IDS.REMAINING_POINTS);
    expect(remainingPoints).toHaveTextContent(
      'hero:character-editor.text.remaining-points : 0'
    );
  });

  test('點數若與初始值相同, 則無法送出', () => {
    const saveButton = screen.getByTestId(TEST_IDS.SAVE_BUTTON);
    expect(saveButton).toBeDisabled();
  });

  test('點數若與初始值不同, 則可送出', () => {
    const attributes = screen.getAllByTestId(TEST_IDS.ATTRIBUTE);

    // 減少一個點數
    const minusButton = attributes[0].querySelector(
      `[data-testid="${TEST_IDS.MINUS_BUTTON}"]`
    );
    if (!minusButton) return;
    fireEvent.click(minusButton);

    // 其他欄位增加一個點數
    const otherAddButton = attributes[1].querySelector(
      `[data-testid="${TEST_IDS.ADD_BUTTON}"]`
    );

    if (!otherAddButton) return;
    fireEvent.click(otherAddButton);

    const saveButton = screen.getByTestId(TEST_IDS.SAVE_BUTTON);
    expect(saveButton).not.toBeDisabled();
  });

  test('剩餘點數為 0 之下, 無法增加點數', () => {
    const remainingPoints = screen.getByTestId(TEST_IDS.REMAINING_POINTS);
    expect(remainingPoints).toHaveTextContent(
      'hero:character-editor.text.remaining-points : 0'
    );
    const addButton = screen.getAllByTestId(TEST_IDS.ADD_BUTTON)[0];
    expect(addButton).toBeDisabled();
  });

  test('按下減少點數, 應會增加剩餘點數', () => {
    const attribute = screen.getAllByTestId(TEST_IDS.ATTRIBUTE)[0];

    const minusButton = attribute.querySelector('[data-testid="minus-button"]');

    if (!minusButton) return;
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    const remainingPoints = screen.getByTestId(TEST_IDS.REMAINING_POINTS);
    expect(remainingPoints).toHaveTextContent(
      'hero:character-editor.text.remaining-points : 2'
    );
  });

  test('單一點數不得小於 0, 當點數等於 1 時, 按鈕會 disable', () => {
    const attribute = screen.getAllByTestId(TEST_IDS.ATTRIBUTE)[0];

    const pointString = attribute.querySelector(
      `[data-testid="${TEST_IDS.ATTRIBUTE_POINT}"]`
    )?.textContent;

    expect(pointString).toBe('4');

    const minusButton = attribute.querySelector(
      `[data-testid="${TEST_IDS.MINUS_BUTTON}"]`
    );

    if (!minusButton) return;
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);

    expect(minusButton).toBeDisabled();
  });
});
