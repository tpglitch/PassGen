<script>
  import { getStrengthDescription, getStrengthColor } from '../utils/passwordUtils.js';
  
  // Props
  export let strengthScore = 0;
</script>

<div class="strength-container mt-3">
  <div class="d-flex justify-content-between mb-1">
    <span>Strength:</span>
    <span style="color: {getStrengthColor(strengthScore)}">
      {getStrengthDescription(strengthScore)}
    </span>
  </div>
  
  <div class="progress" style="height: 8px;">
    <div 
      class="progress-bar" 
      role="progressbar" 
      style="width: {strengthScore}%; background-color: {getStrengthColor(strengthScore)};" 
      aria-valuenow="{strengthScore}" 
      aria-valuemin="0" 
      aria-valuemax="100">
    </div>
  </div>
</div>

<style>
  .strength-container {
    margin-bottom: 1rem;
  }
</style>