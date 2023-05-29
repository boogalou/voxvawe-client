import { apiService } from 'shared/services';
import { AxiosResponse } from 'axios';

class UserService {
  public async getCurrentUser(): Promise<AxiosResponse> {
    return await apiService.get('/users');
  }
}

const userService = new UserService();
export { userService };
