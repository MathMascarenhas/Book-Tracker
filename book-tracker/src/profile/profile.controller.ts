import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    try {
      return await this.profileService.createProfile(createProfileDto);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.profileService.findAllProfiles();
    } catch (error) {
      HandleException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') profileId: string) {
    try {
      return await this.profileService.findOneProfile(profileId);
    } catch (error) {
      HandleException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') profileId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      const profileUpdate = { ...updateProfileDto, id: profileId };

      return await this.profileService.updateProfile(profileUpdate);
    } catch (error) {
      HandleException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') profileId: string) {
    try {
      return await this.profileService.removeProfile(profileId);
    } catch (error) {
      HandleException(error);
    }
  }
}
