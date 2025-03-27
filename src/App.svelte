<script>
  import PasswordGenerator from './components/PasswordGenerator.svelte';
</script>

<main class="container my-5">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h2 class="mb-0 text-center">Password Generator</h2>
        </div>
        <div class="card-body">
          <PasswordGenerator />
        </div>
        <div class="card-footer text-center text-muted">
          <small>Secure Random Password Generator</small>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f5f5f5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
</style>