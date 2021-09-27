import {InputGroup, FormControl} from 'react-bootstrap';
import Button from '../../../Button';

const ChatInput = ({onSend, onMessageChange, value}) => {
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      onSend();
    }
  };
  return (
    <InputGroup className="chat-input-container mb-3">
      <FormControl
        className="chat-input-container_input"
        placeholder="Message..."
        value={value}
        onChange={onMessageChange}
        onKeyUp={onKeyUp}
      />
      <Button className="chat-input-container_button" variant="outline-secondary" id="button-addon2" onClick={() => onSend()}>
        Send
      </Button>
    </InputGroup>
  )
};

export default ChatInput;
