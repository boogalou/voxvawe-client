import { apiService } from 'shared/services';
import { AxiosResponse } from 'axios';

class DialogService {
  public async getDialogs(): Promise<AxiosResponse> {
    return await apiService.get('/dialogs');
  }
}

const dialogService = new DialogService();
export { dialogService };