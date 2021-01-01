import { useState } from 'react';

// input에서 주로 사용하는 custom hook
function useInputValue(default_value) {
  const [value, setValue] = useState(default_value);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return [value, onChange];
}

export default useInputValue;
