import React from 'react';
import classnames from 'classnames';
import '@fortawesome/fontawesome-free/css/all.css';

export interface IconProps {
  className?: Optional<string>;
  name: string;
  isSolid?: boolean;
}

const Icon: React.FC<IconProps> = (props) => {
  const { name, className, isSolid } = props;

  const rootClass = classnames(
    {
      fa: !isSolid,
      fas: isSolid,
      [`fa-${name.replace('fa-', '')}`]: true,
    },
    className,
  );

  return <i className={rootClass} />;
};

export default Icon;
