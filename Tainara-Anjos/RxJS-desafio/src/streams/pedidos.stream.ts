import { timer, map, retry, catchError, of } from 'rxjs';
const status = ['coletado', 'em_rota', 'entregue', 'falhou'];

export const pedidos$ = timer(0, 2000).pipe(
   map(() => {

    if (Math.random() < 0.1) {
      throw new Error('Falha na comunicação com o servidor');
    }

    return {
      pedidoId: 'PED-' + Math.floor(Math.random() * 100),
      status: status[Math.floor(Math.random() * status.length)],
      entregadorId: 'ENT-00' + Math.ceil(Math.random() * 3),
      timestamp: new Date()
    };

  }),

  retry(3),

  catchError(err =>
    of({
      status: 'erro',
      mensagem: err.message
    })
  )

);