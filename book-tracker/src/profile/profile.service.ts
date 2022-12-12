import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IProfile } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<IProfile> {
    return await this.profileRepository.createProfile(createProfileDto);
  }

  async findAllProfiles(): Promise<IProfile[]> {
    return await this.profileRepository.findAllProfiles();
  }

  async findOneProfile(profileId: string): Promise<IProfile> {
    return await this.profileRepository.findProfileById(profileId);
  }

  async updateProfile(updateProfileDto: UpdateProfileDto): Promise<IProfile> {
    return await this.profileRepository.updateProfile(updateProfileDto);
  }

  async removeProfile(profileId: string): Promise<string> {
    await this.profileRepository.deleteProfile(profileId);
    return 'Profile deleted successufully';
  }
}
