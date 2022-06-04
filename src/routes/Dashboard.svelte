<script src="https://cdn.jsdelivr.net/npm/chart.js">
	import { onMount } from "svelte";

  let startDateTime;
  let endDateTime;

  onMount(async () => {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ];

    console.log("acorda puta")

    let data1 = [1, 11, 5, 2, 21, 31, 45]
    let data2 = [1, 111, 51, 21, 211, 311, 451]
    let data3 = [10, 101, 5, 2, 201, 13, 54]
    let data4 = [23, 45, 54, 67, 12, 32, 45]
    let data5 = [63, 11, 45, 26, 77, 31, 45]

    let data = {
      labels: labels,
      datasets: [{
        label: 'Temperatura do ar',
        backgroundColor: 'rgb(255, 99, 3)',
        borderColor: 'rgb(255, 99, 3)',
        data: data1,
      }]
    };

    let config = {
      type: 'line',
      data: data,
      options: {}
    };

    let myChart1 = new Chart(
      document.getElementById('myChart1'),
      config
    );

    data = {
      labels: labels,
      datasets: [{
        label: 'Temperatura da água',
        backgroundColor: 'rgb(255, 2, 132)',
        borderColor: 'rgb(255, 2, 132)',
        data: data2,
      }]
    };

    config = {
      type: 'line',
      data: data,
      options: {}
    };

    let myChart2 = new Chart(
      document.getElementById('myChart2'),
      config
    );

    data = {
      labels: labels,
      datasets: [{
        label: 'Umidade do ar',
        backgroundColor: 'rgb(34, 99, 132)',
        borderColor: 'rgb(34, 99, 132)',
        data: data3,
      }]
    };

    config = {
      type: 'line',
      data: data,
      options: {}
    };

    let myChart3 = new Chart(
      document.getElementById('myChart3'),
      config
    );

    data = {
      labels: labels,
      datasets: [{
        label: 'Umidade do solo',
        backgroundColor: 'rgb(32, 2, 132)',
        borderColor: 'rgb(32, 2, 132)',
        data: data4,
      }]
    };

    config = {
      type: 'line',
      data: data,
      options: {}
    };

    let myChart4 = new Chart(
      document.getElementById('myChart4'),
      config
    );

    data = {
      labels: labels,
      datasets: [{
        label: 'Condutividade da água',
        backgroundColor: 'rgb(32, 99, 3)',
        borderColor: 'rgb(32, 99, 3)',
        data: data5,
      }]
    };

    config = {
      type: 'line',
      data: data,
      options: {}
    };

    let myChart5 = new Chart(
      document.getElementById('myChart5'),
      config
    );
  })
</script>


<div class="card" style="height: 100%;">
	<div class="card-header">
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">
				<h3 class="text-center">Dashboard</h3>
			</div>
			<div class="col-md-1"></div>
		</div>
	</div>
	<div class="card-body">
    <div class="row mt-3">
      <div class="col-md-4">
        <label for="nursery" class="form-label">Viveiro:</label>
        <select class="form-select">
            <option value="1">Viveiro 1</option>
            <option value="2">Viveiro 2</option>
            <option value="3">Viveiro 3</option>
            <option value="4">Viveiro 4</option>
            <option value="5">Viveiro 5</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="initDate" class="form-label">Instante inicials:</label>
        <div class="row">
          <input type="date" class="form-control" bind:value="{startDateTime}" placeholder="dd/mm/YYYY H:i:s">
        </div>
      </div>
      <div class="col-md-4">
        <label for="finalDate" class="form-label">Instante final:</label>
        <input type="datetime-local" class="form-control" bind:value="{endDateTime}">
      </div>
    </div>
		<div class="row">
			<!-- <div class="col-md-6 mt-5">
        <div>
          <canvas id="myChart1"></canvas>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div>
          <canvas id="myChart2"></canvas>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div>
          <canvas id="myChart3"></canvas>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div>
          <canvas id="myChart4"></canvas>
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <div>
          <canvas id="myChart5"></canvas>
        </div>
      </div> -->
    </div>
  </div>
</div>
