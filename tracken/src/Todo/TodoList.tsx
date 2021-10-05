import React, { useState } from 'react'
import { SafeAreaView, View, Text, FlatList, Button } from 'react-native'
import TodoItem from './TodoItem'
import { getId } from '../utils'

const TITLE_INITIAL_VALUE = 'Base title'

const TodoList = () => {
  const [titles, setTitles] = useState<string[]>([])

  const changeTitle = (index: number, title: string) => {
    setTitles(prevTitles => {
      prevTitles[index] = title
      return prevTitles
    })
  }

  const addTitle = () => {
    setTitles(prevs => [TITLE_INITIAL_VALUE, ...prevs])
  }

  const removeTitle = (index: number) => {
    const newTitles = titles.slice()
    newTitles.splice(index, 1)

    setTitles(newTitles)
  }

  const removeAll = () => {
    setTitles([])
  }

  return (
    <SafeAreaView style={{paddingHorizontal: 30, flex: 1, width: '100%'}}>
      <View style={{
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 30
      }}>
        <Button
          color='rgb(87, 179, 97)'
          title='+ Add '
          onPress={addTitle}
        />
        <Button
          color='rgb(204, 107, 100)'
          title='Remove all'
          onPress={addTitle}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        {
          titles.length
            ? (
              <FlatList
                data={titles}
                keyExtractor={() => getId()}
                renderItem={item => <TodoItem title={item.item} index={item.index} onSubmit={changeTitle} onRemove={removeTitle}/>}
              />
            )
            : (
              <Text>Looks like you don't have anything to do! </Text>
            )
        }
      </View>

    </SafeAreaView >
  )
}

export default TodoList