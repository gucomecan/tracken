import React, { useState } from 'react'
import { SafeAreaView, View, Text, FlatList, Button } from 'react-native'
import TodoItem from './TodoItem'
import { getId } from '../utils'
import styled from 'styled-components'

const TITLE_INITIAL_VALUE = 'Name...'

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

  const removeAll = () => setTitles([])

  return (
    <Wrapper>
      <Controls>
        <Button
          color='rgb(87, 179, 97)'
          title='+ Add '
          onPress={addTitle}
        />
        <Button
          color='rgb(204, 107, 100)'
          title='Remove all'
          onPress={removeAll}
        />
      </Controls>
      <>
        {
          titles.length
            ? (
              <FlatList
                data={titles}
                keyExtractor={() => getId()}
                renderItem={item => <TodoItem title={item.item} index={item.index} onSubmit={changeTitle} onRemove={removeTitle}/>}
              />
            )
            : <Text>Looks like you don&apos;t have anything to do!</Text>
        }
      </>

    </Wrapper>
  )
}

const Wrapper = styled(SafeAreaView)({
  paddingHorizontal: 30,
  flex: 1,
  width: '100%',
  borderWidth: 1,
  backgroundColor: 'pink'
})

const Controls = styled(View)({
  width: '80%',
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 30
})

export default TodoList