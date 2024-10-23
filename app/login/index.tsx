import React, { useState } from 'react';
import { Link, Stack, useRouter } from 'expo-router'; // Importando useRouter
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AuthService, { LoginData } from '@/services/authService';

export default function LoginScreen() {
  const router = useRouter(); 

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    const loginData: LoginData = { email, senha };

    try {
      const response = await AuthService.login(loginData);
      await AsyncStorage.setItem('access_token', response.access_token);
      router.push('/');

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  return (
    <>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <ThemedView style={styles.container}>
        <ThemedText type="title">Bem-vindo de volta!</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <ThemedText type="default">Entrar</ThemedText>
        </TouchableOpacity>
        <Link href="/register" style={styles.link}>
          <ThemedText type="link">Criar uma conta</ThemedText>
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
    backgroundColor: '#f8f8f8',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
