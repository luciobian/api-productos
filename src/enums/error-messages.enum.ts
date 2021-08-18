enum EnumErrorMessage {
  IS_DEFINED = 'El campo $property es requerido.',
  IS_STRING = 'El campo $property deber ser de tipo `string`.',
  IS_NUMBER = 'El campo $property deber ser de tipo `number`.',
  IS_POSITIVE = 'El campo $property deber ser un número positivo.',
  PASSWORD_WEAK = 'El campo $property debe tener al menos un número y al menos una letra.',
  PASSWORD_LENGTH = 'El campo $property debe tener una longitud entre $constraint1 y $constraint2 caracteres.'
}

export default EnumErrorMessage;
