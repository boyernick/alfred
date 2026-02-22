import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function AuthButton({ user, isDark }) {
  const [mode, setMode] = useState("idle"); // idle | entering | sent
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const signOut = () => supabase.auth.signOut();

  const sendLink = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin, shouldCreateUser: true },
    });
    setLoading(false);
    if (error) { console.error("Auth error:", error); return; }
    setMode("sent");
  };

  const baseText = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    letterSpacing: "0.1em",
    color: "var(--alfred-text-dim)",
  };

  if (user) {
    const label = user.email || "";
    const truncated = label.length > 20 ? label.slice(0, 20) + "…" : label;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={baseText}>{truncated}</span>
        <button onClick={signOut} style={{ ...baseText, cursor: "pointer", background: "none", border: "none", padding: 0 }}>
          OUT
        </button>
      </div>
    );
  }

  if (mode === "sent") {
    return <span style={{ ...baseText, color: "var(--alfred-accent)" }}>CHECK EMAIL ✓</span>;
  }

  if (mode === "entering") {
    return (
      <form onSubmit={sendLink} style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input
          autoFocus
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email"
          style={{
            ...baseText,
            background: "none",
            border: "none",
            borderBottom: "1px solid var(--alfred-border)",
            outline: "none",
            padding: "2px 0",
            width: 140,
            color: "var(--alfred-text)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ ...baseText, cursor: "pointer", background: "none", border: "none", padding: 0 }}
        >
          {loading ? "…" : "SEND"}
        </button>
        <button
          type="button"
          onClick={() => setMode("idle")}
          style={{ ...baseText, cursor: "pointer", background: "none", border: "none", padding: 0 }}
        >
          ✕
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => setMode("entering")}
      style={{ ...baseText, cursor: "pointer", background: "none", border: "none", padding: 0 }}
    >
      SIGN IN
    </button>
  );
}
