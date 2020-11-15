import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from '../spinner';
import styles from './button.module.scss';

export type ButtonProps = {
  /** Change the color of the button accept values are:
   *  `primary`, `secondary`, `danger`, `accept`.
   * @default primary
   */
  intent?: 'primary' | 'secondary' | 'danger' | 'accept';
  /** Add an icon at the start of the button. */
  iconStart?: ReactNode;
  /** To pass an Icon to the Button component */
  iconEnd?: ReactNode;
  /** If true, the button will have a loader instead of the text.
   * does not affect `isDisabled`.
   */
  isLoading?: boolean;
  /** If the href is passed, the component will be wrapped with a link. */
  href?: string;
  /** If true, the button will be disabled. */
  isDisabled?: boolean; // ! Prop was renamed to maintain consistency with isLoading.
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

type ButtonLinkProps = {
  children: ReactNode;
  href?: string;
};

/**
 * Wrap a component with a link.
 * ? Could be exported as a sperate component ?
 */
const ButtonLink = ({ children, href }: ButtonLinkProps): JSX.Element => {
  if (!href) return <>{children}</>;
  return (
    <a className={styles.link} href={href}>
      {children}
    </a>
  );
};

//! No default export due to a bug with Storybook not rendering the props with ArgsTable.
export const Button = ({
  intent = 'primary',
  children,
  isLoading,
  iconStart,
  iconEnd,
  href,
  className,
  isDisabled,
  ...rest
}: ButtonProps): JSX.Element => {
  const rootClass = classNames(
    { [styles.disabled]: isDisabled },
    styles.button,
    styles[intent],
    className,
  );

  return (
    <ButtonLink href={href}>
      <button disabled={isDisabled} {...rest} className={rootClass}>
        {/* The span is to align the children of the button as 
        the element does not accept changes to its display value. */}
        <span>
          {isLoading ? (
            <Spinner color="white" size={24} className={styles.spinner} />
          ) : (
            <>
              {iconStart}
              {children}
              {iconEnd}
            </>
          )}
        </span>
      </button>
    </ButtonLink>
  );
};
