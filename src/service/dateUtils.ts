// 날짜 형식 데이터를 원하는 형식의 문자열로 변경. 다른 라이브러리가 있을 경우 변경 가능
export function dateFormat(
  formatStr: string,
  date: string | number | Date
): string {
  let dateObj = new Date(date);
  formatStr = checkAndReplace(formatStr, 'yyyy', String(dateObj.getFullYear()));
  formatStr = checkAndReplace(formatStr, 'MM', intToStr(dateObj.getMonth(), 2));
  formatStr = checkAndReplace(formatStr, 'dd', intToStr(dateObj.getDate(), 2));
  formatStr = checkAndReplace(formatStr, 'HH', intToStr(dateObj.getHours(), 2));
  formatStr = checkAndReplace(
    formatStr,
    'mm',
    intToStr(dateObj.getMinutes(), 2)
  );
  formatStr = checkAndReplace(
    formatStr,
    'ss',
    intToStr(dateObj.getSeconds(), 2)
  );
  console.log(dateObj);
  return formatStr;
}

/**
 * 대상 문자열에서 검색한 문자열을 찾아서 변경
 * @param target 대상 문자열
 * @param findStr 찾을 문자열
 * @param value 변경할 문자열
 */
function checkAndReplace(target: string, findStr: string, value: string) {
  if (target.indexOf(findStr) !== -1) {
    target = target.replace(findStr, value);
  }
  return target;
}

/**
 * 숫자의 자리수를 0으로 채운 후 문자열로 리턴
 * @param num 원래의 숫자
 * @param digit 자리수
 */
function intToStr(num: number, digit: number = 1) {
  let checkNum = 1 * digit;
  if (num < checkNum) {
    let zeroCount = digit - String(num).length;
    return new Array(zeroCount).join('0') + num;
  } else {
    return String(num);
  }
}
