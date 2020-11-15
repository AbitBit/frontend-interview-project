import { useState } from 'react';

type UseListReturn = {
  /** Returns the list lenght. */
  listLenght: number;
  /** Returns currently focused index. */
  focusIndex: number;
  /** function to change the currently focused element.
   * @param {number} value of type number
   * @param {'click' | 'keyDown'} value a string of value `click` or `keyDown`.
   */
  changeFocusedElement: (value: number, event: 'click' | 'keyDown') => void;
};

/**
 * This is a custom hook to use on a listbox level.
 * It complements useListItem hook and is meant to be used in unison.
 * @param listLenght number of element in the listbox.
 * */
const useList = (listLenght: number): UseListReturn => {
  const [focusIndex, setFocusIndex] = useState(0);

  const changeFocusedElement = (
    value: number,
    event: 'click' | 'keyDown',
  ): void => {
    const newTabIndex = event === 'click' ? value : focusIndex + value;
    setFocusIndex(newTabIndex);
  };

  return { listLenght, focusIndex, changeFocusedElement };
};

export default useList;
