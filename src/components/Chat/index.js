import {memo, useEffect, useRef, useState} from 'react';
import SocketService from '../../services/socketService';
import {useDispatch, useSelector} from 'react-redux';
import {getChatMessages, getChatWidget} from '../../selectors/chatSelectors';
import {
  appendChatMessages,
  updateChatWidgetCommand,
  updateChatWidget,
  updateChatWidgetClear,
  updateChatWidgetUsedCommands
} from '../../actions/chatActions';
import {genUniqueID, scrollBottom} from '../../utils/helpers';
import {Container, Row, Col} from 'react-bootstrap';
import ChatInput from './components/ChatInput';
import {getUserData} from '../../selectors/userSelectors';
import ChatMessages from './components/ChatMessages';
import usePrevious from '../../hooks/usePrevious';
import Widgets, { WIDGETS } from './components/Widgets';

const Chat = () => {
  let socket = useRef(null);
  const [messagesContainerHeight, setMessageContainerHeight] = useState(null);
  const messagesContainerRef = useRef(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector(getChatMessages);
  const user = useSelector(getUserData);
  const widget = useSelector(getChatWidget);
  const prevWidget = usePrevious(widget);
  const onMessage = (payload) => {
    dispatch(appendChatMessages({...payload, id: genUniqueID}));
  };
  const onMessageSend = (content = message) => {
    if (!content || !(content && content.trim())) {
      return;
    }
    socket.current.sendMessage(user.username, content);
    dispatch(appendChatMessages({author: user.username, message: content, id: genUniqueID}));
    setMessage('');
  };
  const onCommand = (payload) => {
    dispatch(updateChatWidget(payload.command.type));
    dispatch(updateChatWidgetCommand(payload.command.data));
  };
  const onResize = () => {
    if (!messagesContainerRef.current) {
      return;
    }
    const {height} = messagesContainerRef.current.getBoundingClientRect();
    setMessageContainerHeight(height);
  };
  useEffect(() => {
    setTimeout(onResize, 250);
    socket.current = SocketService('https://demo-chat-server.on.ag/');
    socket.current.on('message', onMessage);
    socket.current.on('command', onCommand);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      socket.current.dispose();
    };
  }, []);
  const onCommandTrigger = () => {
    socket.current.sendCommand(user.username);
  };
  useEffect(() => {
    if (prevWidget === WIDGETS.MAP) {
      dispatch(updateChatWidgetUsedCommands(WIDGETS.MAP));
    }
    if (!widget) {
      return;
    }
    setTimeout(() => {
      scrollBottom(document.documentElement);
    }, 200);
  }, [widget]);
  const onWidgetClear = () => {
    dispatch(updateChatWidgetClear());
  }
  const onSelected = (payload) => {
    onMessageSend(payload);
    dispatch(updateChatWidgetUsedCommands(widget));
    onWidgetClear();
  }
  return (
    <Container className="chat-container">
      <Row className="chat-container_main-row">
        <Col className="chat-container_main-row_col" md={{span: 6, offset: 3}}>
          <Row ref={messagesContainerRef} className="chat-container_main-row_col_content">
            <ChatMessages height={messagesContainerHeight || 'auto'} messages={messages} />
          </Row>
          <Row className="chat-container_main-row_col_input">
            <Widgets onCommandTrigger={onCommandTrigger} onSelected={onSelected} onWidgetClear={onWidgetClear} />
            {!widget && <ChatInput value={message} onMessageChange={(e) => setMessage(e.target.value)} onSend={onMessageSend} />}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Chat);
