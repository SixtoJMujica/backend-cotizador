import { DataSource } from 'typeorm';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cotizador',
  entities: [Vehicle],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();
  const vehicleRepo = AppDataSource.getRepository(Vehicle);

  const vehicles = [
    { marca: 'Toyota', modelo: 'Corolla', anio: 2020 },
    { marca: 'Toyota', modelo: 'Hilux', anio: 2022 },
    { marca: 'Toyota', modelo: 'Yaris', anio: 2019 },
    { marca: 'Hyundai', modelo: 'Elantra', anio: 2021 },
    { marca: 'Hyundai', modelo: 'Tucson', anio: 2018 },
    { marca: 'Hyundai', modelo: 'Accent', anio: 2017 },
    { marca: 'Kia', modelo: 'Rio', anio: 2020 },
    { marca: 'Kia', modelo: 'Sportage', anio: 2019 },
    { marca: 'Kia', modelo: 'Cerato', anio: 2021 },
    { marca: 'Nissan', modelo: 'Sentra', anio: 2020 },
    { marca: 'Nissan', modelo: 'Versa', anio: 2018 },
    { marca: 'Nissan', modelo: 'X-Trail', anio: 2017 },
    { marca: 'Chevrolet', modelo: 'Spark', anio: 2019 },
    { marca: 'Chevrolet', modelo: 'Onix', anio: 2020 },
    { marca: 'Chevrolet', modelo: 'Tracker', anio: 2021 },
    { marca: 'Ford', modelo: 'Fiesta', anio: 2017 },
    { marca: 'Ford', modelo: 'Focus', anio: 2018 },
    { marca: 'Ford', modelo: 'Ranger', anio: 2020 },
    { marca: 'Suzuki', modelo: 'Swift', anio: 2019 },
    { marca: 'Suzuki', modelo: 'Vitara', anio: 2021 },
  ];

  const data = vehicles.map((v) => vehicleRepo.create(v));
  await vehicleRepo.save(data);

  console.log('✅ 20 vehículos insertados correctamente');
  await AppDataSource.destroy();
}

seed().catch((e) => {
  console.error('❌ Error en el seed de vehículos:', e);
  AppDataSource.destroy();
});
