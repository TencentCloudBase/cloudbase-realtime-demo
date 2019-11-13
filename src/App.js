import React, { useState } from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import SendIcon from '@material-ui/icons/Send';
import Image from '@material-ui/icons/Image';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MessageList from './components/MessageList'
import Loading from './components/Loading'

import {
  useCloudFile,
  useDatabase,
  useDatabaseWatch,
  useLoginState,
  useUpload
} from './hooks'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  input: {
    margin: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function App() {
  const classes = useStyles();
  const [text, setText] = useState('')
  const { credential } = useLoginState()
  const { snapshot, connecting } = useDatabaseWatch('messages')
  const db = useDatabase()
  const { progressEvent, result, upload, uploading } = useUpload()
  const { url } = useCloudFile('cloud://starkwang-e850e3.7374-starkwang-e850e3-1257776809/web-upload')

  const uid = credential ? credential.refreshToken.slice(0, 6) : null
  const list = snapshot ? snapshot.docs : []

  async function sendMessage() {
    const message = {
      timestamp: new Date().getTime(),
      text,
      uid
    }
    await db.collection('messages').add(message)
    setText('')
    window.scroll(0, 99999)
  }
  async function onFileChange(e) {
    const file = e.target.files[0]
    const result = await upload(`realtime-images/${uid}-${new Date().getTime()}`, file)
    const message = {
      timestamp: new Date().getTime(),
      image: result.fileID,
      uid
    }
    await db.collection('messages').add(message)
    window.scroll(0, 99999)
  }

  const inputref = React.createRef();
  function sendImage() {
    inputref.current.click()
  }
  return (
    <div className="App" style={{
      width: '100%'
    }}>
      <Loading show={connecting} />
      <MessageList list={list} />
      <Paper className={classes.root}>
        {
          uid ? <Avatar>{uid.slice(0, 2)}</Avatar> : <AccountCircle />
        }
        <InputBase
          className={classes.input}
          placeholder="说点什么吧^_^"
          value={text}
          onChange={(event) => setText(event.target.value)}
          disabled={!uid}
        />
        <Divider className={classes.divider} orientation="vertical" />
        {
          uploading ? <CircularProgress variant="static" value={progressEvent ? progressEvent.loaded / progressEvent.total * 100 : 0}/> : <IconButton
            className={classes.iconButton}
            aria-label="发送"
            onClick={() => sendImage()}
            disabled={!uid}
          >
            <Image />
          </IconButton>
        }

        <input ref={inputref} type="file" onChange={onFileChange} style={{ display: 'none' }} />
        <IconButton
          className={classes.iconButton}
          aria-label="发送"
          onClick={() => sendMessage()}
          disabled={!uid || text.length === 0}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
export default App;
