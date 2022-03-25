import React, {useState} from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import './App.css'
import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();

const apiKey = '6vbpnt3sy7bd';
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);


if(authToken){
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('userName'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    token :cookies.get('token'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

function App() {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);



  if(!authToken) return <Auth />
  
  return (
    <div className = 'app__wrapper'>
      <Chat client={client} theme='team large'>
        <ChannelListContainer 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
        />
        <ChannelContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setEditing={isEditing}
          createType={createType}
          setIsEditing={setIsEditing}
        />
      </Chat>
      
    </div>
  );
}

export default App;
