import { User } from "@app/user/decorators/user.decorator";
import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ProfileResponseInterface } from "./types/profileResponse.interface";
import { ProfileService } from "./profile.service";
import { ProfileType } from "./types/profile.type";

@Controller("profiles")
export class ProfileController {
    @Inject() profileService: ProfileService;

    @Get(':username')
    async getProfile(
        @User('id') currentUserId: number, 
        @Param('username') profileUsername: string): Promise<ProfileResponseInterface> {
          const profile = await this.profileService.getProfile(currentUserId, profileUsername);
          return this.profileService.buildProfileResponse(profile);
    }
}