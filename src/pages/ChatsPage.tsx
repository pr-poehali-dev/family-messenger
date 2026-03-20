import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  text: string;
  time: string;
  mine: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const chats: Chat[] = [
  { id: 1, name: "Мама", avatar: "👩", lastMessage: "Как дела, сынок? 💛", time: "10:42", unread: 2 },
  { id: 2, name: "Папа", avatar: "👨", lastMessage: "Приедем в воскресенье!", time: "вчера", unread: 0 },
  { id: 3, name: "Сестра Аня", avatar: "👧", lastMessage: "Посмотри какое фото!", time: "вчера", unread: 1 },
  { id: 4, name: "Вся семья", avatar: "👨‍👩‍👧‍👦", lastMessage: "Дедушка: Всех обнимаю!", time: "пн", unread: 0 },
];

const mockMessages: Message[] = [
  { id: 1, text: "Привет! Как у тебя дела?", time: "10:30", mine: false },
  { id: 2, text: "Всё хорошо, мам! Работаю 😊", time: "10:35", mine: true },
  { id: 3, text: "Как дела, сынок? 💛", time: "10:42", mine: false },
];

export default function ChatsPage() {
  const [openChat, setOpenChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: input.trim(),
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    }]);
    setInput("");
  };

  if (openChat) {
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <header className="bg-white px-4 py-3 flex items-center gap-3 border-b border-border">
          <button
            onClick={() => setOpenChat(null)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <div className="text-3xl">{openChat.avatar}</div>
          <div>
            <div className="font-semibold text-base">{openChat.name}</div>
            <div className="text-xs text-green-500">в сети</div>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-xl hover:bg-primary/10">
              <Icon name="Phone" size={20} />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-xl hover:bg-primary/10">
              <Icon name="Video" size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.mine ? "justify-end" : "justify-start"} animate-slide-up`}
            >
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                msg.mine
                  ? "bg-primary text-white rounded-br-md"
                  : "bg-white text-foreground rounded-bl-md shadow-sm"
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.mine ? "text-white/70" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-border px-4 py-3 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Написать сообщение..."
            className="flex-1 bg-muted rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-primary text-white p-2.5 rounded-2xl transition-all hover:bg-primary/90 disabled:opacity-40"
          >
            <Icon name="Send" size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <header className="bg-white px-5 pt-5 pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Чаты</h1>
        <div className="mt-3 flex items-center gap-2 bg-muted rounded-2xl px-4 py-2.5">
          <Icon name="Search" size={16} className="text-muted-foreground" />
          <input
            placeholder="Поиск..."
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => setOpenChat(chat)}
            className="w-full flex items-center gap-4 px-5 py-4 bg-white hover:bg-muted/50 transition-colors border-b border-border/50 animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="text-4xl w-12 h-12 flex items-center justify-center bg-secondary rounded-2xl shrink-0">
              {chat.avatar}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base">{chat.name}</span>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <div className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                {chat.unread}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="absolute bottom-20 right-5">
        <button className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all hover:scale-105">
          <Icon name="Plus" size={24} />
        </button>
      </div>
    </div>
  );
}
