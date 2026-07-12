// Manejo de la sesion del usuario en el navegador (localStorage)

const CLAVE = 'usuario'

export function guardarUsuario(usuario) {
  localStorage.setItem(CLAVE, JSON.stringify(usuario))
}

export function obtenerUsuario() {
  const dato = localStorage.getItem(CLAVE)
  return dato ? JSON.parse(dato) : null
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE)
}

export function estaLogueado() {
  return obtenerUsuario() !== null
}

export function rutaPorRol(rol) {
  if (rol === 'PACIENTE') return '/mis-citas'
  if (rol === 'MEDICO') return '/mi-agenda'
  return '/'
}