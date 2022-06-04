<script>
	import { onMount } from "svelte";
	import { link } from 'svelte-spa-router'
	import active from 'svelte-spa-router/active'
  export let params

  let sensor_type
	let nursery_id
	let nurseries = []
	const sensorsUrl = 'http://localhost:3000/sensors'
	const nurseriesUrl = 'http://localhost:3000/nurseries'

	onMount(async () => {
    fetch(nurseriesUrl)
			.then(response => response.json())
			.then(data => {
				nurseries =  data
				console.log(nurseries)
			})

		fetch(`${sensorsUrl}/${params.id}`)
      .then(response => response.json())
      .then(data => {
        sensor_type =  data.sensor_type
        nursery_id =  data.nursery_id
      })
	})

  async function doPatch() {
		const res = await fetch(`${sensorsUrl}/${params.id}`, {
			method: 'PATCH',
      headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				sensor_type,
				nursery_id
			})
		})
	}
</script>

<div class="card" style="height: 100%;">
	<div class="card-header">
		<div class="row">
			<div class="col-md-1">
				<a href="/sensors" class="btn btn-outline-primary" style="width: 100%;" use:link use:active >Voltar</a>
			</div>
			<div class="col-md-10">
				<h3 class="text-center">Atualizar Sensor</h3>
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
            <label for="name" class="form-label">Tipo de sensor:</label>
            <!-- <input type="text" class="form-control" bind:value="{name}" required> -->
						<select class="form-select" bind:value="{sensor_type}">
							<option value="water temperature">Temperatura do ar</option>
							<option value="air temperature">Temperatura da água</option>
							<option value="air humidity">Umidade do ar</option>
							<option value="soil moisture">Umidade do solo</option>
							<option value="water conductivity">Condutividade da água</option>
						</select>
          </div>
					<div class="col-md-6">
            <label for="name" class="form-label">Viveiro:</label>
						<select class="form-select" bind:value="{nursery_id}">
							{#each Object.values(nurseries) as nursery}
								<option value="{nursery.id}">{nursery.name}</option>
							{/each}
						</select>
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
