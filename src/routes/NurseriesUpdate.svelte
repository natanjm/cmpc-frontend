<script>
  import { onMount } from "svelte";
	import { link } from 'svelte-spa-router'
	import active from 'svelte-spa-router/active'
  export let params
  
  let name
	const baseUrl = 'http://localhost:3000/nurseries'

  onMount(() => {
    fetch(`${baseUrl}/${params.id}`)
      .then(response => response.json())
      .then(data => {
        name =  data.name
      })
	})

  async function doPatch() {
		const res = await fetch(`${baseUrl}/${params.id}`, {
			method: 'PATCH',
      headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				name
			})
		})
	}
</script>

<div class="card" style="height: 100%;">
	<div class="card-header">
		<div class="row">
			<div class="col-md-1">
				<a href="/nurseries" class="btn btn-outline-primary" style="width: 100%;" use:link use:active >Voltar</a>
			</div>
			<div class="col-md-10">
				<h3 class="text-center">Atualizar Viveiro</h3>
			</div>
			<div class="col-md-1"></div>
		</div>
	</div>
	<div class="card-body">
		<div class="row mt-3">
			<div class="col-md-1"></div>
			<div class="col-md-10">
        <div class="row">
          <div class="col-md-6">
            <label for="name" class="form-label">Nome:</label>
            <input type="text" class="form-control" bind:value="{name}">
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


