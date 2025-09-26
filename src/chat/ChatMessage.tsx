import * as React from "react";

import { Message, MessageRole, Persona } from "src/types";
import ChatMessageAssistant from "src/chat/ChatMessageAssistant";
import ChatMessageUser from "src/chat/ChatMessageUser";

interface ChatMessageProps {
  message: Message;
  persona?: Persona;
}

/**
 * Handy switch between different message presentation types.
 */
const ChatMessage = ({ message, persona }: ChatMessageProps) => {
  if (message.role === MessageRole.User) {
    return <ChatMessageUser message={message} />;
  }
  if (message.role === MessageRole.Assistant) {
    return <ChatMessageAssistant message={message} persona={persona} />;
  }
  return <></>;
};

export default ChatMessage;
