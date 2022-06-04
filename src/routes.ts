import Dashboard from './routes/Dashboard.svelte'

import NurseriesList from './routes/NurseriesList.svelte'
import NurseriesCreate from './routes/NurseriesCreate.svelte'
import NurseriesUpdate from './routes/NurseriesUpdate.svelte'

import UsersList from './routes/UsersList.svelte'
import UsersCreate from './routes/UsersCreate.svelte'
import UsersUpdate from './routes/UsersUpdate.svelte'

import SensorsList from './routes/SensorsList.svelte'
import SensorsCreate from './routes/SensorsCreate.svelte'
import SensorsUpdate from './routes/SensorsUpdate.svelte'

const routes = {
	'/dashboard': Dashboard,
	
	'/nurseries': NurseriesList,
	'/nurseries/create': NurseriesCreate,
	'/nurseries/:id/edit': NurseriesUpdate,

	'/users': UsersList,
	'/users/create': UsersCreate,
	'/users/:id/edit': UsersUpdate,

	'/sensors': SensorsList,
	'/sensors/create': SensorsCreate,
	'/sensors/:id/edit': SensorsUpdate,
}

export default routes