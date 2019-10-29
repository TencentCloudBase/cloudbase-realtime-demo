import React, { useState, useEffect } from 'react';
import './App.css';
import * as cloudbase from 'tcb-js-sdk'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar';

import SendIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MessageList from './components/MessageList'
import Loading from './components/Loading'

import { CloudbaseHooks } from '@cloudbase/react-hooks'

const hooks = new CloudbaseHooks({
  env: 'starkwang-e850e3',
  loginType: 'custom',
  persistence: 'local',
  async ticketCallback() {
    const { data: { ticket } } = await axios.get('http://service-m1w79cyz-1257776809.ap-shanghai.apigateway.myqcloud.com/release/')
    return ticket
  }
})

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
  const { credential } = hooks.useLoginState()
  const { snapshot, connecting } = hooks.useDatabaseWatch('messages')

  const uid = credential ? credential.refreshToken.slice(0, 6) : null
  const list = snapshot ? snapshot.docs : []

  async function sendMessage() {
    const app = cloudbase.init({
      env: 'starkwang-e850e3'
    })
    app.auth()
    const db = app.database()
    const message = {
      timestamp: new Date().getTime(),
      text,
      uid
    }
    await db.collection('messages').add(message)
    setText('')
    window.scroll(0, 99999)
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
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton} aria-label="发送" onClick={() => sendMessage()}>
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default App;
