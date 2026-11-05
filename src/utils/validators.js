export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
};

export const isValidPhone = (phone) => {
  // Allow international and standard Indian phone formats (10 digits, +91, with or without spaces/dashes)
  const cleaned = String(phone).replace(/[\s\-()+]/g, '');
  return cleaned.length >= 8 && cleaned.length <= 15;
};

export const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};
