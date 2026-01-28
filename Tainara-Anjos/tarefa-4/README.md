Tarefa 4 - API REST com Node.js e Fastify

Esta tarefa consiste na criação de uma API REST simples utilizando Node.js e o framework Fastify, com o objetivo de praticar a criação de rotas e o uso correto dos verbos HTTP.

Tecnologias utilizadas
- Node.js
- Fastify

Entidade
A API trabalha com a entidade *items*, utilizando um array em memória para simular um banco de dados.

 Rotas implementadas

- GET /items 
  Lista todos os items cadastrados.

- GET /items/:id  
  Retorna um item específico pelo ID.

- POST /items  
  Cria um novo item.

- PUT /items/:id 
  Atualiza um item existente.

- DELETE /items/:id  
  Remove um item pelo ID.

Como executar o projeto
node index.js

rodar
http://localhost:3000/items

