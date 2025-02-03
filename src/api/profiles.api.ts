import type {UserProfile} from "../types";
import {api} from "./api";

export class ProfilesApi{
  static async getProfile(id: number): Promise<UserProfile> {
    try{
      const {data: profile} = await api.get(`api/profiles/${id}`);

      return profile as UserProfile;
    }catch{
      throw new Error('Ошибка при получении профиля');
    }
  }
}
