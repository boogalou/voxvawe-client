import { apiService } from 'shared/services';
import { AxiosResponse } from 'axios';
import { INewMember } from "components/right-sidebar/details/details";


class DialogService {
  public async getDialogs(): Promise<AxiosResponse> {
    return await apiService.get('/dialogs');
  }

  public async createGroup(groupData: unknown): Promise<AxiosResponse> {
    return await apiService.post('/dialogs/create', groupData);
  }

  public async addNewMember(data: INewMember[]) {
    data.map(item => delete item.username);
    return await apiService.post('/dialogs/add-member', data)
  }


  public async uploadAttachments(file: FormData): Promise<AxiosResponse> {
    for (const entry of file.entries()) {
      console.log(entry);
    }
    return await apiService.post('/upload/image', file);
  }
}

const dialogService = new DialogService();
export { dialogService };
