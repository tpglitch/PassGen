<script>
  import { onMount } from 'svelte';
  import StrengthIndicator from './StrengthIndicator.svelte';
  import { generatePassword, calculateStrength } from '../utils/passwordUtils.js';
  
  // Password options state
  let password = '';
  let passwordLength = 16;
  let includeUppercase = true;
  let includeLowercase = true;
  let includeNumbers = true;
  let includeSpecial = true;
  let strengthScore = 0;
  let copied = false;
  let copyTimeout;

  // Generate initial password on component mount
  onMount(() => {
    generateNewPassword();
  });
  
  // Generate a new password based on current options
  function generateNewPassword() {
    password = generatePassword(
      passwordLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecial
    );
    
    // Calculate strength
    strengthScore = calculateStrength(
      password,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecial
    );
  }
  
  // Copy password to clipboard
  async function copyToClipboard() {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      copied = true;
      
      // Reset copied status after 2 seconds
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  
  // Watch for option changes and regenerate password
  $: if (passwordLength || includeUppercase || includeLowercase || includeNumbers || includeSpecial) {
    generateNewPassword();
  }
</script>

<div>
  <!-- Password Display Area -->
  <div class="password-display-container mb-3">
    <div class="input-group">
      <input 
        type="text" 
        class="form-control form-control-lg" 
        value="{password}" 
        readonly 
        aria-label="Generated Password"
      />
      <button 
        class="btn btn-outline-secondary" 
        type="button" 
        on:click={copyToClipboard}
        aria-label="Copy to clipboard"
      >
        {#if copied}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1V1.5z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>
        {/if}
      </button>
      <button 
        class="btn btn-primary" 
        type="button" 
        on:click={generateNewPassword}
        aria-label="Generate new password"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
          <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
        </svg>
      </button>
    </div>
    {#if copied}
      <div class="text-success mt-1 small">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>
        Copied to clipboard!
      </div>
    {/if}
  </div>

  <!-- Strength Indicator -->
  <StrengthIndicator {strengthScore} />
  
  <!-- Password Length Slider -->
  <div class="form-group mb-3">
    <label for="length-slider" class="form-label d-flex justify-content-between">
      <span>Password Length</span>
      <span class="badge bg-secondary">{passwordLength}</span>
    </label>
    <input 
      type="range" 
      class="form-range" 
      id="length-slider" 
      min="4" 
      max="32" 
      step="1" 
      bind:value={passwordLength}
    />
    <div class="d-flex justify-content-between small text-muted">
      <span>4</span>
      <span>32</span>
    </div>
  </div>
  
  <!-- Character Type Options -->
  <div class="form-group mb-3">
    <label class="form-label">Character Types</label>
    <div class="d-flex flex-wrap gap-2">
      <div class="form-check">
        <input 
          class="form-check-input" 
          type="checkbox" 
          id="uppercase" 
          bind:checked={includeUppercase}
        />
        <label class="form-check-label" for="uppercase">
          Uppercase (A-Z)
        </label>
      </div>
      
      <div class="form-check">
        <input 
          class="form-check-input" 
          type="checkbox" 
          id="lowercase" 
          bind:checked={includeLowercase}
        />
        <label class="form-check-label" for="lowercase">
          Lowercase (a-z)
        </label>
      </div>
      
      <div class="form-check">
        <input 
          class="form-check-input" 
          type="checkbox" 
          id="numbers" 
          bind:checked={includeNumbers}
        />
        <label class="form-check-label" for="numbers">
          Numbers (0-9)
        </label>
      </div>
      
      <div class="form-check">
        <input 
          class="form-check-input" 
          type="checkbox" 
          id="special" 
          bind:checked={includeSpecial}
        />
        <label class="form-check-label" for="special">
          Special (@#$%)
        </label>
      </div>
    </div>
  </div>
  
  <!-- Generate Button -->
  <div class="d-grid gap-2">
    <button 
      class="btn btn-primary" 
      type="button" 
      on:click={generateNewPassword}
    >
      Generate New Password
    </button>
  </div>
</div>

<style>
  .password-display-container {
    position: relative;
  }
  
  .form-check {
    margin-right: 1rem;
    min-width: 140px;
  }
</style>