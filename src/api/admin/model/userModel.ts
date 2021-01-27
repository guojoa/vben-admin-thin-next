import { basicPageParams } from './baseModel';

export type userPageParams = Partial<
  basicPageParams & {
    username: string;
    nickname: string;
    id: number;
    mobile: string;
  }
>;
