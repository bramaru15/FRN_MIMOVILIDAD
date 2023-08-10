/*{ name: 'Cédula de ciudadanía', code: '1' },
      { name: 'Cédula de extranjería', code: '3' },
      { name: 'Pasaporte', code: '4' },
      { name: 'Registro Civil de Nacimiento', code: '5' },
      { name: 'NUIP', code: '7' },
      { name: 'Tarjeta de identidad', code: '6' },
      { name: 'NIT', code: '2' },
      { name: 'Permiso por Protección Temporal', code: '11' },
      { name: 'Funcionario', code: '20' }
*/
export class CatalogoTipoDocumento {
    // TYPES
    static readonly CEDULA_CIUDADANIA = '1';
    static readonly CEDULA_EXTRANJERIA = '3';
    static readonly PASAPORTE = '4';
    static readonly REGISTRO_CIVIL = '5';
    static readonly NUIP = '7';
    static readonly TARJETA_IDENTIDAD = '6';
    static readonly NIT = '2';
    static readonly PERMISO_PROTECCION_TEMPORAL = '11';
    static readonly FUNCIONARIO = '20';

    static readonly CEDULA_CIUDADANIA_TEXT = 'Cédula de ciudadanía';
    static readonly CEDULA_EXTRANJERIA_TEXT = 'Cédula de extranjería';
    static readonly PASAPORTE_TEXT = 'Pasaporte';
    static readonly REGISTRO_CIVIL_TEXT = 'Registro Civil de Nacimiento';
    static readonly NUIP_TEXT = 'NUIP';
    static readonly TARJETA_IDENTIDAD_TEXT = 'Tarjeta de identidad';
    static readonly NIT_TEXT = 'NIT';
    static readonly PERMISO_PROTECCION_TEMPORAL_TEXT = 'Permiso por Protección Temporal';
    static readonly FUNCIONARIO_TEXT = 'Funcionario';
}