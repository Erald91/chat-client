import {memo} from 'react';
import Alert from 'react-bootstrap/Alert';

const Alerting = ({variant = 'primary', header, content, show, onClose, ...props}) => {
  return (
    <Alert variant={variant} show={show} onClose={onClose} dismissible {...props}>
      {header && <Alert.Heading>{header}</Alert.Heading>}
      {content}
    </Alert>
  )
};

export default memo(Alerting);
