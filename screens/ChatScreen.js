import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { useEffect, useState, useCallback } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';




const ChatScreen = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
       setMessages([
        {
            _id:1,
            text: 'Hello developer',
            createdAt: new Date(),
            user:{
                _id: 2,
                name: 'React Native',
                avater: 'https://placeimg.com/140/140/any',
            },
        },

        {
            _id:2,
            text: 'Hello World',
            createdAt: new Date(),
            user:{
                _id: 1,
                name: 'React Native',
                avater: 'https://placeimg.com/140/140/any',
            },
        },
       ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{ 
                    right:{
                        backgroundColor:  '#2e64e5'
                    }
                }}
                textStyle={{ 
                    right: {
                        color: '#fff'
                    }
                }}
            />
        )
    }

    const renderSend = (props) => {
        return(
            <Send {...props}>
                <View>
                <MaterialCommunityIcons style={{marginRight:5, marginBottom:5}} name="send-circle" size={32} color='#2e64e5' />
                </View>
            </Send>
        )
    }

    const scrollToBottomComponent = (props) => {
        return (
            <FontAwesome5 name="angle-double-down" size={22} color="#333" />
        )
    }
  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{ 
        _id:1
     }}

     renderBubble={renderBubble}
     alwaysShowSend
     renderSend={renderSend}
     scrollToBottom
     scrollToBottomComponent={scrollToBottomComponent}
    />
  )
}

export default ChatScreen

const styles = StyleSheet.create({})