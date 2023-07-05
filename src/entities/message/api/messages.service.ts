import { AxiosResponse } from 'axios';
import { apiService } from 'shared/services';
import { IMessage } from "@/src/shared";

class MessagesService {
  public async getLatestMessages(chatId: number): Promise<AxiosResponse> {
    const count = 10;
    return await apiService.get<IMessage[]>(`/messages/latest?chatId=${ chatId }&count=${count}`);
  }
}

const messagesService = new MessagesService();

export { messagesService };