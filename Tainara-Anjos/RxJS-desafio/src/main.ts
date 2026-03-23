import { gps$ } from './streams/gps.stream';
import { pedidos$ } from './streams/pedidos.stream';
import { alertas$ } from './streams/alertas.stream';
import { filter, scan, withLatestFrom } from 'rxjs/operators';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';

const destroy$ = new Subject<void>();


export const velocidadeSuspeita$ = gps$.pipe(
  filter(gps => gps.velocidade > 60)
);

export const statusCount$ = pedidos$.pipe(
  scan((acc: any, pedido: any) => {
    acc[pedido.status] = (acc[pedido.status] || 0) + 1;
    return acc;
  }, {})
);

export const alertasCriticos$ = alertas$.pipe(
  filter(alertas =>
    alertas.severidade === 'ALTA' ||
    alertas.severidade === 'media'
  )
);

export const gpsEnriquecido$ = gps$.pipe(
  map(gps => ({
    ...gps,
    regiao: gps.lat > 0 ? 'Norte' : 'Sul'
  }))
);

export const painelEntregador$ = combineLatest([gps$, pedidos$]).pipe(
  map(([gps, pedido]) => ({
    entregadorID: gps.entregadorID,
    ultimaLocalizacao: {
      lat: gps.lat,
      lng: gps.lng,
      velocidade: gps.velocidade
    },
    ultimoStatus: pedido.status,
    ultimaAtualizacao: new Date()
  }))
);

export const emergencia$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta'),
  withLatestFrom(gps$),
  filter(([alerta, gps]) =>
    alerta.entregadorId === gps.entregadorID &&
    gps.velocidade > 60
  ),
  map(([alerta, gps]) => ({
    entregadorID: gps.entregadorID,
    velocidade: gps.velocidade,
    tipoAlerta: alerta.mensagem,
    timestamp: new Date()
  }))
);

let gpsCount = 0;
let pedidosCount = 0;
let alertasCount = 0;

gps$
  .pipe(takeUntil(destroy$))
  .subscribe(data => {
    gpsCount++;
    console.log('GPS:', data);
  });


pedidos$
  .pipe(takeUntil(destroy$))
  .subscribe(data => {
    pedidosCount++;
    console.log('PEDIDO:', data);
  });


alertas$
  .pipe(takeUntil(destroy$))
  .subscribe(data => {
    alertasCount++;
    console.log('ALERTA:', data);
  });


velocidadeSuspeita$
  .pipe(takeUntil(destroy$))
  .subscribe(data =>
    console.log('VELOCIDADE SUSPEITA:', data)
  );

statusCount$
  .pipe(takeUntil(destroy$))
  .subscribe(data =>
    console.log('STATUS COUNT:', data)
  );

alertasCriticos$
  .pipe(takeUntil(destroy$))
  .subscribe(data =>
    console.log('ALERTA CRÍTICO:', data)
  );

gpsEnriquecido$
  .pipe(takeUntil(destroy$))
  .subscribe(data =>
    console.log('GPS ENRIQUECIDO:', data)
  );

painelEntregador$
  .pipe(takeUntil(destroy$))
  .subscribe(data =>
    console.log('PAINEL ENTREGADOR:', data)
  );

emergencia$
  .pipe(takeUntil(destroy$))
  .subscribe(data =>
    console.log('EMERGENCIA:', data)
  );


setTimeout(() => {
  console.log('\n===== RESUMO =====');

  console.log('GPS eventos:', gpsCount);
  console.log('Pedidos eventos:', pedidosCount);
  console.log('Alertas eventos:', alertasCount);

  destroy$.next();
  destroy$.complete();
}, 30000);
