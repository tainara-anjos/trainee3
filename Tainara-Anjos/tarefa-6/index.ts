import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

type Item = {
  id: number
  name: string
  cor: string
  categoria: string 
}
let items: Item[] = [
  { id: 1, name: 'Uva', cor: 'Roxa', categoria: 'Fruta' },
  { id: 2, name: 'Morango', cor: 'Vermelho', categoria:'Fruta' },
  { id: 3, name: 'Banana', cor: 'Amarela', categoria: 'Fruta' }
]

fastify.get('/items', async () => {
  return items
})

fastify.get('/items/:id', async (request, reply) => {
  const { id } = request.params as { id: string }

  const item = items.find(i => i.id === Number(id))

  if (!item) {
    reply.code(404)
    return { message: 'Item não encontrado' }
  }
  return item
})

fastify.post('/items', async (request, reply) => {
  const { name, cor, categoria } = request.body as {
    name: string
    cor: string
    categoria: string
  }

  const newItem: Item = {
    id: items.length + 1,
    name,
    cor,
    categoria
  }

  items.push(newItem)
  reply.code(201)
  return newItem
})

// PUT /items/:id
fastify.put('/items/:id', async (request, reply) => {
  const { id } = request.params as { id: string }
  const { name, cor, categoria } = request.body as {
    name: string
    cor: string
    categoria: string
  }

  const item = items.find(i => i.id === Number(id))

  if (!item) {
    reply.code(404)
    return { message: 'Item não encontrado' }
  }

  item.name = name
  item.cor = cor
  item.categoria = categoria

  return item
})

fastify.delete('/items/:id', async (request, reply) => {
  const { id } = request.params as { id: string }

  const index = items.findIndex(i => i.id === Number(id))

  if (index === -1) {
    reply.code(404)
    return { message: 'Item não encontrado' }
  }

  items.splice(index, 1)
  reply.code(204)
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log(' API rodando em http://localhost:3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
