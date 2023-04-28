import {AxiosResponse} from "axios";
import { apiService } from 'shared/services/api-service';



class SearchService {
  public async search(searchTerm: string): Promise<AxiosResponse> {
    console.log(searchTerm);
    const response = await apiService.get('/search', {
      params: {
        name: searchTerm,
      },
    });
    return response
  }
}

const searchService = new SearchService();

export { searchService };