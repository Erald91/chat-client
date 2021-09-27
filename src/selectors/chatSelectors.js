const chatSlice = (state) => state.chat;

export const getChatMessages = (state) => chatSlice(state).messages || [];
export const getChatWidget = (state) => chatSlice(state).widget || null;
export const getChatWidgetCommand = (state) => chatSlice(state).command || null;
export const getChatWidgetUsedCommands = (state) => chatSlice(state).usedCommands || [];
