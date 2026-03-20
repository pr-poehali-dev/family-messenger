import { useState } from "react";
import { login, register, User } from "@/lib/api";
import Icon from "@/components/ui/icon";

const AVATARS = ["👨", "👩", "👦", "👧", "👴", "👵", "🧔", "👱"];

interface AuthPageProps {
  onAuth: (user: User) => void;
}

export default function AuthPage({ onAuth }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("👨");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = async () => {
    setError("");
    if (!phone.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Введите ваше имя");
      return;
    }
    setLoading(true);
    const res = mode === "login"
      ? await login(phone.trim(), password)
      : await register(name.trim(), phone.trim(), password, avatar);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else if (res.user) {
      onAuth(res.user);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background items-center justify-center px-6 animate-fade-in">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">👨‍👩‍👧‍👦</div>
          <h1 className="text-3xl font-bold text-foreground">Семья</h1>
          <p className="text-muted-foreground mt-1 text-sm">Мессенджер только для близких</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-border/50 p-6 space-y-4">
          <div className="flex bg-muted rounded-2xl p-1">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${mode === "login" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              Войти
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${mode === "register" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              Регистрация
            </button>
          </div>

          {mode === "register" && (
            <div className="animate-slide-up space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Ваш аватар</label>
                <div className="flex gap-2 flex-wrap">
                  {AVATARS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAvatar(a)}
                      className={`text-2xl w-11 h-11 rounded-2xl transition-all duration-150 ${avatar === a ? "bg-primary/20 ring-2 ring-primary" : "bg-muted hover:bg-muted/80"}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Имя</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как вас зовут?"
                  className="w-full bg-muted rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Номер телефона</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 900 000-00-00"
              type="tel"
              className="w-full bg-muted rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Пароль</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Введите пароль"
                type={showPass ? "text" : "password"}
                className="w-full bg-muted rounded-2xl px-4 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPass ? "EyeOff" : "Eye"} size={18} />
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-2xl animate-scale-in">
              <Icon name="AlertCircle" size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-primary text-white py-3.5 rounded-2xl font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Подождите...</span>
              </>
            ) : (
              <span>{mode === "login" ? "Войти" : "Зарегистрироваться"}</span>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          Только для членов семьи · Пригласите близких
        </p>
      </div>
    </div>
  );
}
