<script>
	import { onMount } from "svelte";
	import { link } from 'svelte-spa-router'
	import active from 'svelte-spa-router/active'

	let nurseries = []

	const baseUrl = 'http://localhost:3000/nurseries'
	
	onMount(async () => {
		const response = await fetch(baseUrl)
		nurseries = await response.json()
		console.log("oiiiiiiiii")
	})

	async function formDeleteHandler(id) {
    fetch(`${baseUrl}/${id}`,{
      method:  'DELETE'
    })
      .then(result => {
				if (result.status == 500){
					alert('Existem sensores cadastrados para esse viveiro')
				} else {
				fetch(baseUrl)
					.then(response => response.json())
					.then(data => nurseries =  data)
				}
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
				<h3 class="text-center">Lista de Viveiros</h3>
			</div>
			<div class="col-md-1">
				<a href="/nurseries/create" class="btn btn-outline-primary" style="width: 100%;" use:link use:active >Novo</a>
			</div>
		</div>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6">
				<table class="styled-table">
					<thead>
						<tr>
							<th class="text-center">ID</th>
							<th class="text-center">Nome</th>
							<th class="text-center">Ações</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.values(nurseries) as nursery }
							<tr>
								<td class="text-center">{nursery.id}</td>
								<td >{nursery.name}</td>
								<td class="text-center">
									<a href="/" class="btn btn-outline-primary" use:link={`/nurseries/${nursery.id}/edit`} use:active >Edit</a>
									<button type="button" on:click="{formDeleteHandler(nursery.id)}" class="btn btn-outline-danger">Deletar</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="col-md-3"></div>
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
