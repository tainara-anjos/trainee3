export function gerarEntregadorId() {
  return 'ENT-00' + Math.ceil(Math.random() * 3)
}

export function gerarLatitude() {
  return -15.7 + Math.random()
}

export function gerarLongitude() {
  return -47.8 + Math.random()
}

export function gerarVelocidade() {
  return Math.floor(Math.random() * 80)
}
export function gerarPedidoId() {
  return 'PED-' + Math.floor(Math.random() * 100)
}