import { AxiosResponse } from 'axios';
import { apiService } from 'shared/services';

class SearchService {
  public async search(searchTerm: string): Promise<AxiosResponse<string>> {
    try {
      return await apiService.get('/search', {
        params: {
          searchTerm: searchTerm,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error;
    }
  }

  public async addContactRequeset(accountId: string): Promise<AxiosResponse> {
    try {
      return await apiService.patch('/add-contact', { accountId });
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }

  public async getContacts(): Promise<AxiosResponse> {
    try {
      return await apiService.get('/contacts');
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }
}



const searchService = new SearchService();

export { searchService };
