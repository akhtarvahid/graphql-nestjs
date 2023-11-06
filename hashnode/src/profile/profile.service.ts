import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileType } from "./types/profile.type";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { Repository } from "typeorm";
import { ProfileResponseInterface } from "./types/profileResponse.interface";

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}
    
    async getProfile(id: number, profileUsername: string): Promise<ProfileType> {
      const user = await this.userRepository.findOne({
        where: { username: profileUsername }
      })

      if(!user) {
        throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
      }

      return { ...user, following: false };
    }

    buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
        delete profile.email;
        return { profile };
    }
}