"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const eventTypes = [
  "Birthday Party",
  "Baby Shower",
  "Bridal Shower",
  "Graduation",
  "Anniversary",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      eventDate: (form.elements.namedItem("eventDate") as HTMLInputElement).value,
      eventType: (form.elements.namedItem("eventType") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-rose bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal-light/60 focus:outline-none focus:border-charcoal transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Name *
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Phone + Event Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="(555) 000-0000"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Event Date
          </label>
          <input
            name="eventDate"
            type="date"
            className={inputClass}
          />
        </div>
      </div>

      {/* Event Type */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
          Event Type
        </label>
        <select name="eventType" className={inputClass}>
          <option value="">Select an event type</option>
          {eventTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
          Tell Us About Your Vision *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Describe your event, color palette, style preferences, or anything else you'd like us to know..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-charcoal text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors disabled:opacity-60"
      >
        {status === "loading" ? (
          "Sending..."
        ) : (
          <>
            Send Inquiry
            <Send size={14} />
          </>
        )}
      </button>

      {/* Feedback */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-3">
          <CheckCircle size={16} />
          Thank you! We&apos;ll be in touch within 1–2 business days.
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle size={16} />
          Something went wrong. Please try again or DM us on Instagram.
        </div>
      )}
    </form>
  );
}
