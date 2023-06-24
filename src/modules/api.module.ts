import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../core/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { AuthGuardian } from '../auth/auth.guardian';
import { ApiController } from '../controllers/api.controller';
import { ApiService } from '../services/api.service';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [ApiController],
  providers: [ApiService, { provide: AuthGuardian, useClass: AuthGuardian }],
})
export class ApiModule {}
