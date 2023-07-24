import { apiService } from 'shared/services';
import { AxiosResponse } from 'axios';

class DialogService {
  public async getDialogs(): Promise<AxiosResponse> {
    return await apiService.get('/dialogs');
  }

  public async uploadAttachments(file: FormData): Promise<AxiosResponse> {
    return await apiService.post('/upload/attachments', file);
  }
}

const dialogService = new DialogService();
export { dialogService };
