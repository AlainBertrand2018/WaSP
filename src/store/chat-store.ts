import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Message = {
  role: 'user' | 'model';
  content: string;
};

type ChatState = {
  messages: Message[];
  addMessage: (message: Message) => void;
  resetChat: () => void;
};

const initialState = {
  messages: [
    {
      role: 'model' as const,
      content: "Hello! I'm Waspy, your AI assistant. How can I help you with your business questions in Mauritius today?",
    },
  ],
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      ...initialState,
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      resetChat: () => set(initialState),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
