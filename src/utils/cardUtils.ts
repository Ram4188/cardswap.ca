export const detectCardType = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(cleanNumber)) return 'visa';
  if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
  if (/^3[47]/.test(cleanNumber)) return 'amex';
  return 'unknown';
};

export const formatCardNumber = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  const cardType = detectCardType(cleanNumber);
  
  if (cardType === 'amex') {
    return cleanNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  }
  return cleanNumber.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};