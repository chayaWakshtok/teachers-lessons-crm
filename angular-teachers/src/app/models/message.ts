import { User } from "./user";

export class Message {
  id!: number;
  message!: string;
  isRead: boolean = false;
  isActive: boolean = true;
  userId!: number;
  type: number = 1;
  user: User | undefined;
  fromUserId!: number;
  fromUser: User | undefined;
  toUserId!: number;
  toUser: User | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined
}
