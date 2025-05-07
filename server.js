import express from 'express'
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

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


// Ophalen van data voor de opdrachten pagina

app.get('/het-verlies-aanvaarden', async function (request, response) {
  const taskResponse = await fetch('https://fdnd-agency.directus.app/items/dropandheal_task/?filter={"id":1}')
  const exerciseResponse = await fetch('https://fdnd-agency.directus.app/items/dropandheal_exercise/?filter={"task":1}')
  const taskResponseJSON = await taskResponse.json()
  const exerciseResponseJSON = await exerciseResponse.json()

  response.render('het-verlies-aanvaarden.liquid', {
    task: taskResponseJSON.data,
    exercise: exerciseResponseJSON.data
  })
})

// Ophalen en plaatsen van data voor de community drops pagina\

let gelukt = false

app.get('/community-drops', async function (request, response) {
    const dropsResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?filter={"_and":[{"from":{"_contains":"Recep_"}}]}&sort=-date_created`)
    const dropsResponseJSON = await dropsResponse.json()
  
    response.render('community-drops.liquid', {
      title: "community-drops",
      drops: dropsResponseJSON.data,
      gelukt: gelukt
    })
    gelukt = false;
  })

  app.post('/community-drops', async function (request, response) {
  
    await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
      method: 'POST',
      body: JSON.stringify({
        from: `Recep_${request.body.from}`,     
        text: request.body.text
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
    gelukt = true;
  
    response.redirect(303, '/community-drops');
  })
  
