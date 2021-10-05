import React, { useEffect, useRef, useState, RefObject} from 'react'
import { View, Text, Button, TextInput, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'

interface TodoItemProps {
	title: string
	index: number
	onSubmit: (index: number, value: string) => void
	onRemove: (index: number) => void
	isEven?: boolean
}

const LINEHEIGHT = '21px'
// TODO: add return type
// TODO: save on focus lose everywhere
const TodoItem = ({title, index, onSubmit, onRemove, isEven}: TodoItemProps) => {
  const [itemTitle, setItemTitle] = useState(title)
  const [editMode, setEditMode] = useState(false)
  const inputRef: RefObject<TextInput> = useRef(null)

  useEffect(() => {
    if(editMode) {
      return inputRef.current?.focus()
    }
  }, [editMode])

  return (
    <ItemContainer>
      <ItemControl>
        {
          editMode
            ?
            <Button
              onPress={() => {
                setEditMode(false)
                onSubmit(index, itemTitle)
              }}
              title="✓"
              color="#841584"
              accessibilityLabel="Save current title"
            />
            :
            <Button
              onPress={() => setEditMode(true)}
              title="E"
              color="#841584"
              accessibilityLabel="Edit the title"
            />
        }
      </ItemControl>

      <InputContainer>
        {
          editMode
            ?
            (
              <Input
                ref={inputRef}
                value={itemTitle}
                defaultValue={itemTitle}
                placeholderTextColor='gray'
                multiline
                editable
                blurOnSubmit
                maxLength={40}
                onSubmitEditing={() => {
                  setEditMode(false)
                  onSubmit(index, itemTitle)
                }}
                onChangeText={setItemTitle}
                onBlur={() => {
                  setEditMode(false)
                  onSubmit(index, itemTitle)
                }}
                placeholder={'Enter title...'}
              />
            )
            : (
              <TouchableWithoutFeedback onPress={() => setEditMode(true)}>
                <Title onPress={() => setEditMode(false)}>{itemTitle}</Title>
              </TouchableWithoutFeedback>
            )
        }
      </InputContainer>
      <ItemControl>
        <Button
          onPress={() => onRemove(index)}
          title="R"
          color="#841584"
          accessibilityLabel="Remove item"
        />
      </ItemControl>
    </ItemContainer>
  )
}

const ItemContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center ',
  alignItems: 'center',
  marginVertical: 20,
})

const InputContainer = styled(View)({
  paddingHorizontal: 10,
  width: 200,
  marginHorizontal: 10,
  borderBottomWidth: 1
})

const Input = styled(TextInput)({
  lineHeight: LINEHEIGHT,
  fontSize: 16,
  padding: 0,
  margin: 0,

})

const ItemControl = styled(View)({
  width: 30,
  height: 30,
})

const Title = styled(Text)({
  lineHeight: LINEHEIGHT,
  fontSize: 16,
})

export default TodoItem