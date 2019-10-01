import React, { useState, useEffect } from 'react';
import './App.css';
import * as cloudbase from 'tcb-js-sdk'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography';

import SendIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';

const app = cloudbase.init({
  env: 'starkwang-e850e3'
})

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function App() {
  const classes = useStyles();
  const [list, setList] = useState([{
    text: 'loading....'
  }])
  const [text, setText] = useState('')
  const [uid, setUid] = useState(null)
  useEffect(() => {
    console.log('link to cloudbase')
    async function init() {
      const { data: { ticket, uid } } = await axios.get('http://service-m1w79cyz-1257776809.ap-shanghai.apigateway.myqcloud.com/release/')
      console.log(ticket)
      await app.auth().signInWithTicket(ticket)

      setUid(uid)
      const db = app.database()
      await db.collection('test').where({}).watch({
        onChange(snapshot) {
          console.log('snapshot', snapshot)
          setList(snapshot.docs)
        },
        onError: console.log
      })

      await db.startTransaction()
    }
    init()
  }, []);

  async function sendMessage() {
    const db = app.database()
    await db.collection('test').add({
      timestamp: new Date().getTime(),
      text,
      uid
    })
    setText('')
  }
  return (
    <div className="App" style={{
      width: '100%'
    }}>
      <List>
        {
          list.map(item => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <AccountCircle />
                </ListItemAvatar>
                <ListItemText
                  primary={item.text}
                  secondary={
                    <React.Fragment>
                      {item.uid || '匿名用户'}
                      {item.timestamp ? new Date(item.timestamp).toUTCString() : ''}
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
          })
        }
      </List>
      <Paper className={classes.root}>
        <AccountCircle />
        <InputBase
          className={classes.input}
          placeholder="说点什么吧^_^"
          inputProps={{
            'aria-label': '说点什么吧^_^'
          }}
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
