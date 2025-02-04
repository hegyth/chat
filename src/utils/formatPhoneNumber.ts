export default function formatPhoneNumber(input: string) {
    const cleaned = input.replace(/\D/g, '');
  
    if (cleaned.length === 11 && cleaned.startsWith('7')) {
      return cleaned;
    } else {
      return false
    }
  }