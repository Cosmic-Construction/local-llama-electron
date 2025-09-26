import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import { Message, MessageRole, Persona } from "src/types";
import ChatMessage from "src/chat/ChatMessage";
import PersonaSelector from "src/chat/PersonaSelector";
import { getDefaultPersona } from "src/personas";

/**
 * A full chat thread that appends user and assistant messages to the end.
 */
const ChatThread = () => {
  // Leverage react-hook-form to make the thread easier.
  const { register, handleSubmit, reset } = useForm();

  // Stores all messages for presentation.
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  // Manages loading state.
  const [loading, setLoading] = useState(false);
  // Selected persona for the chat
  const [selectedPersona, setSelectedPersona] = useState<Persona>(getDefaultPersona());

  /**
   * Handle persona change - reset the chat history when persona changes
   */
  const handlePersonaChange = (newPersona: Persona) => {
    setSelectedPersona(newPersona);
    // Clear message history when switching personas
    setMessageHistory([]);
    // Notify the main process to reinitialize the chat session with new persona
    window.electronAPI.switchPersona(newPersona);
  };

  /**
   * Sends a message to the main process and gets the response.
   */
  const sendMessage = async (data) => {
    setLoading(true);

    // Push the new user message to render it while we wait.
    const userMessage = {
      id: uuid(),
      text: data.text,
      role: MessageRole.User,
    };
    setMessageHistory((oldHistory) => [...oldHistory, userMessage]);

    // Waiting!
    const assistantResult = await window.electronAPI.chat(data.text);

    // Push the assistant message for rendering.
    const assistantMessage = {
      id: uuid(),
      text: assistantResult,
      role: MessageRole.Assistant,
    };
    setMessageHistory((oldHistory) => [...oldHistory, assistantMessage]);
    setLoading(false);
    
    // Reset the form after successful submission
    reset();
  };
  return (
    <div>
      <PersonaSelector 
        selectedPersona={selectedPersona}
        onPersonaChange={handlePersonaChange}
      />
      
      <form onSubmit={handleSubmit(sendMessage)}>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("text")}
        />

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="loading loading-spinner" />}
          Send
        </button>
      </form>

      {messageHistory.map((m) => (
        <ChatMessage key={m.id} message={m} persona={selectedPersona} />
      ))}
    </div>
  );
};

export default ChatThread;
