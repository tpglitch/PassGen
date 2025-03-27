/**
 * Generate a cryptographically secure random password
 * @param {number} length - Length of the password
 * @param {boolean} uppercase - Include uppercase letters
 * @param {boolean} lowercase - Include lowercase letters
 * @param {boolean} numbers - Include numbers
 * @param {boolean} special - Include special characters
 * @returns {string} Generated password
 */
export function generatePassword(length, uppercase, lowercase, numbers, special) {
  // Character pools
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Create the character pool based on selected options
  let charPool = '';
  if (uppercase) charPool += uppercaseChars;
  if (lowercase) charPool += lowercaseChars;
  if (numbers) charPool += numberChars;
  if (special) charPool += specialChars;
  
  // If no options selected, default to lowercase
  if (charPool === '') {
    charPool = lowercaseChars;
  }
  
  // Generate password
  let password = '';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charPool.length;
    password += charPool[randomIndex];
  }
  
  return password;
}

/**
 * Calculate password strength on a scale of 0-100
 * @param {string} password - The password to evaluate
 * @param {boolean} hasUppercase - Whether uppercase was included in options
 * @param {boolean} hasLowercase - Whether lowercase was included in options
 * @param {boolean} hasNumbers - Whether numbers were included in options
 * @param {boolean} hasSpecial - Whether special chars were included in options
 * @returns {number} Strength score from 0-100
 */
export function calculateStrength(password, hasUppercase, hasLowercase, hasNumbers, hasSpecial) {
  if (!password) return 0;
  
  // Base score
  let score = 0;
  
  // Length factor (up to 40 points)
  const lengthFactor = Math.min(password.length * 2, 40);
  score += lengthFactor;
  
  // Character variety (up to 40 points)
  const hasUppercaseChar = /[A-Z]/.test(password);
  const hasLowercaseChar = /[a-z]/.test(password);
  const hasNumberChar = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  
  const varietyCount = 
    (hasUppercaseChar ? 1 : 0) + 
    (hasLowercaseChar ? 1 : 0) + 
    (hasNumberChar ? 1 : 0) + 
    (hasSpecialChar ? 1 : 0);
  
  const varietyFactor = varietyCount * 10;
  score += varietyFactor;
  
  // Consistency with options selected (up to 20 points)
  let optionsConsistency = 0;
  if (hasUppercase && hasUppercaseChar) optionsConsistency += 5;
  if (hasLowercase && hasLowercaseChar) optionsConsistency += 5;
  if (hasNumbers && hasNumberChar) optionsConsistency += 5;
  if (hasSpecial && hasSpecialChar) optionsConsistency += 5;
  
  score += optionsConsistency;
  
  return Math.min(Math.max(score, 0), 100);
}

/**
 * Get descriptive text for password strength
 * @param {number} strengthScore - The strength score (0-100)
 * @returns {string} Description of password strength
 */
export function getStrengthDescription(strengthScore) {
  if (strengthScore < 20) return 'Very Weak';
  if (strengthScore < 40) return 'Weak';
  if (strengthScore < 60) return 'Moderate';
  if (strengthScore < 80) return 'Strong';
  return 'Very Strong';
}

/**
 * Get color for password strength indicator
 * @param {number} strengthScore - The strength score (0-100)
 * @returns {string} CSS color value
 */
export function getStrengthColor(strengthScore) {
  if (strengthScore < 20) return '#dc3545'; // red
  if (strengthScore < 40) return '#ffc107'; // yellow
  if (strengthScore < 60) return '#fd7e14'; // orange
  if (strengthScore < 80) return '#20c997'; // teal
  return '#198754'; // green
}