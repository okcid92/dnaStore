import contacts from './contacts.json'

export const CONTACTS = contacts

// Helper pour générer le lien WhatsApp avec message
export const getWhatsAppLink = (message = '') => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${CONTACTS.phoneRaw}${message ? `?text=${encodedMessage}` : ''}`
}

// Helper pour le lien email
export const getEmailLink = (subject = '', body = '') => {
  const params = new URLSearchParams()
  if (subject) params.append('subject', subject)
  if (body) params.append('body', body)
  return `mailto:${CONTACTS.email}${params.toString() ? `?${params.toString()}` : ''}`
}

// Helper pour le lien téléphone
export const getPhoneLink = () => {
  return `tel:${CONTACTS.phoneRaw}`
}
