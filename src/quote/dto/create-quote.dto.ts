import {
    IsString,
    IsInt,
    Min,
    Max,
    IsIn,
  } from 'class-validator';
  
  export class CreateQuoteDto {
    @IsString()
    marca: string;
  
    @IsString()
    modelo: string;
  
    @IsInt()
    @Min(1990)
    @Max(new Date().getFullYear())
    anio: number;
  
    @IsIn(['personal', 'trabajo', 'carga'])
    tipoUso: string;
  
    @IsInt()
    @Min(18)
    @Max(100)
    edadConductor: number;
  }
  