const sessions = {}
const fastify = require('fastify')({ logger: true })

let items = [
  { id: 1, name: '1 uva' },
  { id: 2, name: '2 morango' },
]

fastify.get('/items', async () => {
  return items
})

fastify.post('/login', async (request) => {
  const { user } = request.body
  sessions[user] = { logged: true}
  return { message :'Usuario logado'}
})

fastify.get('/items/:id', async (request, reply) => {
  const { user } = request.query
  const id = Number(request.params.id)

  if (!sessions[user]) {
    reply.code(401)
    return { message: 'Usuario não logado' }
  }
  const item = items.find(i => i.id == id)

  if (!item){
    repaly.code(404)
    return{message: 'Item não encontrado'}
  }
  return item
})

fastify.post('/items', async (request, reply) => {
  const { name } = request.body
  const newItem = { id: items.length + 1, name }
  items.push(newItem)
  reply.code(201)
  return newItem
})

fastify.put('/items/:id', async (request, replay) => {
  const id = Number(request.params.id)
  const { name } = request.body
  const item = items.find(i => i.id == id)

  if (!item) {
    replay.code(404)
    return { message: 'Item não encontrado' }
  }

  item.name = name
  return item
})

fastify.delete('/items/:id', async (request, reply) => {
  const id = number(request.params.id)
  const index = items.findIndex(i => i.id == id)

  if (index == -1) {
    reply.code(404)
    return { message: 'Item não encontardo ' }
  }

  items.splice(index, 1)
  return { message: 'item removido com sucesso' }
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})