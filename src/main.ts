import { 
  generatePassword, 
  calculateStrength, 
  getStrengthDescription, 
  getStrengthColor 
} from './utils/passwordUtils';

// DOM elements
interface DOMElements {
  passwordDisplay: HTMLInputElement;
  copyBtn: HTMLButtonElement;
  lengthSlider: HTMLInputElement;
  lengthInput: HTMLInputElement;
  uppercaseCheckbox: HTMLInputElement;
  lowercaseCheckbox: HTMLInputElement;
  numbersCheckbox: HTMLInputElement;
  specialCheckbox: HTMLInputElement;
  generateBtn: HTMLButtonElement;
  strengthMeterFill: HTMLElement;
  strengthText: HTMLElement;
}

document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const elements: DOMElements = {
    passwordDisplay: document.getElementById('password') as HTMLInputElement,
    copyBtn: document.getElementById('copy-btn') as HTMLButtonElement,
    lengthSlider: document.getElementById('length') as HTMLInputElement,
    lengthInput: document.getElementById('length-input') as HTMLInputElement,
    uppercaseCheckbox: document.getElementById('uppercase') as HTMLInputElement,
    lowercaseCheckbox: document.getElementById('lowercase') as HTMLInputElement,
    numbersCheckbox: document.getElementById('numbers') as HTMLInputElement,
    specialCheckbox: document.getElementById('special') as HTMLInputElement,
    generateBtn: document.getElementById('generate-btn') as HTMLButtonElement,
    strengthMeterFill: document.querySelector('.strength-meter-fill') as HTMLElement,
    strengthText: document.querySelector('.strength-text') as HTMLElement
  };

  // Function to generate password and update UI
  const createPassword = (): void => {
    try {
      const length: number = parseInt(elements.lengthSlider.value);
      const hasUppercase: boolean = elements.uppercaseCheckbox.checked;
      const hasLowercase: boolean = elements.lowercaseCheckbox.checked;
      const hasNumbers: boolean = elements.numbersCheckbox.checked;
      const hasSpecial: boolean = elements.specialCheckbox.checked;
      
      // Generate password
      const password: string = generatePassword(
        length, 
        hasUppercase, 
        hasLowercase, 
        hasNumbers, 
        hasSpecial
      );
      
      // Update password display
      elements.passwordDisplay.value = password;
      
      // Calculate strength score
      const strengthScore: number = calculateStrength(
        password, 
        hasUppercase, 
        hasLowercase, 
        hasNumbers, 
        hasSpecial
      );
      
      // Update strength indicator
      elements.strengthMeterFill.style.width = `${strengthScore}%`;
      elements.strengthMeterFill.style.backgroundColor = getStrengthColor(strengthScore);
      elements.strengthText.textContent = getStrengthDescription(strengthScore);
    } catch (error) {
      alert((error as Error).message);
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
    const value: number = parseInt(elements.lengthInput.value);
    if (value < 4) elements.lengthInput.value = '4';
    if (value > 64) elements.lengthInput.value = '64';
    
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