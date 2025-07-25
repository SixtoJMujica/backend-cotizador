import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cotizador',
  entities: [User],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const users = [
    userRepo.create({ email: 'admin@correo.com', password: adminPassword, role: 'admin' }),
    userRepo.create({ email: 'user@correo.com', password: userPassword, role: 'user' }),
  ];

  await userRepo.save(users);
  console.log('✅ Usuarios insertados correctamente');

  await AppDataSource.destroy();
}

seed().catch((e) => {
  console.error('❌ Error en el seed:', e);
  AppDataSource.destroy();
});
