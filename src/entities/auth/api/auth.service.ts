import axios, {AxiosResponse} from "axios";
import { apiService } from 'shared/services/api-service';
import { IAuthRequestData, IAuthRsponseData } from 'shared/types/auth.interface';




class AuthService {
  public async signup(data: IAuthRequestData): Promise<AxiosResponse<IAuthRsponseData>> {
      return await apiService.post('/register', data);
  }

  public async signin(data: IAuthRequestData): Promise<AxiosResponse<IAuthRsponseData>> {
    return await apiService.post<IAuthRsponseData>('/login', data);
  }

  public async checkAuth() {
    return await axios.get<IAuthRsponseData>(`http://localhost:3000/api/refresh`, { withCredentials: true });
  }

  public async logout(): Promise<void> {
    return apiService.post(`/logout`);
  }
}

const authService = new AuthService()

export { authService }