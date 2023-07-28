import { AxiosResponse } from 'axios';
import { apiService } from 'shared/services';

class ContactService {
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

  public async addContactRequest(accountId: string): Promise<AxiosResponse> {
     return await apiService.patch('/add-contact', { accountId });
  }

  public async deleteContactRequest(accountId: string): Promise<AxiosResponse> {
    try {
      return await apiService.patch('/delete-contact', { accountId })
    } catch (err) {
      console.error(err)
      throw new Error()
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



const contactService = new ContactService();

export { contactService };
