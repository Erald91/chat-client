import {useRef, useEffect, memo} from 'react';
import {useSelector} from 'react-redux';
import MessageBubble from '../MessageBubble'
import {getUserData} from '../../../../selectors/userSelectors';

const ChatMessages = ({messages, height}) => {
  const user = useSelector(getUserData);
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    // Scroll to bottom on every new message
    containerRef.current.scrollTop = containerRef.current.scrollHeight - containerRef.current.clientHeight;
  }, [messages]);
  return (
    <div ref={containerRef} style={{height}} className='chat-messages-container'>
      {!messages.length && <div className="chat-messages-container text-center">There are not yet messages to show</div>}
      {messages.map((message, index) => <MessageBubble key={index} text={message.message} me={message.author === user.username} />)}
    </div>
  );
};

export default memo(ChatMessages);
