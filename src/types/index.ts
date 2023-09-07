type BirthItem = {
  id: string;
  name: string;
  birthType: 'day' | 'lunar';
  /** 公历生日 */
  birthDay: number;
  /** 农历生日 */
  birthLunar: number;
  remark?: string;
};

type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>>;
