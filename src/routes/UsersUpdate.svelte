<script>
  import { onMount } from "svelte";
	import { link } from 'svelte-spa-router'
	import active from 'svelte-spa-router/active'
  export let params

  let name
  let email
  let password
	const baseUrl = 'http://localhost:3000/users'

  onMount(async () => {
    fetch(`${baseUrl}/${params.id}`)
      .then(response => response.json())
      .then(data => {
        name = data.name
        email = data.email
        password = data.password
      })
  })

  async function doPatch() {
		const res = await fetch(`${baseUrl}/${params.id}`, {
			method: 'PATCH',
      headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				name,
				email,
				password
			})
		})
	}
</script>

<div class="card" style="height: 100%;">
	<div class="card-header">
		<div class="row">
			<div class="col-md-1">
				<a href="/users" class="btn btn-outline-primary" style="width: 100%;" use:link use:active >Voltar</a>
			</div>
			<div class="col-md-10">
				<h3 class="text-center">Atualizar Usuário</h3>
			</div>
			<div class="col-md-1"></div>
		</div>
	</div>
	<div class="card-body">
		<div class="row mt-3">
			<div class="col-md-1"></div>
			<div class="col-md-10">
        <div class="row">
          <div class="col-md-4">
            <label for="name" class="form-label">Nome:</label>
            <input type="text" class="form-control" bind:value="{name}" required>
          </div>
          <div class="col-md-4">
            <label for="name" class="form-label">E-mail:</label>
            <input type="text" class="form-control" bind:value="{email}" required>
          </div>
          <div class="col-md-4">
            <label for="name" class="form-label">Senha:</label>
            <input type="password" class="form-control" bind:value="{password}" required>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-auto">
            <button type="button" on:click="{doPatch}" class="btn btn-outline-success">Salvar</button>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
    <!-- <div class="row mt-3">
      <div class="alert alert-success alert-dismissible">
        <strong>Success!</strong>
        <a href="" class="close ml-auto p-2" data-dismiss="alert" aria-label="close">&times;</a>
      </div>
    </div> -->
  </div>
</div>
