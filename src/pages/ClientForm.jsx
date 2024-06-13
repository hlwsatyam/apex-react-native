import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
const ClientForm = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        <Animatable.View animation="fadeInDown" style={{marginBottom: 20}}>
          <TextInput placeholder="Username" style={styles.input} />
        </Animatable.View>
        <Animatable.View
          animation="fadeInDown"
          style={{marginBottom: 20, delay: 100}}>
          <TextInput placeholder="Aadhar Number" style={styles.input} />
        </Animatable.View>
        <Animatable.View
          animation="fadeInDown"
          style={{marginBottom: 20, delay: 200}}>
          <TextInput placeholder="PAN Number" style={styles.input} />
        </Animatable.View>

        <Animatable.View
          animation="fadeInDown"
          style={{marginBottom: 20, delay: 300}}>
          <TextInput placeholder="Designation" style={styles.input} />
        </Animatable.View>

        <Animatable.View
          animation="fadeInDown"
          style={{marginBottom: 20, delay: 400}}>
          <TextInput
            placeholder="Amount"
            style={styles.input}
            keyboardType="numeric"
          />
        </Animatable.View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: 'white', fontSize: 16}}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = {
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 300,
  },
};

export default ClientForm;
