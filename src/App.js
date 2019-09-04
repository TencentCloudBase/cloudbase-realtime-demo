import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import AccountCircle from "@material-ui/icons/AccountCircle";

import "./App.css";
import * as cloudbase from "tcb-js-sdk";

import MessageList from "./components/MessageList";
import Loading from "./components/Loading";

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

const app = cloudbase.init({
  env: "**your-env-id**",
});
const auth = app.auth({ persistence: "local" });
const db = app.database();

function App() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初始化流程
  useEffect(() => {
    async function init() {
      // 使用匿名登录
      await auth.anonymousAuthProvider().signIn();

      // 使用 refreshToken 的前 6 位作为 uid
      setUid(auth.hasLoginState().credential.refreshToken.slice(0, 6));

      // 建立实时数据库连接
      await db
        .collection("messages")
        .where({})
        .watch({
          onChange(snapshot) {
            setList(snapshot.docs);
            setLoading(false);
          },
          onError(err) {
            console.log(err);
          },
        });
    }
    init();
  }, []);

  // 发送消息
  async function sendMessage() {
    const message = {
      timestamp: new Date().getTime(),
      text,
      uid,
    };
    await db.collection("messages").add(message);
    // 清空输入栏
    setText("");
  }

  return (
    <div
      className="App"
      style={{
        width: "100%",
      }}
    >
      <Loading show={loading} />
      <MessageList list={list} />
      <Paper className={classes.root}>
        {uid ? <Avatar>{uid.slice(0, 2)}</Avatar> : <AccountCircle />}
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
    </div>
  );
}

export default App;
