import {apiService} from "../../../shared/services/api-service";
import {AxiosResponse} from "axios";


class SearchService {
  public async search(searchTerm: string): Promise<AxiosResponse> {
    return await apiService.get('/users', {
      params: {
        search: searchTerm,
      }
    })
  }
}

const searchService = new SearchService();

export { searchService };