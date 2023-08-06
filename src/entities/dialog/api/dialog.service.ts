import { apiService } from 'shared/services';
import { AxiosResponse } from 'axios';

class DialogService {
  public async getDialogs(): Promise<AxiosResponse> {
    return await apiService.get('/dialogs');
  };
  
  public async createGroup(groupData: unknown): Promise<AxiosResponse> {
    console.log('apiService groupData: ', groupData);
    return await apiService.post('/dialogs', groupData);
  }

  public async uploadAttachments(file: FormData): Promise<AxiosResponse> {
    return await apiService.post('/upload/image', file);
  };
}

const dialogService = new DialogService();
export { dialogService };
