import Icon from "@/components/ui/icon";

const contacts = [
  { id: 1, name: "Мама", avatar: "👩", status: "в сети", phone: "+7 900 123-45-67" },
  { id: 2, name: "Папа", avatar: "👨", status: "30 мин назад", phone: "+7 900 234-56-78" },
  { id: 3, name: "Сестра Аня", avatar: "👧", status: "в сети", phone: "+7 900 345-67-89" },
  { id: 4, name: "Дедушка Коля", avatar: "👴", status: "вчера", phone: "+7 900 456-78-90" },
  { id: 5, name: "Бабушка Люда", avatar: "👵", status: "в сети", phone: "+7 900 567-89-01" },
];

export default function ContactsPage() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <header className="bg-white px-5 pt-5 pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Контакты</h1>
        <div className="mt-3 flex items-center gap-2 bg-muted rounded-2xl px-4 py-2.5">
          <Icon name="Search" size={16} className="text-muted-foreground" />
          <input
            placeholder="Найти члена семьи..."
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Члены семьи · {contacts.length}
        </div>
        {contacts.map((contact, i) => (
          <div
            key={contact.id}
            className="flex items-center gap-4 px-5 py-4 bg-white border-b border-border/50 animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="text-4xl w-12 h-12 flex items-center justify-center bg-secondary rounded-2xl shrink-0">
              {contact.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base">{contact.name}</div>
              <div className={`text-xs mt-0.5 ${contact.status === "в сети" ? "text-green-500" : "text-muted-foreground"}`}>
                {contact.status}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-primary p-2.5 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Icon name="MessageCircle" size={18} />
              </button>
              <button className="text-primary p-2.5 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Icon name="Phone" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 right-5">
        <button className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all hover:scale-105">
          <Icon name="UserPlus" size={22} />
        </button>
      </div>
    </div>
  );
}
