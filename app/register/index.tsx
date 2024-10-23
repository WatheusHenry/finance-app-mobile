import { Link, Stack, useRouter } from 'expo-router';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AuthService, { RegisterData } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleRegister = async () => {
    const registerData: RegisterData = { nome: name, email, senha: password };
    try {
      const response = await AuthService.register(registerData);
      console.log(response)
      await AsyncStorage.setItem('access_token', response.access_token);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.push('/');
    } catch (error:any) {
      console.error(error);
      Alert.alert(error, 'Erro ao registrar. Verifique os dados inseridos.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Crie sua conta</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.buttonApple}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              if (credential.identityToken) {
                await AsyncStorage.setItem('access_token', credential.identityToken);
                router.push('/');
              } else {
                console.warn('identityToken is null');
              }
            } catch (error: any) {
                console.error(error)
            }
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <ThemedText style={styles.buttonText} type="default">
            Registrar
          </ThemedText>
        </TouchableOpacity>

        <Link href="/login" style={styles.link}>
          <ThemedText type="link">Já tem uma conta? Faça login</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
  },
  buttonApple: {
    width: 200,
    height: 44,
  },
});
