import { AxiosResponse } from 'axios';
import { apiService } from 'shared/services';

class SearchService {
  public async search(searchTerm: string): Promise<AxiosResponse<string>> {
    try {
      return await apiService.get('/search', {
        params: {
          searchTerm: searchTerm,
        }
      });
    } catch (err) {
      console.log(err);
      throw Error;
    }
  }
}

const searchService = new SearchService();

export { searchService };
