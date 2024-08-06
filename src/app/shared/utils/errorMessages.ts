export function getErrorMessage(error: string): string {
  if (error.includes('required')) {
    return 'Este campo es requerido';
  }

  if (error.includes('unique')) {
    return 'Ya se creo un campo con los mismos datos';
  }

  return 'Error desconocido';
}
