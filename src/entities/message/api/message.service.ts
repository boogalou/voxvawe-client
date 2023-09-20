import { AxiosResponse } from 'axios';
import { apiService } from 'shared/services';
import { IMessage } from "shared/types";


class MessageService {
  public async getLatestMessages({ chatId, page, limit = 25 }: { chatId: number, page: number, limit?: number }): Promise<AxiosResponse> {
    return await apiService.get<IMessage[]>(
      `/messages/latest?chatId=${ chatId }&limit=${ limit }&page=${ page }`
    );
  }
}

const messagesService = new MessageService();

export { messagesService };