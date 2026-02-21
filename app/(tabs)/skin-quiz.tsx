
import React from "react";
import { View, Text, StyleSheet } from "react-native";


   const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up available space
    justifyContent: 'center', // Centers children vertically in a column layout
    alignItems: 'center', // Centers children horizontally in a column layout
    // Optional: add a background color to visualize the container boundaries
    backgroundColor: 'lightpink', 
  },
});

const styles1 = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    color: 'white', // You can use names, hex codes ('#e3e3eb'), or rgb
  },
});


const App = () => {
  return (
    <View style={styles.container}>
      <Text style= {styles1.headerText}> Get To Know Your Skin</Text>
    
    </View>
  );
};


export default App;