import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Message = {
  role: 'user' | 'model';
  content: string;
};

type ChatState = {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
            role: 'model',
            content: `Hello! My name is Claire which stands for Creative Launchpad for Aspiration, Innovation,
Revenue &
Expansion, your AI assistant. How can I help you with your business today?`
        }
      ],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'chat-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
