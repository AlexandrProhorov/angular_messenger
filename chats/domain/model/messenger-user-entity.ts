export interface UserEntity {
  id: number;
  name: string;
  isAdmin: boolean;
  chats: number[];
  jobPosition: string;
  department: string;
}
