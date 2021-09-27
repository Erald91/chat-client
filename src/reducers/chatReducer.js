import {
  CHAT_UPDATE_MESSAGES,
  CHAT_UPDATE_WIDGET,
  CHAT_UPDATE_WIDGET_COMMAND,
  CHAT_UPDATE_WIDGET_CLEAR,
  CHAT_UPDATE_WIDGET_USED_COMMANDS
} from '../actions/chatActions';

const initialState = {
  messages: [],
  widget: null,
  command: null,
  usedCommands: []
};

const chat = (state = initialState, action) => {
  switch(action.type) {
    case CHAT_UPDATE_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case CHAT_UPDATE_WIDGET:
      return {
        ...state,
        widget: action.payload
      };
    case CHAT_UPDATE_WIDGET_COMMAND:
      return {
        ...state,
        command: action.payload
      };
    case CHAT_UPDATE_WIDGET_CLEAR:
      return {
        ...state,
        widget: null,
        command: null
      };
    case CHAT_UPDATE_WIDGET_USED_COMMANDS:
      return {
        ...state,
        usedCommands: action.payload
      };
    default:
      return state;
  }
};

export default chat;
