import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import LogoImage from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationsErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  NewAcount,
  NewAcountText,
  Icons,
} from './styles';

interface SignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const inputPasswordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const { signin, user } = useAuth();

  console.log(user);

  const handleSubmit = useCallback(async (data: SignInCredentials) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Email deve ser válido'),
        password: Yup.string().required('A senha deve ser preenchida'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('cheando no login');

      const { email, password } = data;
      await signin({ email, password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={LogoImage} />
            <View>
              <Title>Faça seu Logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="email"
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
              />
              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                secureTextEntry
                placeholder="Senha"
                returnKeyType="done"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <NewAcount onPress={() => navigate('SignUp')}>
        <Icons name="log-in" />
        <NewAcountText>Criar Conta</NewAcountText>
      </NewAcount>
    </>
  );
};

export default SignIn;
