import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { ProfileRepository } from './profile.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
