import React, { useState, useEffect } from "react";

import "./App.css";

import cloudbase from "@cloudbase/js-sdk/app";
import "@cloudbase/js-sdk/auth";
import "@cloudbase/js-sdk/database";
import "@cloudbase/js-sdk/realtime";

import MessageList from "./components/MessageList";
import Loading from "./components/Loading";
import InputBox from './components/InputBox'

const app = cloudbase.init({
  env: "**your-env-id**",
});
const auth = app.auth({ persistence: "local" });
const db = app.database();

function App() {
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
    <div className="App">
      <Loading show={loading} />
      <MessageList list={list} />
      <InputBox text={text} uid={uid} setText={setText} sendMessage={sendMessage} />
    </div>
  );
}

export default App;
