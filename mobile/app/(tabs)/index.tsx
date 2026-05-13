import { useState, useEffect } from 'react';
import { StyleSheet, Alert, Button, View, FlatList, Text } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {

  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {

    try {

      const response = await fetch("http://192.168.68.56:3000/todos");

      const json = await response.json();

      setDatos(json);

    } catch (error) {

      console.log(error);

      Alert.alert("Error", "No se pudieron obtener los datos");
    }
  };

  const enviarDatos = async () => {

    try {

      const response = await fetch("http://192.168.68.56:3000/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: "Hola desde Expo"
        }),
      });

      if (response.status === 201) {

        Alert.alert("Éxito", "Datos guardados correctamente");

        await obtenerDatos();

      } else {

        Alert.alert("Error", "No se pudo guardar");
      }

    } catch (error) {

      Alert.alert("Error", "Error de conexión con el servidor");

      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (

    <View style={{ flex: 1, marginTop: 50, padding: 10 }}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Mi App</ThemedText>
        <HelloWave />
      </ThemedView>

      <View style={{ marginVertical: 20 }}>
        <Button
          title="Enviar datos al servidor"
          onPress={enviarDatos}
        />
      </View>

      <FlatList
        data={datos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <Text
            style={{
              fontSize: 18,
              margin: 10,
              color: "white"
            }}
          >
            {item.todo}
          </Text>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});