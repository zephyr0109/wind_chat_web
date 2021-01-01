// 사용자 정보 인터페이스
interface User {
  userid: string;
  // 타 사용자의 정보도 같이 사용할 것으로 password는 공란?
  // TODO 비밀번호 필드를 가지고 있어야 하는지 검토 필요
  password?: string;
  name: string;
  birth_day?: Date;
  authorities?: string;
  locked?: boolean;
  ip?: string;
  creation?: Date;
  last_access?: Date;
}

export default User;
