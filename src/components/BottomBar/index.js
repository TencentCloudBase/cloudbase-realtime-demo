import React, { useState, useRef } from 'react';

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

import {
  useDatabase,
  useLoginState,
  useUpload
} from '../../hooks'

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
export default () => {
    const classes = useStyles();
    const [text, setText] = useState('')
    const { credential } = useLoginState()
    const db = useDatabase()
    const { progressEvent, upload, uploading } = useUpload()
    const inputref = useRef(null);
    const uid = credential ? credential.refreshToken.slice(0, 6) : null
    async function sendMessage() {
        const message = {
            timestamp: new Date().getTime(),
            text,
            uid
        }
        await db.collection('messages').add(message)
        setText('')
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
    }

    function sendImage() {
        inputref.current.click()
    }
    return (
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
                uploading ? <CircularProgress variant="static" value={progressEvent ? progressEvent.loaded / progressEvent.total * 100 : 0} /> : <IconButton
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
    )
}