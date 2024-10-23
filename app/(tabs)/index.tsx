import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const transactions = [
  { id: '1', description: 'Compra no mercado', amount: '- R$ 150,00', date: '22/10/2024' },
  { id: '2', description: 'Salário', amount: '+ R$ 3.500,00', date: '20/10/2024' },
  { id: '3', description: 'Cinema', amount: '- R$ 45,00', date: '18/10/2024' },
  { id: '4', description: 'Gasolina', amount: '- R$ 200,00', date: '17/10/2024' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        {/* Header com Nome do Usuário e Foto de Perfil */}
        <View style={styles.headerBackground}>

          <View style={styles.header}>
            <Image
              source={{ uri: 'https://via.placeholder.com/60' }} // Substitua pela URL da imagem do perfil
              style={styles.profileImage}
            />
            <ThemedText style={styles.username}>Olá, Matheus!</ThemedText>
          </View>

          {/* Saldo do Usuário */}
          <View style={styles.balanceContainer}>
            <ThemedText style={styles.balanceText}>Saldo disponível</ThemedText>
            <ThemedText style={styles.balanceAmount}>R$ 2.150,00</ThemedText>
          </View>

        </View>
        {/* Últimas Transações */}
        <View style={styles.transactionsContainer}>
          <ThemedText style={styles.sectionTitle}>Últimas transações</ThemedText>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <ThemedText style={styles.transactionDescription}>{item.description}</ThemedText>
                <ThemedText style={styles.transactionAmount}>{item.amount}</ThemedText>
                <ThemedText style={styles.transactionDate}>{item.date}</ThemedText>
              </View>
            )}
          />
        </View>

        {/* Botão Fixado na Parte Inferior */}
        <TouchableOpacity style={styles.fabButton}>
          <ThemedText style={styles.fabButtonText}>Adicionar Transação</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
  headerBackground:{
    backgroundColor:'#4CAF50',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:20
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: 'white'
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceContainer: {
    padding: 20,
    
  },
  balanceText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    lineHeight:32,
    fontWeight: 'bold',
    color: '#fff',
  },
  transactionsContainer: {
    padding:20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  fabButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',

    bottom: 30,
    margin: 'auto',
    width: '80%',
  },
  fabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
