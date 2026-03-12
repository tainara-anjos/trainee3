import {timer , map  } from 'rxjs';
import {filter } from 'rxjs';

export const gps$ = timer(0, 1000).pipe(
  map(() => ({
    entregadorID: 'ENT-00' + Math.ceil( Math.random() * 3),
    lat: -15.7 + Math.random(),
    lng: -47.8 + Math.random(),
    velocidade: Math.floor(Math.random() * 80),
    timestamp: new Date()
  }))
);

export const velocidadeSuspeita$ = gps$.pipe(
  filter(gps => gps.velocidade > 60)
); 


