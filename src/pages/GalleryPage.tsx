import { useState } from "react";
import Icon from "@/components/ui/icon";

const photos = [
  { id: 1, emoji: "🏖️", caption: "Отдых летом 2024", author: "Мама", date: "12 авг" },
  { id: 2, emoji: "🎂", caption: "День рождения Ани", author: "Папа", date: "5 июл" },
  { id: 3, emoji: "🌲", caption: "Поход в лес", author: "Вся семья", date: "20 июн" },
  { id: 4, emoji: "🏠", caption: "Новый дом", author: "Мама", date: "1 июн" },
  { id: 5, emoji: "🎉", caption: "Новый год!", author: "Дедушка", date: "1 янв" },
  { id: 6, emoji: "🌸", caption: "Весна в саду", author: "Бабушка", date: "15 мая" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<typeof photos[0] | null>(null);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <header className="bg-white px-5 pt-5 pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Галерея</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Общие фото семьи</p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setSelected(photo)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-all hover:scale-[1.02] animate-scale-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="aspect-square flex items-center justify-center bg-secondary text-6xl">
                {photo.emoji}
              </div>
              <div className="p-3 text-left">
                <p className="text-sm font-medium truncate">{photo.caption}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{photo.author} · {photo.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 right-5">
        <button className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all hover:scale-105">
          <Icon name="Camera" size={22} />
        </button>
      </div>

      {selected && (
        <div
          className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 mx-6 w-full max-w-sm animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-8xl text-center mb-4">{selected.emoji}</div>
            <h2 className="text-xl font-bold text-center">{selected.caption}</h2>
            <p className="text-sm text-muted-foreground text-center mt-1">{selected.author} · {selected.date}</p>
            <div className="flex gap-3 mt-5">
              <button className="flex-1 bg-muted text-foreground py-3 rounded-2xl font-medium hover:bg-muted/80 transition-colors">
                Сохранить
              </button>
              <button className="flex-1 bg-primary text-white py-3 rounded-2xl font-medium hover:bg-primary/90 transition-colors">
                Поделиться
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
