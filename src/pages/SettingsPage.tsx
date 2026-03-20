import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ value, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${value ? "bg-primary" : "bg-muted-foreground/30"}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${value ? "left-6" : "left-0.5"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    msgSound: true,
    callSound: true,
    msgVibro: true,
    callVibro: true,
    showPreview: true,
    doNotDisturb: false,
    nightMode: false,
    callNotify: true,
  });

  const set = (key: keyof typeof settings) => (value: boolean) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm">
      <div className="px-5 py-3 bg-muted/50 border-b border-border/30">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{title}</span>
      </div>
      {children}
    </div>
  );

  const Row = ({ icon, label, subtitle, children }: { icon: string; label: string; subtitle?: string; children: React.ReactNode }) => (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-border/30 last:border-0">
      <div className="w-10 h-10 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
        <Icon name={icon} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{label}</div>
        {subtitle && <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <header className="bg-white px-5 pt-5 pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Настройки</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <Section title="Уведомления о сообщениях">
          <Row icon="Bell" label="Звук сообщений" subtitle="Звуковой сигнал при новом сообщении">
            <Toggle value={settings.msgSound} onChange={set("msgSound")} />
          </Row>
          <Row icon="Smartphone" label="Вибрация" subtitle="Вибрация при новом сообщении">
            <Toggle value={settings.msgVibro} onChange={set("msgVibro")} />
          </Row>
          <Row icon="Eye" label="Показывать текст" subtitle="Предпросмотр сообщения в уведомлении">
            <Toggle value={settings.showPreview} onChange={set("showPreview")} />
          </Row>
        </Section>

        <Section title="Уведомления о звонках">
          <Row icon="PhoneCall" label="Звук звонка" subtitle="Мелодия входящего звонка">
            <Toggle value={settings.callSound} onChange={set("callSound")} />
          </Row>
          <Row icon="Smartphone" label="Вибрация" subtitle="Вибрация при входящем звонке">
            <Toggle value={settings.callVibro} onChange={set("callVibro")} />
          </Row>
          <Row icon="PhoneIncoming" label="Уведомление" subtitle="Всплывающее окно при звонке">
            <Toggle value={settings.callNotify} onChange={set("callNotify")} />
          </Row>
        </Section>

        <Section title="Режим">
          <Row icon="Moon" label="Не беспокоить" subtitle="Отключить все уведомления">
            <Toggle value={settings.doNotDisturb} onChange={set("doNotDisturb")} />
          </Row>
          <Row icon="Sunset" label="Ночной режим" subtitle="С 22:00 до 8:00">
            <Toggle value={settings.nightMode} onChange={set("nightMode")} />
          </Row>
        </Section>

        <Section title="Приложение">
          <Row icon="Shield" label="Приватность" subtitle="Кто видит мой статус">
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </Row>
          <Row icon="HardDrive" label="Память" subtitle="Очистить кэш">
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </Row>
        </Section>
      </div>
    </div>
  );
}
