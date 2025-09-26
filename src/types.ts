enum MessageRole {
  User = "user",
  Assistant = "assistant",
}

interface Message {
  id: string;
  role: MessageRole;
  text: string;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  avatar?: string;
}

export { Message, MessageRole, Persona };
