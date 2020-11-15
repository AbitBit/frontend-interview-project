import classNames from 'classnames';
import React, { useRef } from 'react';
import useListItem from '../../hooks/useListItem';
import styles from './listItem.module.scss';

export type ListItemProps = {
  /** index of the element on the list. */
  index: number;
  /** index of the focused element. */
  focusIndex: number;
  /** number of elements on the list. */
  listLenght: number;
  /** Children of the element. */
  children: React.ReactNode;
  /** value of the element. */
  value: string;
  /** value of the selected element */
  selectedElement: string;
  /** Change the focused element. */
  changeFocusedElement: (value: number, event: 'click' | 'keyDown') => void;
  /** Change the selected element. */
  setSelectedElement: (value: string) => void;
  /** Pass a className to modify the styles  */
  className?: string;
};

//! No default export due to a bug with Storybook not rendering the props with ArgsTable.
export const ListItem = ({
  children,
  index,
  focusIndex,
  value,
  listLenght,
  selectedElement,
  changeFocusedElement,
  setSelectedElement,
  className,
}: ListItemProps): JSX.Element => {
  const ref = useRef<HTMLLIElement>(null);
  const listItemProps = useListItem(
    ref,
    index,
    focusIndex,
    listLenght,
    value,
    selectedElement,
    changeFocusedElement,
    setSelectedElement,
  );

  const rootClass = classNames(
    {
      [styles.isSelected]: listItemProps['aria-selected'],
    },
    styles.listItem,
    className,
  );

  return (
    <li {...listItemProps} value={value} ref={ref} className={rootClass}>
      {children}
    </li>
  );
};
