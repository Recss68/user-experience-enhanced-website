import express from 'express'
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.get('/', async function (request, response) {
  const taskResponse = await fetch('https://fdnd-agency.directus.app/items/dropandheal_task')
  const taskResponseJSON = await taskResponse.json()

  response.render('index.liquid', {
    task: taskResponseJSON.data
  })
})

// Stel het poortnummer in waar Express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})


