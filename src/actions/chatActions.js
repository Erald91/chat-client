import {getChatMessages, getChatWidgetUsedCommands} from '../selectors/chatSelectors';
import {cloneDeep} from '../utils/helpers';

export const CHAT_UPDATE_MESSAGES = 'Chat/CHAT_UPDATE_MESSAGES';
export const updateChatMessages = (payload) => ({type: CHAT_UPDATE_MESSAGES, payload});

export const appendChatMessages = (message) => {
  return (dispatch, getState) => {
    const messages = cloneDeep(getChatMessages(getState()));
    messages.push(message);
    dispatch(updateChatMessages(messages));
  };
};

export const CHAT_UPDATE_WIDGET = 'Chat/CHAT_UPDATE_WIDGET';
export const updateChatWidget = (widget) => ({type: CHAT_UPDATE_WIDGET, payload: widget});

export const CHAT_UPDATE_WIDGET_COMMAND = 'Chat/CHAT_UPDATE_WIDGET_COMMAND';
export const updateChatWidgetCommand = (command) => ({type: CHAT_UPDATE_WIDGET_COMMAND, payload: command});

export const CHAT_UPDATE_WIDGET_CLEAR = 'Chat/CHAT_UPDATE_WIDGET_CLEAR';
export const updateChatWidgetClear = () => ({type: CHAT_UPDATE_WIDGET_CLEAR});

export const CHAT_UPDATE_WIDGET_USED_COMMANDS = 'Chat/CHAT_UPDATE_WIDGET_USED_COMMANDS';
export const updateChatWidgetUsedCommands = (command, action = 'add') => {
  return (dispatch, getState) => {
    const usedCommands = new Set([...getChatWidgetUsedCommands(getState())]);
    if (action === 'add') {
      usedCommands.add(command);
    } else {
      usedCommands.delete(command);
    }
    dispatch({type: CHAT_UPDATE_WIDGET_USED_COMMANDS, payload: Array.from(usedCommands)});
  };
};
