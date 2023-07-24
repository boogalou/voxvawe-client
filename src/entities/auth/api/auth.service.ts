import axios, { AxiosResponse } from 'axios';
import { apiService } from 'shared/services/api/api-service';
import { IAuthRequestData, IAuthResponseData } from 'shared/types/auth.interface';

class AuthService {
  public async signup(data: IAuthRequestData): Promise<AxiosResponse<IAuthResponseData>> {
    return await apiService.post('/register', data);
  }

  public async signin(data: IAuthRequestData): Promise<AxiosResponse<IAuthResponseData>> {
    return await apiService.post<IAuthResponseData>('/login', data);
  }

  public async checkAuth() {
    return await axios.get<IAuthResponseData>(`http://localhost:3000/api/refresh`, {
      withCredentials: true,
    });
  }

  public async logout(): Promise<void> {
    return apiService.post(`/logout`);
  }
}

const authService = new AuthService();

export { authService };