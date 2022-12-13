import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminAuthorization } from 'src/auth/decorators/is-admin.decorator';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    try {
      return await this.profileService.createProfile(createProfileDto);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Get()
  async findAll() {
    try {
      return await this.profileService.findAllProfiles();
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') profileId: string) {
    try {
      return await this.profileService.findOneProfile(profileId);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') profileId: string) {
    try {
      return await this.profileService.removeProfile(profileId);
    } catch (error) {
      HandleException(error);
    }
  }
}
