import { Observable } from 'rxjs';
import { MessageState } from '../../messages/domain/model/message-state';
import { sideBarState } from '../data/model/sidebar-state';

export abstract class MessengerSideBarService {
  abstract getMenuData(): Observable<sideBarState>;
  abstract fetchMenuData(): void;
  abstract openMenu(): void;
  abstract closeMenu(): void;
  abstract openConversation(message: MessageState): void;
}
