<script>
	import { onMount } from "svelte";
	import { link } from 'svelte-spa-router'
	import active from 'svelte-spa-router/active'

	let sensors = []

	const baseUrl = 'http://localhost:3000/sensors'
	
	onMount(async () => {
		const response = await fetch(baseUrl)
		sensors = await response.json()
		console.log(response)
		console.log(sensors)
	})

	async function formDeleteHandler(id) {
    fetch(`${baseUrl}/${id}`,{
      method:  'DELETE'
    })
      .then(result => {
				fetch(baseUrl)
					.then(response => response.json())
					.then(data => { sensors = data })
			})
			.catch(error => {
				console.log('error')
			})
  }
</script>

<div class="card">
	<div class="card-header">
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">
				<h3 class="text-center">Lista de Sensores</h3>
			</div>
			<div class="col-md-1">
				<a href="/sensors/create" class="btn btn-outline-primary" style="width: 100%;" use:link use:active >Novo</a>
			</div>
		</div>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<table class="styled-table">
					<thead>
						<tr>
							<th class="text-center">ID</th>
							<th class="text-center">Tipo de sensor</th>
							<th class="text-center">Viveiro</th>
							<th class="text-center">Ações</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.values(sensors) as sensor }
							<tr>
								<td class="text-center">{sensor.id}</td>
								<td >
									{#if sensor.sensor_type == 'water temperature'}
										Temperatura da água
									{/if}
									{#if sensor.sensor_type == 'air temperature'}
										Temperatura do ar
									{/if}
									{#if sensor.sensor_type == 'air humidity'}
										Umidade do ar
									{/if}
									{#if sensor.sensor_type == 'soil moisture'}
										Umidade do solo
									{/if}
									{#if sensor.sensor_type == 'water conductivity'}
										Condutividade da água
									{/if}
								</td>
								<td>{sensor.nursery.name}</td>
								<td class="text-center">
									<a href="/" class="btn btn-outline-primary" use:link={`/sensors/${sensor.id}/edit`} use:active >Edit</a>
									<button type="button" on:click="{formDeleteHandler(sensor.id)}" class="btn btn-outline-danger">Deletar</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="col-md-2"></div>
		</div>
	</div>
</div>

<style>
	.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	}

	.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
	}

	.styled-table th,
	.styled-table td {
		padding: 12px 15px;
	}

	.styled-table tbody tr {
		border-bottom: 1px solid #dddddd;
	}

	.styled-table tbody tr:nth-of-type(even) {
		background-color: #f3f3f3;
	}

	.styled-table tbody tr:last-of-type {
		border-bottom: 2px solid #009879;
	}
</style>
