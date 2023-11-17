import { User } from "@app/user/decorators/user.decorator";
import { Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ProfileResponseInterface } from "./types/profileResponse.interface";
import { ProfileService } from "./profile.service";

@Controller("profiles")
export class ProfileController {
    @Inject() profileService: ProfileService;

    @Get(':username')
    async getProfile(
        @User('id') currentUserId: number, 
        @Param('username') profileUsername: string
    ): Promise<ProfileResponseInterface> {
          const profile = await this.profileService.getProfile(currentUserId, profileUsername);
          return this.profileService.buildProfileResponse(profile);
    }

    @Post(':username/follow')
    async followProfile(
        @User('id') userId: number, 
        @Param('username') profileUsername: string): Promise<ProfileResponseInterface> {
        const profile = await this.profileService.followProfile(userId, profileUsername);

        return await this.profileService.buildProfileResponse(profile);
    }
}