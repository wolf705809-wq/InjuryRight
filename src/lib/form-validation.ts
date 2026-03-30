// Name — letters and spaces only
export const sanitizeName = (value: string): string =>
  value.replace(/[^a-zA-Z\s]/g, '')

export const validateName = (value: string): boolean =>
  value.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(value.trim())

// Phone — digits only, max 10
export const sanitizePhone = (value: string): string =>
  value.replace(/[^0-9]/g, '').slice(0, 10)

export const formatPhone = (value: string): string => {
  const n = value.replace(/\D/g, '')
  if (n.length < 4) return n
  if (n.length < 7) return `(${n.slice(0, 3)}) ${n.slice(3)}`
  return `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6, 10)}`
}

export const validatePhone = (value: string): boolean =>
  value.replace(/\D/g, '').length === 10

// Email
export const validateEmail = (value: string): boolean =>
  /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value)

// Full form validity
export const isFormValid = (
  name: string,
  phone: string,
  email: string,
  consent: boolean,
): boolean =>
  validateName(name) &&
  validatePhone(phone) &&
  validateEmail(email) &&
  consent
