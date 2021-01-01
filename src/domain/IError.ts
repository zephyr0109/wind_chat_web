// 내부에서 에러 발생 시 사용하는 인터페이스
interface IError {
  err: boolean;
  code: string;
  [propName: string]: any;
}

export default IError;
