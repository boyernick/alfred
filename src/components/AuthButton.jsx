import { useState } from "react";
import { supabase } from "@/lib/supabase";

function Modal({ mode, email, setEmail, loading, onSubmit, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(2px)",
          zIndex: 50,
        }}
      />
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 51,
        background: "var(--alfred-surface)",
        border: "1px solid var(--alfred-border)",
        padding: "32px 40px",
        width: 360,
        maxWidth: "calc(100vw - 48px)",
      }}>
        <div style={{
          fontFamily: "'Harvey Serif', serif",
          fontSize: 22, fontWeight: 500,
          color: "var(--alfred-accent)",
          letterSpacing: "0.06em",
          marginBottom: 8,
        }}>
          {mode === "signup" ? "CREATE ACCOUNT" : "SIGN IN"}
        </div>
        <div style={{
          fontFamily: "'Harvey Serif', serif",
          fontSize: 13, color: "var(--alfred-text-dim)",
          fontStyle: "italic", marginBottom: 24,
        }}>
          {mode === "signup"
            ? "Enter your email to begin."
            : "Enter your email to receive a sign-in link."}
        </div>
        <form onSubmit={onSubmit}>
          <input
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: "100%",
              background: "var(--alfred-bg)",
              border: "1px solid var(--alfred-border)",
              color: "var(--alfred-text)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              padding: "10px 12px",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: 16,
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="submit"
              disabled={loading || !email}
              style={{
                flex: 1,
                background: "var(--alfred-accent)",
                color: "var(--alfred-bg)",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                letterSpacing: "0.15em",
                padding: "10px 0",
                cursor: loading || !email ? "default" : "pointer",
                opacity: !email ? 0.4 : 1,
              }}
            >
              {loading ? "SENDING…" : mode === "signup" ? "CREATE ACCOUNT" : "SEND LINK"}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "none",
                border: "1px solid var(--alfred-border)",
                color: "var(--alfred-text-dim)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                letterSpacing: "0.15em",
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function Toast({ toast }) {
  return (
    <div style={{
      position: "fixed",
      bottom: 32, left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      background: "var(--alfred-surface)",
      border: `1px solid ${toast.type === "error" ? "var(--alfred-accent-dim)" : "var(--alfred-border)"}`,
      padding: "12px 24px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      letterSpacing: "0.05em",
      color: toast.type === "error" ? "var(--alfred-accent)" : "var(--alfred-text-mid)",
      whiteSpace: "nowrap",
    }}>
      {toast.message}
    </div>
  );
}

export function AuthButton({ user }) {
  const [mode, setMode] = useState(null); // null | "signup" | "login"
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const close = () => { setMode(null); setEmail(""); };

  const signOut = () => supabase.auth.signOut();

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
        shouldCreateUser: mode === "signup",
      },
    });
    setLoading(false);
    if (error) {
      showToast(error.message, "error");
      return;
    }
    close();
    showToast("Check your email for the magic link.");
  };

  const baseBtn = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    letterSpacing: "0.1em",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
  };

  return (
    <>
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...baseBtn, cursor: "default", color: "var(--alfred-text-dim)" }}>
            {user.email.length > 22 ? user.email.slice(0, 22) + "…" : user.email}
          </span>
          <button onClick={signOut} style={{ ...baseBtn, color: "var(--alfred-text-dim)" }}>
            OUT
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setMode("login")} style={{ ...baseBtn, color: "var(--alfred-text-dim)" }}>
            LOG IN
          </button>
          <button onClick={() => setMode("signup")} style={{ ...baseBtn, color: "var(--alfred-accent)" }}>
            SIGN UP
          </button>
        </div>
      )}

      {mode && (
        <Modal
          mode={mode}
          email={email}
          setEmail={setEmail}
          loading={loading}
          onSubmit={submit}
          onClose={close}
        />
      )}

      {toast && <Toast toast={toast} />}
    </>
  );
}
