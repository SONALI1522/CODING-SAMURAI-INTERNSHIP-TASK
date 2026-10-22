import React, {useState, useRef, useEffect} from "react";
import ChatMessage from "./ChatMessage";
import useReceivedMessage from "../../Hooks/useReceivedMessage";
import useReceiveSocketMessage from "../../Hooks/useReceiveSocketMessage.jsx";
import Loading from "./Loading.jsx";
import UseChat from "../../manageState/useChat";
function ChatMessages(){
  const {messages, loading} = useReceivedMessage();
  const {selectedChat} = UseChat();
  useReceiveSocketMessage()
  const latestMessageRef = useRef()
    useEffect(()=>{
      setTimeout(()=>{
       if(latestMessageRef.current){
        latestMessageRef.current?.scrollIntoView({behavior:"smooth"})
       }
      },100)
    },[messages])
    return (
        <>
        {loading?(<Loading></Loading>
        ):
        (messages.length>0 && 
          messages.map((message) => (
           <div key={message._id}>
             <ChatMessage message={message} />
           </div>
          ))
        )}
        {!loading && messages.length === 0 && (
         <div className="text-center mt-10 p-4">
          <p className="text-black-500">
           Start a conversation with {selectedChat?.username}!
           Send your first message ✨📩
          </p>
         </div>
        )}
        <div ref={latestMessageRef}></div>
        </>
    )
    
}
export default ChatMessages;
