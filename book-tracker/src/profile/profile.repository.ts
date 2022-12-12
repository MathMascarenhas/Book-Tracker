import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IProfile } from './entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: CreateProfileDto): Promise<IProfile> {
    try {
      const createdProfile = await this.prisma.profile.create({
        data: profile,
        include: { bookCollections: true },
      });
      return createdProfile;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'A profile with this username already exists in the database',
      );
    }
  }

  async findAllProfiles(): Promise<IProfile[]> {
    try {
      const allProfiles = await this.prisma.profile.findMany({
        include: { bookCollections: true },
      });
      return allProfiles;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findProfileById(userId: string): Promise<IProfile> {
    try {
      const foundProfile = await this.prisma.profile.findFirstOrThrow({
        where: { id: userId },
        include: { bookCollections: true },
      });
      return foundProfile;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Profile could not be found in the database',
      );
    }
  }

  async updateProfile(profileData: UpdateProfileDto): Promise<IProfile> {
    try {
      const updatedProfile = await this.prisma.profile.update({
        where: { id: profileData.id },
        data: profileData,
        include: { bookCollections: true },
      });
      return updatedProfile;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteProfile(profileId: string): Promise<IProfile> {
    try {
      const deletedProfile = await this.prisma.profile.delete({
        where: { id: profileId },
        include: { bookCollections: true },
      });
      return deletedProfile;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Profile not found in the database',
      );
    }
  }
}
