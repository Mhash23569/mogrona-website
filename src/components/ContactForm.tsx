'use client';

import type { FormEvent } from 'react';

export function ContactForm({ email }: { email: string }) {
  if (!email) {
    return (
      <div className="panel">
        <h2>Write to us</h2>
        <p>You can reach us by post at the address shown here. More ways to get in touch are coming soon.</p>
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim();
    const msg = (f.elements.namedItem('message') as HTMLTextAreaElement).value.trim();
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(`${msg}\n\n${name}`)}`;
  }

  return (
    <form className="form panel" id="contact-form" onSubmit={onSubmit}>
      <h2>Send us a message</h2>
      <label>
        Your name
        <input type="text" name="name" required autoComplete="name" />
      </label>
      <label>
        Your message
        <textarea name="message" required></textarea>
      </label>
      <button className="btn btn--green" type="submit">
        Send message
      </button>
      <p className="note mt-[14px]">This opens your email app with the message ready to send.</p>
    </form>
  );
}
