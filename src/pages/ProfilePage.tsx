import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Алексей");
  const [status, setStatus] = useState("Рад быть с семьёй 💛");
  const [tempName, setTempName] = useState(name);
  const [tempStatus, setTempStatus] = useState(status);

  const save = () => {
    setName(tempName);
    setStatus(tempStatus);
    setEditing(false);
  };

  const cancel = () => {
    setTempName(name);
    setTempStatus(status);
    setEditing(false);
  };

  const stats = [
    { label: "Сообщений", value: "1 247" },
    { label: "Контактов", value: "5" },
    { label: "Фото", value: "42" },
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <header className="bg-white px-5 pt-5 pb-4 border-b border-border flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Профиль</h1>
        <button
          onClick={() => { setTempName(name); setTempStatus(status); setEditing(true); }}
          className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
        >
          Изменить
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white px-5 py-8 flex flex-col items-center border-b border-border">
          <div className="relative">
            <div className="w-24 h-24 bg-secondary rounded-3xl flex items-center justify-center text-5xl shadow-sm">
              👨
            </div>
            <button className="absolute -bottom-2 -right-2 bg-primary text-white w-8 h-8 rounded-2xl flex items-center justify-center shadow-md">
              <Icon name="Camera" size={14} />
            </button>
          </div>

          {editing ? (
            <div className="mt-5 w-full space-y-3 animate-scale-in">
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full text-center bg-muted rounded-2xl px-4 py-3 text-lg font-semibold outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                value={tempStatus}
                onChange={(e) => setTempStatus(e.target.value)}
                className="w-full text-center bg-muted rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="flex gap-3">
                <button onClick={cancel} className="flex-1 bg-muted text-foreground py-3 rounded-2xl font-medium hover:bg-muted/80 transition-colors">
                  Отмена
                </button>
                <button onClick={save} className="flex-1 bg-primary text-white py-3 rounded-2xl font-medium hover:bg-primary/90 transition-colors">
                  Сохранить
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5 text-center animate-fade-in">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{status}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                в сети
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 divide-x divide-border bg-white border-b border-border">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-4">
              <span className="text-xl font-bold text-primary">{stat.value}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="px-4 py-4 space-y-3">
          <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            {[
              { icon: "Phone", label: "+7 900 123-45-67", sub: "Номер телефона" },
              { icon: "MapPin", label: "Москва", sub: "Город" },
              { icon: "Calendar", label: "12 марта 1985", sub: "День рождения" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 px-5 py-4 border-b border-border/30 last:border-0">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                  <Icon name={item.icon} size={18} />
                </div>
                <div>
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center gap-3 bg-white border border-border/50 rounded-2xl px-5 py-4 text-destructive hover:bg-red-50 transition-colors">
            <Icon name="LogOut" size={18} />
            <span className="font-medium text-sm">Выйти из аккаунта</span>
          </button>
        </div>
      </div>
    </div>
  );
}
