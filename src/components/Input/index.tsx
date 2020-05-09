import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icons } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface inputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', error, fieldName } = useField(name);
  const inputValueRef = useRef<inputValueReference>({ value: defaultValue });

  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleInpuBlur = useCallback(() => {
    setIsFocus(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocus={isFocus} isErrored={!!error}>
      {!!icon && (
        <Icons
          name={icon}
          color={isFocus || isFilled ? '#FF9000' : '#666360'}
          size={20}
        />
      )}
      <TextInput
        {...rest}
        ref={inputElementRef}
        keyboardAppearance="dark"
        autoCapitalize="none"
        onBlur={handleInpuBlur}
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        onChangeText={value => (inputValueRef.current.value = value)}
      />
    </Container>
  );
};

export default forwardRef(Input);
