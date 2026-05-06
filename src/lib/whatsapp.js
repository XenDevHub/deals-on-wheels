// src/lib/whatsapp.js

/**
 * Opens WhatsApp with a pre-filled message
 * @param {string} phone - WhatsApp number with country code
 * @param {string} message - The message to send
 */
export function openWhatsApp(phone, message) {
  const cleanPhone = phone.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
}
