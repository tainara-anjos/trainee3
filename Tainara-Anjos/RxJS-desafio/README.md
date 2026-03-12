Sobre o projeto:
Este projeto implementa um sistema de monitoramento reativo utilizando RxJS. O objetivo é construir um pipeline de dados com Observables, operadores de transformação e tratamento de erros, simulando informações em tempo real de entregadores, pedidos e alertas do sistema.
A aplicação demonstra como fluxos de dados podem ser processados de forma reativa para filtrar, combinar e monitorar eventos dentro de um sistema de entregas.

Como rodar o projeto:

Instalar as dependências-
npm install

Rodar o projeto-
npm start

Descrição dos Streams:
gps$
Emite a cada 1 segundo dados simulados de localização dos entregadores, incluindo:
entregadorId
latitude
longitude
velocidade
timestamp
Esse stream simula o rastreamento em tempo real dos entregadores.

pedidos$
Emite a cada 2 segundos atualizações de status de pedidos, contendo:
pedidoId
status do pedido (coletado, em_rota, entregue ou falhou)
entregadorId
timestamp
Também foi implementada simulação de erro com 10% de chance, representando falha na comunicação com o servidor.

alertas$
Emite alertas do sistema em intervalos aleatórios entre 3 e 8 segundos.
Cada alerta contém:
tipo do alerta (atraso, veiculo_parado ou rota_desviada)
entregadorId
mensagem
severidade (baixa, media ou alta)
Esse stream simula eventos inesperados no sistema de entregas.

Justificativa do operador usado na Tarefa 3.1:
Para a criação do stream painelEntregador$, foi utilizado o operador combineLatest.

Esse operador foi escolhido porque ele permite combinar dois streams (gps$ e pedidos$) e emitir um novo valor sempre que qualquer um deles emitir um novo evento, utilizando os valores mais recentes de cada stream.

entativa na Tarefa 3.2 (Dashboard de Emergência):
A tentativa foi combinar os streams utilizando operadores como filter, withLatestFrom e map, verificando se o entregadorId correspondia nos dois eventos.
O objetivo era emitir um evento de emergência quando essas duas condições ocorressem dentro de um intervalo de tempo próximo.

Dificuldade encontrada:
Uma das principais dificuldades foi lidar com os tipos do TypeScript dentro dos operadores do RxJS, especialmente em operadores como scan e filter.
Em alguns casos o TypeScript não reconhecia as propriedades dos objetos emitidos pelos streams, gerando erros de tipagem.
A solução foi definir tipos mais claros para os dados ou utilizar tipagem genérica (any) temporariamente para permitir que o fluxo funcionasse corretamente.
Outra dificuldade foi entender quando utilizar subscribe() para iniciar a execução dos streams, já que os Observables do RxJS são "lazy" e só começam a emitir dados quando existe uma subscrição.