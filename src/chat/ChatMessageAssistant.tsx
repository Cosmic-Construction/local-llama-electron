import * as React from "react";

import { Message, Persona } from "src/types";

interface ChatMessageAssistantProps {
  message: Message;
  persona?: Persona;
}
/**
 * Renders an assistant message.
 */
const ChatMessageAssistant = ({ message, persona }: ChatMessageAssistantProps) => {
  const displayName = persona?.name || "bot";
  
  return (
    <div className="chat chat-start">
      <div className="avatar placeholder">
        <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
          <span className="text-xs">{displayName.slice(0, 3).toLowerCase()}</span>
        </div>
      </div>
      <div className="chat-bubble">{message.text}</div>
    </div>
  );
};

export default ChatMessageAssistant;
