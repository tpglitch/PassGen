// Password character sets
export const uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
export const numberChars: string = '0123456789';
export const specialChars: string = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

/**
 * Generate a random password based on selected options
 * @param length - Length of the password
 * @param hasUppercase - Include uppercase letters
 * @param hasLowercase - Include lowercase letters
 * @param hasNumbers - Include numbers
 * @param hasSpecial - Include special characters
 * @returns Generated password
 */
export function generatePassword(
  length: number, 
  hasUppercase: boolean, 
  hasLowercase: boolean, 
  hasNumbers: boolean, 
  hasSpecial: boolean
): string {
  // Ensure at least one character type is selected
  if (!hasUppercase && !hasLowercase && !hasNumbers && !hasSpecial) {
    throw new Error('Please select at least one character type');
  }
  
  // Build character pool based on selected options
  let charPool: string = '';
  if (hasUppercase) charPool += uppercaseChars;
  if (hasLowercase) charPool += lowercaseChars;
  if (hasNumbers) charPool += numberChars;
  if (hasSpecial) charPool += specialChars;
  
  // Generate random password
  let password: string = '';
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }
  
  return password;
}

/**
 * Calculate and update password strength
 * @param password - The password to evaluate
 * @param hasUppercase - Whether uppercase was included in options
 * @param hasLowercase - Whether lowercase was included in options
 * @param hasNumbers - Whether numbers were included in options
 * @param hasSpecial - Whether special chars were included in options
 * @returns Strength score from 0-100
 */
export function calculateStrength(
  password: string, 
  hasUppercase: boolean, 
  hasLowercase: boolean, 
  hasNumbers: boolean, 
  hasSpecial: boolean
): number {
  // Calculate strength score (0-100)
  let score: number = 0;
  const length: number = password.length;
  
  // Length score (up to 50 points)
  score += Math.min(length, 50);
  
  // Character variety score (up to 60 points)
  const typesCount: number = [hasUppercase, hasLowercase, hasNumbers, hasSpecial].filter(Boolean).length;
  score += typesCount * 15;
  
  // Adjust based on actual password content
  const hasUppercaseActual: boolean = /[A-Z]/.test(password);
  const hasLowercaseActual: boolean = /[a-z]/.test(password);
  const hasNumbersActual: boolean = /\d/.test(password);
  const hasSpecialActual: boolean = /[^A-Za-z0-9]/.test(password);
  
  const actualTypesCount: number = [
    hasUppercaseActual, 
    hasLowercaseActual, 
    hasNumbersActual, 
    hasSpecialActual
  ].filter(Boolean).length;
  
  // Ensure the password actually contains the character types that were selected
  if (actualTypesCount < typesCount) {
    score = Math.max(score - 20, 0);
  }
  
  return score;
}

/**
 * Get descriptive text for password strength
 * @param strengthScore - The strength score (0-100)
 * @returns Description of password strength
 */
export function getStrengthDescription(strengthScore: number): string {
  if (strengthScore < 30) {
    return 'Weak';
  } else if (strengthScore < 60) {
    return 'Moderate';
  } else if (strengthScore < 80) {
    return 'Strong';
  } else {
    return 'Very Strong';
  }
}

/**
 * Get color for password strength indicator
 * @param strengthScore - The strength score (0-100)
 * @returns CSS color value
 */
export function getStrengthColor(strengthScore: number): string {
  if (strengthScore < 30) {
    return '#f44336'; // Red
  } else if (strengthScore < 60) {
    return '#ff9800'; // Orange
  } else if (strengthScore < 80) {
    return '#2196F3'; // Blue
  } else {
    return '#4CAF50'; // Green
  }
}