import { timer, switchMap, map} from 'rxjs';

const tipos = ['atraso', 'veiculo_parado', 'rota_desviada'];
const severidades = ['baixa', 'media', 'alta'];

export const alertas$ = timer(0).pipe(
  switchMap(() => 
    timer(Math.random() * 5000 + 3000).pipe(
      map(() => ({
        tipo: tipos[Math.floor(Math.random() * tipos.length)],
        entregadorId:'ENT-00' + Math.ceil(Math.random() * 3),
        mensagem:'Alerta gerado automaticamente',
        severidade: severidades[Math.floor(Math.random() * severidades.length)]
      }) )
    )
)
);