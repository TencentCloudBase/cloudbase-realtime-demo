import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
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

export default ({ uid, text, setText, sendMessage }) => {
    const classes = useStyles();
    return <Paper className={classes.root}>
        {
            uid ?
            <Avatar className='inputbox-avatar'>
                {uid.slice(0, 2)}
            </Avatar> :
            <AccountCircle className='inputbox-avatar'/>
        }
        <InputBase
            className={classes.input}
            placeholder={uid ? "说点什么吧^_^" : "登录中……"}
            value={text}
            disabled={!uid}
            onChange={(event) => setText(event.target.value)}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
            className={classes.iconButton}
            aria-label="发送"
            onClick={() => sendMessage()}
        >
            <SendIcon />
        </IconButton>
    </Paper>
}