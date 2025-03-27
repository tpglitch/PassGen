"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialChars = exports.numberChars = exports.lowercaseChars = exports.uppercaseChars = void 0;
exports.generatePassword = generatePassword;
exports.calculateStrength = calculateStrength;
exports.getStrengthDescription = getStrengthDescription;
exports.getStrengthColor = getStrengthColor;
// Password character sets
exports.uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
exports.lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
exports.numberChars = '0123456789';
exports.specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
/**
 * Generate a random password based on selected options
 * @param length - Length of the password
 * @param hasUppercase - Include uppercase letters
 * @param hasLowercase - Include lowercase letters
 * @param hasNumbers - Include numbers
 * @param hasSpecial - Include special characters
 * @returns Generated password
 */
function generatePassword(length, hasUppercase, hasLowercase, hasNumbers, hasSpecial) {
    // Ensure at least one character type is selected
    if (!hasUppercase && !hasLowercase && !hasNumbers && !hasSpecial) {
        throw new Error('Please select at least one character type');
    }
    // Build character pool based on selected options
    let charPool = '';
    if (hasUppercase)
        charPool += exports.uppercaseChars;
    if (hasLowercase)
        charPool += exports.lowercaseChars;
    if (hasNumbers)
        charPool += exports.numberChars;
    if (hasSpecial)
        charPool += exports.specialChars;
    // Generate random password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
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
function calculateStrength(password, hasUppercase, hasLowercase, hasNumbers, hasSpecial) {
    // Calculate strength score (0-100)
    let score = 0;
    const length = password.length;
    // Length score (up to 50 points)
    score += Math.min(length, 50);
    // Character variety score (up to 60 points)
    const typesCount = [hasUppercase, hasLowercase, hasNumbers, hasSpecial].filter(Boolean).length;
    score += typesCount * 15;
    // Adjust based on actual password content
    const hasUppercaseActual = /[A-Z]/.test(password);
    const hasLowercaseActual = /[a-z]/.test(password);
    const hasNumbersActual = /\d/.test(password);
    const hasSpecialActual = /[^A-Za-z0-9]/.test(password);
    const actualTypesCount = [
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
function getStrengthDescription(strengthScore) {
    if (strengthScore < 30) {
        return 'Weak';
    }
    else if (strengthScore < 60) {
        return 'Moderate';
    }
    else if (strengthScore < 80) {
        return 'Strong';
    }
    else {
        return 'Very Strong';
    }
}
/**
 * Get color for password strength indicator
 * @param strengthScore - The strength score (0-100)
 * @returns CSS color value
 */
function getStrengthColor(strengthScore) {
    if (strengthScore < 30) {
        return '#f44336'; // Red
    }
    else if (strengthScore < 60) {
        return '#ff9800'; // Orange
    }
    else if (strengthScore < 80) {
        return '#2196F3'; // Blue
    }
    else {
        return '#4CAF50'; // Green
    }
}
