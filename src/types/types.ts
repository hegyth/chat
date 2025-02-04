export type MessageType = {
  idMessage: string;
  textMessage: string;
  sender: string;
  time: string;
};

export interface Message {
  idMessage: string;
  textMessage: string;
  sender: string;
  time: string;
}

export interface Chats {
  [chatId: string]: Message[];
}
