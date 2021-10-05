import React from 'react'

import { StyleSheet, Text, View, StatusBar } from 'react-native'

import TodoList from './src/Todo/TodoList'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Simple to do app. Enjoy!</Text>
      <TodoList/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 30 : 30
  },
})

