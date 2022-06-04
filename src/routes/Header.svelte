<script>
	import Router, { link } from 'svelte-spa-router'
  import routes from '../routes';
	import active from 'svelte-spa-router/active'
</script>

<div class="row">
  <div class="col-md-1"></div>
  <div class="col-md-10">
    <header class="text-center">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/dashboard" use:active use:link>Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/nurseries" use:active use:link>Viveiros</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/sensors" use:active use:link>Sensores</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/users" use:active use:link>Usuários</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
  <div class="col-md-1"></div>
</div>

<Router {routes} />