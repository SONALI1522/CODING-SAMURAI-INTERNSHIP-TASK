import { create } from 'zustand'

const useChat = create((set) => ({
  selectedRoom: null,
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  selectedChat: null,
  setSelectedChat: (selectedChat) => set({ selectedChat }),
  messages: [],
  setMessages: (messages) =>
        set((state) => ({
            messages:
                typeof messages === "function"
                    ? messages(state.messages)
                    : messages,
        })),
}));
export default useChat;