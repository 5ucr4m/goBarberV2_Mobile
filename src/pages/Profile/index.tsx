import React, { useCallback, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
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
import ImagePicker from 'react-native-image-picker';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationsErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';

import {
  Container,
  BackButton,
  UserAvatarButton,
  UserAvatar,
  Title,
} from './styles';
import { useAuth } from '../../hooks/Auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { goBack } = useNavigation();

  const [userAvatarUrl, setUserAvatarUrl] = useState(user.avatar_url);

  const formRef = useRef<FormHandles>(null);
  const inputEmaildRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const PasswordInputRef = useRef<TextInput>(null);
  const confirmationPasswordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Email deve ser válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required(),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required(),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), null], 'As senhas não são iguais'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        email,
        old_password,
        password,
        password_confirmation,
      } = data;

      const formData = Object.assign(
        {
          name,
          email,
        },
        old_password
          ? {
              old_password,
              password,
              password_confirmation,
            }
          : {},
      );

      await api.put('/profile', formData);

      updateUser();

      Alert.alert('Perfil Atualizado com sucesso!!');
      goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Ocorreu um erro na atualização do perfil, tente novamente!!',
      );
    }
  }, []);

  const handleBackButton = useCallback(() => {
    goBack();
  }, []);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um Avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Tirar Foto',
        chooseFromLibraryButtonTitle: 'Usar da Galeria',
      },
      response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Algo deu errado!!', response.error);
          return;
        }

        setUserAvatarUrl(response.uri);

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('/users/avatar', data).then(_ => {
          updateUser();
        });
      },
    );
  }, [updateUser, user.id]);

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
            <BackButton onPress={handleBackButton}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: userAvatarUrl }} />
            </UserAvatarButton>
            <View>
              <Title>Meu Perfil</Title>
            </View>
            <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
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
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                secureTextEntry
                placeholder="Senha Atual"
                returnKeyType="next"
                textContentType="newPassword"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => PasswordInputRef.current?.focus()}
              />

              <Input
                ref={PasswordInputRef}
                name="password"
                icon="lock"
                secureTextEntry
                placeholder="Senha Nova"
                returnKeyType="next"
                textContentType="newPassword"
                onSubmitEditing={() =>
                  confirmationPasswordInputRef.current?.focus()
                }
              />

              <Input
                ref={confirmationPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                secureTextEntry
                placeholder="Confirmação de Senha"
                returnKeyType="done"
                textContentType="newPassword"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
