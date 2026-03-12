import { tap } from 'rxjs';

    export function logComTimestamp(label?: string) : any{
      return tap ((valor: any) => {
        const agora = new Date()

        const horario = 
        agora.toTimeString().split('')[0] + '.'+
        agora.getMilliseconds(). toString().padStart(3, '0')

        if (label) {
          console.log(`[${label}] ${horario} `, valor)
        }else{
          console.log(`${horario}`, valor)
        }
    })
    }