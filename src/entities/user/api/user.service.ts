import { apiService } from 'shared/services';

class UserService {
  public async getCurrentUser() {
    return await apiService.get('/users');
  }
}

const userService = new UserService();
export { userService };
