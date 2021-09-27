import {memo} from 'react';

const MessageBubble = ({text, me}) => {
  return (
    <div className={`message-bubble-container${me ? ` me` : ``}`}>
      {text}
    </div>
  );
};

export default memo(MessageBubble);