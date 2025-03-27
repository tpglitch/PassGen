"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passwordUtils_1 = require("./utils/passwordUtils");
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const elements = {
        passwordDisplay: document.getElementById('password'),
        copyBtn: document.getElementById('copy-btn'),
        lengthSlider: document.getElementById('length'),
        lengthInput: document.getElementById('length-input'),
        uppercaseCheckbox: document.getElementById('uppercase'),
        lowercaseCheckbox: document.getElementById('lowercase'),
        numbersCheckbox: document.getElementById('numbers'),
        specialCheckbox: document.getElementById('special'),
        generateBtn: document.getElementById('generate-btn'),
        strengthMeterFill: document.querySelector('.strength-meter-fill'),
        strengthText: document.querySelector('.strength-text')
    };
    // Function to generate password and update UI
    const createPassword = () => {
        try {
            const length = parseInt(elements.lengthSlider.value);
            const hasUppercase = elements.uppercaseCheckbox.checked;
            const hasLowercase = elements.lowercaseCheckbox.checked;
            const hasNumbers = elements.numbersCheckbox.checked;
            const hasSpecial = elements.specialCheckbox.checked;
            // Generate password
            const password = (0, passwordUtils_1.generatePassword)(length, hasUppercase, hasLowercase, hasNumbers, hasSpecial);
            // Update password display
            elements.passwordDisplay.value = password;
            // Calculate strength score
            const strengthScore = (0, passwordUtils_1.calculateStrength)(password, hasUppercase, hasLowercase, hasNumbers, hasSpecial);
            // Update strength indicator
            elements.strengthMeterFill.style.width = `${strengthScore}%`;
            elements.strengthMeterFill.style.backgroundColor = (0, passwordUtils_1.getStrengthColor)(strengthScore);
            elements.strengthText.textContent = (0, passwordUtils_1.getStrengthDescription)(strengthScore);
        }
        catch (error) {
            alert(error.message);
        }
    };
    // Update number input when slider changes and generate new password
    elements.lengthSlider.addEventListener('input', () => {
        elements.lengthInput.value = elements.lengthSlider.value;
        createPassword();
    });
    // Update slider when number input changes and generate new password
    elements.lengthInput.addEventListener('input', () => {
        // Ensure the input value is within min and max bounds
        const value = parseInt(elements.lengthInput.value);
        if (value < 4)
            elements.lengthInput.value = '4';
        if (value > 64)
            elements.lengthInput.value = '64';
        elements.lengthSlider.value = elements.lengthInput.value;
        createPassword();
    });
    // Add event listeners to all checkboxes to generate new password when changed
    elements.uppercaseCheckbox.addEventListener('change', createPassword);
    elements.lowercaseCheckbox.addEventListener('change', createPassword);
    elements.numbersCheckbox.addEventListener('change', createPassword);
    elements.specialCheckbox.addEventListener('change', createPassword);
    // Generate password when button is clicked
    elements.generateBtn.addEventListener('click', createPassword);
    // Copy password to clipboard when copy button is clicked
    elements.copyBtn.addEventListener('click', () => {
        elements.passwordDisplay.select();
        document.execCommand('copy');
        elements.copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            elements.copyBtn.textContent = 'Copy';
        }, 2000);
    });
    // Generate a password on page load
    createPassword();
});
