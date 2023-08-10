export class PatternConstants {
  static readonly PATTERN_EMAIL = '^[a-zA-Z0-9-.-_]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]{2,6}$';
  static readonly PATTERN_NUMBER_CELL = '^3[0,1,2,3,5][0-9][0,1,2,3,4,5,6,7,8,9][0-9][0-9][0-9][0-9][0-9][0-9]*$';
  static readonly PATTERN_NUMBER_CELL_TEL = '^[3,6][0,1,2,3,5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]*$';
  static readonly PATTERN_ONLY_NUMBER = '^[0-9.]*$';
  static readonly PATTERN_ONLY_NUMBER_WITHOUT_POINT = '^[1-9]{1}[0-9]*$';
  static readonly PATTERN_PLATE_CAR = '[A-Z]{3}[0-9]{3}';
  static readonly PATTERN_PLATE_MOTO = '[A-Z]{3}[0-9]{2}[A-Z]?';
  static readonly PATTERN_PASSWORD = '^(?=.*[!@#$%^&*-/_;.,}{+?¿¡!"()=]+)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$';
  static readonly PATTERN_PLATE_CODIDO_UNICO = '[A-Z]{2,3}[0-9]{2}';
  static readonly PATTERN_DATE = '(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])-(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])-(?:30))|(?:(?:0\[13578\]|1\[02\])-31))';
  static readonly PATTERN_TEXT = '[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+';
  static readonly PATTERN_TEXT_NUMB = '[A-Za-z0-9]+';
}
