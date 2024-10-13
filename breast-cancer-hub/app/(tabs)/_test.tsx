import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, Pressable } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import { useState } from 'react';

import { saveSetting, getSetting, SettingsMap, SettingKeys } from '../../hooks/useSettings';

import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from 'expo-router';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TestScreen() {
  let settings_key : SettingKeys = "email";
  const [key, onChangeKey] = useState(settings_key);
  const [value, onChangeValue] = useState('Your value here');
  const [setting_value, onChangeSettingValue] = useState('email address');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([
    {label: 'email', value: 'email'},
    {label: 'token', value: 'token'}
  ]);

  return (

    <ThemedView style={styles.bodyContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">A Commission for BreastCancerHub</ThemedText>
      </ThemedView>
      <ThemedView style={styles.popText}>
        <ThemedText type="default">Blurb about the company</ThemedText>
      </ThemedView>
      <ThemedView style={styles.popText}>
        <DropDownPicker
          open={dropdownOpen}
          value={key}
          items={dropdownItems}
          setOpen={setDropdownOpen}
          setValue={onChangeKey}
          setItems={setDropdownItems}
        />
        <TextInput
          style={styles.popText}
          onChangeText={onChangeValue}
          value={value}
        ></TextInput>
        <Button
          title='Save'
          onPress={() => {
            saveSetting(key, value).then( () => {
              onChangeValue(value);
            }
            );
          }
          }/>
        <Button
          title='Get'
          onPress={() => {
            getSetting(key).then( (response) => {
              if (response) {
                onChangeSettingValue(response);
              } else {
                onChangeSettingValue('');
              }
            })
          }}
          />
        <ThemedText>
          { setting_value }
        </ThemedText>
        <ThemedView>
          
          <Link href="/" asChild>
            <Pressable style={styles.button}>
              <Text>home</Text>
              <MaterialIcons name="home" size={24} color="black" />
            </Pressable>
          </Link>
        </ThemedView>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 8,
  },
  bodyContainer: {
    flexDirection: 'column',
    height: '100%',
    margin: 10
  },
  popText: {
    margin: 'auto'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 2
  }
});
