"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const eventTypes = [
  "Anniversary",
  "Baby Shower",
  "Birthday Party",
  "Bridal Shower",
  "Corporate Event",
  "Graduation",
  "Wedding",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  eventDate?: string;
}

function validate(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  eventDate: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!data.phone || data.phone.trim().length < 7) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Please tell us a bit more (10+ characters)";
  }

  if (!data.eventDate) {
    errors.eventDate = "Please select an event date";
  } else {
    const eventDate = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      errors.eventDate = "Event date must be in the future";
    }
  }

  return errors;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const searchParams = useSearchParams();
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Pre-fill message when arriving from "Book This Style" in gallery
  useEffect(() => {
    const style = searchParams.get("style");
    if (style && messageRef.current && !messageRef.current.value) {
      messageRef.current.value = `Hi! I'm interested in a style similar to: "${style}"\n\n`;
      messageRef.current.focus();
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      eventDate: (form.elements.namedItem("eventDate") as HTMLInputElement).value,
      eventStartTime: (form.elements.namedItem("eventStartTime") as HTMLInputElement).value,
      eventEndTime: (form.elements.namedItem("eventEndTime") as HTMLInputElement).value,
      eventType: (form.elements.namedItem("eventType") as HTMLSelectElement).value,
      venueAddress: (form.elements.namedItem("venueAddress") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const errors = validate(data);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        setStatus("error");
        setFieldErrors({ name: "Too many requests. Please wait a minute and try again." });
        return;
      }

      if (res.ok) {
        setStatus("success");
        setFieldErrors({});
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  const inputClass =
    "w-full border border-rose bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal-light/60 focus:outline-none focus:border-charcoal transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
            onChange={() => clearFieldError("name")}
          />
          {fieldErrors.name && (
            <p className="text-red-600 text-xs mt-1">{fieldErrors.name}</p>
          )}
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
            onChange={() => clearFieldError("email")}
          />
          {fieldErrors.email && (
            <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      {/* Phone + Event Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Phone *
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="(555) 000-0000"
            className={inputClass}
            onChange={() => clearFieldError("phone")}
          />
          {fieldErrors.phone && (
            <p className="text-red-600 text-xs mt-1">{fieldErrors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Event Date *
          </label>
          <input
            name="eventDate"
            type="date"
            required
            className={inputClass}
            onChange={() => clearFieldError("eventDate")}
          />
          {fieldErrors.eventDate && (
            <p className="text-red-600 text-xs mt-1">{fieldErrors.eventDate}</p>
          )}
        </div>
      </div>

      {/* Venue Address */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
          Venue Location / Address
        </label>
        <input
          name="venueAddress"
          type="text"
          placeholder="Event venue address (optional)"
          className={inputClass}
        />
      </div>

      {/* Event Start + End Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Event Start Time
          </label>
          <input
            name="eventStartTime"
            type="time"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
            Event End Time
          </label>
          <input
            name="eventEndTime"
            type="time"
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
          ref={messageRef}
          name="message"
          required
          rows={5}
          placeholder="Describe your event, color palette, style preferences, or anything else you'd like us to know..."
          className={`${inputClass} resize-none`}
          onChange={() => clearFieldError("message")}
        />
        {fieldErrors.message && (
          <p className="text-red-600 text-xs mt-1">{fieldErrors.message}</p>
        )}
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
      {status === "error" && !fieldErrors.name && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle size={16} />
          Something went wrong. Please try again or reach us on Instagram or Facebook.
        </div>
      )}
    </form>
  );
}
