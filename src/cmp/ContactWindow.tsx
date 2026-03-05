import { useState } from "react";
import emailjs from "@emailjs/browser";
import { XPButton } from "../cmp/XPButton";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface ContactWindowProps {
  onError: () => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactWindow({ onError }: ContactWindowProps) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSend() {
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      
    } catch (err) {
      console.error("EmailJS error:", err);
      onError();
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="p-4"
      style={{
        fontFamily: "Tahoma, sans-serif",
        minHeight: 280,
      }}
    >
      <h3 className="text-sm font-bold text-[#003399] mb-3">
        📧 Send Message
      </h3>

      <div className="flex flex-col gap-2">
        <InputRow
          label="Your Name"
          value={form.name}
          onChange={(v) =>
            updateField("name", v)
          }
        />

        <InputRow
          label="Your Email"
          value={form.email}
          onChange={(v) =>
            updateField("email", v)
          }
        />

        <InputRow
          label="Subject"
          value={form.subject}
          onChange={(v) =>
            updateField("subject", v)
          }
        />

        <div className="flex items-start gap-2">
          <label className="text-xs w-20 text-right pt-1">
            Message:
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) =>
              updateField(
                "message",
                e.target.value
              )
            }
            className="flex-1 border border-[#7b9ebd] px-2 py-1 text-xs outline-none resize-none focus:border-[#316ac5]"
            style={{ background: "#fff" }}
          />
        </div>

        <div className="flex gap-2 justify-end mt-1">
          <XPButton onClick={handleSend}>
            📤 Send
          </XPButton>
          <XPButton>✖ Cancel</XPButton>
        </div>

        {sent && (
          <p className="text-xs text-green-700 text-right">
            ✅ Message queued! (Demo)
          </p>
        )}
      </div>

      <hr className="my-3 border-gray-300" />

      <div className="text-xs text-gray-600 flex flex-col gap-1">
         <a
    href="https://github.com/puriyaj"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:text-[#316ac5]"
  >
    🐙 github.com/puriyaj
  </a>

  <a
    href="https://www.linkedin.com/in/puriya-jangjooymehrangiz"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:text-[#316ac5]"
  >
    💼 linkedin.com/in/puriya-jangjooymehrangiz
  </a>
        <span>📍 Berlin, germany (Remote OK)</span>
      </div>
    </div>
  );
}

/* ───────────────────────────── */

interface InputRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function InputRow({
  label,
  value,
  onChange,
}: InputRowProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs w-20 text-right">
        {label}:
      </label>
      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={label}
        className="flex-1 border border-[#7b9ebd] px-2 py-1 text-xs outline-none focus:border-[#316ac5]"
        style={{ background: "#fff" }}
      />
    </div>
  );
}