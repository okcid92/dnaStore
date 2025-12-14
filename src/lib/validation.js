export const validatePhone = (phone) => {
  const phoneRegex = /^(\+226)?[0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePrice = (price) => {
  return !isNaN(price) && parseFloat(price) > 0
}

export const validateStock = (stock) => {
  return !isNaN(stock) && parseInt(stock) >= 0
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input.trim().replace(/[<>]/g, '')
}
