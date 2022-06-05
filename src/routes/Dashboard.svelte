<script src="https://cdn.jsdelivr.net/npm/chart.js">
	import { onMount } from "svelte";

  let nowDate = new Date();
  let month = (nowDate.getMonth() > 10) ? `${nowDate.getMonth() + 1}` : `0${nowDate.getMonth() + 1}`
  let day = (nowDate.getDate() > 10) ? `${nowDate.getDate()}` : `0${nowDate.getDate()}`
  let initHour = (nowDate.getHours() > 10) ? `${nowDate.getHours() - 1}` : `0${nowDate.getHours() - 1}`
  let endHour = (nowDate.getHours() >= 10) ? `${nowDate.getHours()}` : `0${nowDate.getHours()}`
  let minutes = (nowDate.getMinutes() > 10) ? `${nowDate.getMinutes()}` : `0${nowDate.getMinutes()}`
  let initDate = `${nowDate.getFullYear()}-${month}-${day}T${initHour}:${minutes}`;
  let endDate = `${nowDate.getFullYear()}-${month}-${day}T${endHour}:${minutes}`;
  // let endDate = "2022-06-04T11:30";
  let nurseryId;
  let nurseries = [];
  let charts = [];
  let measurements = [];
  let sensorTypeTranslations = {
    'water temperature': 'Temperatura da água',
    'air temperature': 'Temperatura do ar',
    'air humidity': 'Umidade do ar',
    'soil moisture': 'Umidade do solo',
    'water conductivity': 'Condutividade da água',
  }

  var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

	const dashboardUrl = 'http://localhost:3000/dashboard';
	const nurseriesUrl = 'http://localhost:3000/nurseries';

  onMount(async () => {
    fetch(nurseriesUrl)
			.then(response => response.json())
			.then(data => {
				nurseries = data
        nurseryId = nurseries[0].id
        console.log(endDate)
        console.log(initDate)
			})


    async function fetchData() {
        fetch(dashboardUrl,{
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            nurseryId,
            initDate,
            endDate
          })
        })
        .then(response => response.json())
        .then(data => measurements = data.data)
        console.log(measurements)        
        for(var i = 0; i < charts.length; i++){
          charts[i].destroy()
        }
        let chartsLength = charts.length

        for(var j = 0; j < measurements.length; j++){
          let chartLabel = `${sensorTypeTranslations[measurements[j].sensor_type]} (${measurements[j].sensor_id})`

          let data = {
            labels: measurements[j].dates,
            datasets: [{
              label: chartLabel,
              backgroundColor: `${colorArray[j]}`,
              borderColor: `${colorArray[j]}`,
              data: measurements[j].measurements,
            }]
          };

          let config = {
            type: 'line',
            data: data,
            options: {
              animation: false
            }
          };
          charts.push(new Chart(
              document.getElementById(`myChart${measurements[j].sensor_id}`),
              config
            ))
          // if(chartsLength == 0){
          //   charts.push(new Chart(
          //     document.getElementById(`myChart${measurements[j].sensor_id}`),
          //     config
          //   ))
          // } else {
          //   removeData(charts[j])
          //   addData(charts[j], measurements[j].dates, measurements[j].measurements)
          // }
        }
      }
      
    const interval = setInterval(fetchData, 3000);

    function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
        console.log(chart.data.labels)
    }
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
        <label for="name" class="form-label">Viveiro:</label>
          <select class="form-select" bind:value="{nurseryId}">
            {#each Object.values(nurseries) as nursery}
              <option value="{nursery.id}">{nursery.name}</option>
            {/each}
          </select>
      </div>
      <div class="col-md-4">
        <label for="initDate" class="form-label">Instante inicial:</label>
        <div class="row">
          <input type="datetime-local" class="form-control" bind:value="{initDate}" placeholder="dd/mm/YYYY H:i:s">
        </div>
      </div>
      <div class="col-md-4">
        <label for="finalDate" class="form-label">Instante final:</label>
        <input type="datetime-local" class="form-control" bind:value="{endDate}">
      </div>
    </div>
		<div class="row">
      {#each Object.values(measurements) as measurement}
        <div class="col-md-6 mt-5">
          <div>
            <canvas id="myChart{measurement.sensor_id}"></canvas>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
