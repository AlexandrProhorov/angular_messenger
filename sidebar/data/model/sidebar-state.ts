import { sideBarAttachmentsItems } from "../../presentation/state/sidebar-state";
import { ConversationState } from "./conversation-state";

export interface sideBarState {
    isOpen: boolean;
    isConversation: boolean;
    Conversations: ConversationState[] | null;
    actualConversation: ConversationState | null;
    selectedItem: sideBarAttachmentsItems;
}