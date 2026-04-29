// src/lib/whatsapp.js

/**
 * Opens WhatsApp with a pre-filled message
 * @param {string} phone - WhatsApp number with country code
 * @param {string} message - The message to send
 */
export function openWhatsApp(phone, message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}
