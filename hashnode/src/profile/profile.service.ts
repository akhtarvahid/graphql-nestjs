import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileType } from "./types/profile.type";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { Repository } from "typeorm";
import { ProfileResponseInterface } from "./types/profileResponse.interface";
import { FollowEntity } from "./follow.entity";

@Injectable()
export class ProfileService {
    constructor(
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
      @InjectRepository(FollowEntity) private readonly followRepository: Repository<FollowEntity>
      ){}
    
    async getProfile(id: number, profileUsername: string): Promise<ProfileType> {
      const user = await this.userRepository.findOne({
        where: { username: profileUsername }
      })

      if(!user) {
        throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
      }

      return { ...user, following: false };
    }
    
    async followProfile(id: number, profileUsername: string): Promise<ProfileType> {
      const user = await this.userRepository.findOne({
        where: { username: profileUsername }
      });

      if(!user) {
        throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
      }

      if(user.id === id){
        throw new HttpException('Follower and Following cant be equal', HttpStatus.BAD_REQUEST);
      }

      const follow = await this.followRepository.findOne({
        where: { 
          followerId: id.toString(), 
          followingId: user.id.toString()
        }
      });

      if(!follow) {
        const followToCreate = new FollowEntity();
        followToCreate.followerId = id.toString();
        followToCreate.followingId = user.id.toString();
        await this.followRepository.save(followToCreate);
      }

      return { ...user, following: true };
    }
    buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
        delete profile.email; // `email` not required to expose in response.
        return { profile };
    }
}