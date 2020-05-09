import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import LogoImage from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationsErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  Icons,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const inputEmaildRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Email deve ser válido'),
        password: Yup.string().min(
          6,
          'A senha deve ter pelo menos 6 caracteres',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);
      Alert.alert('Cadastro realizado com sucesso!!', 'Faça seu Login');
      goBack();
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
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => inputEmaildRef.current?.focus()}
              />
              <Input
                ref={inputEmaildRef}
                name="email"
                keyboardType="email-address"
                autoCorrect={false}
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
                textContentType="newPassword"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => goBack()}>
        <Icons name="arrow-left" />
        <BackToSignInText>Já tenho conta</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
