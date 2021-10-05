import React, { useEffect, useRef, useState, RefObject} from 'react'
import { View, Text, Button, TextInput, TouchableWithoutFeedback } from 'react-native'

interface TodoItemProps {
	title: string
	index: number
	onSubmit: (index: number, value: string) => void
	onRemove: (index: number) => void
	isEven?: boolean
}

const ITEM_HEIGHT = 35

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
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <View style={{width: 60}}>
        {
          editMode
            ?
            <Button
              onPress={() => {
                setEditMode(false)
                onSubmit(index, itemTitle)
              }}
              title="Save"
              color="#841584"
              accessibilityLabel="Save current title"
            />
            :
            <Button
              onPress={() => setEditMode(true)}
              title="Edit"
              color="#841584"
              accessibilityLabel="Edit the title"
            />
        }
      </View>

      <View style={{paddingHorizontal: 20, width: 180, marginHorizontal: 10, height: ITEM_HEIGHT, borderBottomWidth: 1}}>
        {
          editMode
            ?
            (
              <TextInput
                style={{ height: '100%', fontSize: 16}}
                ref={inputRef}
                value={itemTitle}
                defaultValue={itemTitle}
                placeholderTextColor='black'
                blurOnSubmit
                maxLength={20}
                onSubmitEditing={() => {
                  setEditMode(false)
                  onSubmit(index, itemTitle)
                }}
                onChangeText={setItemTitle}
                onBlur={() => {
                  setEditMode(false)
                  onSubmit(index, itemTitle)
                }}
                placeholder={'Enter title for this note'}
              />
            )
            : (
              <TouchableWithoutFeedback onPress={() => setEditMode(true)}>
                <Text style={{lineHeight: ITEM_HEIGHT, fontSize: 16}} onPress={() => setEditMode(false)}>{itemTitle}</Text>
              </TouchableWithoutFeedback>
            )
        }
      </View>
      <Button
        onPress={() => onRemove(index)}
        title="Remove"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

export default TodoItem