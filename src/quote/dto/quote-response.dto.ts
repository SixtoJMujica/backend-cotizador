export class QuoteResponseDto {
  precioBase: number;

  ajustes: {
    edad: {
      factor: number;
      porcentaje: string;
    };
    uso: {
      factor: number;
      porcentaje: string;
    };
  };

  primaTotal: number;
}
