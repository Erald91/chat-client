import {memo} from 'react';
import {Button as Bootstrap} from 'react-bootstrap';

const Button = ({children, className, ...props}) => {
  return (
    <Bootstrap className={`custom-button${className ? ` ${className}` : ``}`} {...props}>
      {children}
    </Bootstrap>
  );
};

export default memo(Button);
