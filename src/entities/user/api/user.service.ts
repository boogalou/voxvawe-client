import { apiService } from 'shared/services';
import { AxiosResponse } from 'axios';
import { IProfileData } from "entities/user/user";

class UserService {
  public async getCurrentUser(): Promise<AxiosResponse> {
    return await apiService.get('/users');
  }

  public async updateUserImage(payload: { id: string; file: FormData }) {
    return await apiService.post(`/update-avatar/${payload.id}`, payload.file);
  };

  public async updateProfile(payload: {accountId: string, profileData: IProfileData }) {
    return await apiService.post(`/profile/edit/${payload.accountId}`, payload.profileData);
  }
}

const userService = new UserService();
export { userService };
