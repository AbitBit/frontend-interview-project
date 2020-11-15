import { RefObject, useEffect } from 'react';

type useListItemReturn = {
  /** Role of the element. Returns option for the item. */
  role: 'option';
  /** Current tab index of the element. */
  tabIndex: 0 | -1;
  /** Current `aria-select` value used for voice accessibility. */
  'aria-selected': boolean;
  /** Function to implement keyboard navigation.
   * enter and spacebar keys will select the item.
   * arrow keys for navigating up and down the list.
   * page up and page down keys not modified to allow scrolling.
   * @param event React keybaord event.
   */
  onKeyDown: (event: React.KeyboardEvent<HTMLLIElement>) => void;
  /** Handle onClick event
   * @param event React mouse event.
   */
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
};

/** This is a custom hook to implement accesibility on options for listboxes.
 * It provides voice and keyboard accessibility.
 * Down and Up arrow navigate throught the elements.
 * Enter, Spacebar and onClick select a new element from the list.
 * @param ref ref to the option element.
 * @param  index index of the element in the listbox.
 * @param focusedIndex index of the element currently focused in the listbox.
 * @param listLength number of elements in the listbox.
 * @param value element value.
 * @param selectedElement currently selected element.
 * @param changeFocusedElement change the element in focus.
 * @param setSelectedElement set the value of the selected element.
 */
const useListItem = (
  ref: RefObject<HTMLLIElement>,
  index: number,
  focusIndex: number,
  listLength: number,
  value: string,
  selectedElement: string,
  changeFocusedElement: (value: number, event: 'click' | 'keyDown') => void,
  setSelectedElement: (value: string) => void,
): useListItemReturn => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>): void => {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      event.preventDefault();
      if (event.key === 'ArrowUp' && focusIndex > 0) {
        changeFocusedElement(-1, 'keyDown');
        return;
      }

      if (event.key === 'ArrowDown' && focusIndex < listLength - 1) {
        changeFocusedElement(1, 'keyDown');
        return;
      }

      if (event.key === ' ' || event.key === 'Spacebar') {
        setSelectedElement(event.currentTarget.value.toString());
        return;
      }
    }

    if (event.key === 'Enter') {
      setSelectedElement(event.currentTarget.value.toString());
    }
  };

  const onClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLLIElement>): void => {
    setSelectedElement(currentTarget.value.toString());
    changeFocusedElement(index, 'click');
  };

  useEffect(() => {
    if (focusIndex === index && ref) {
      ref.current?.focus();
    }
  }, [ref, focusIndex, index]);

  return {
    role: 'option',
    tabIndex: focusIndex === index ? 0 : -1,
    onKeyDown,
    onClick,
    'aria-selected': selectedElement === value,
  };
};

export default useListItem;
