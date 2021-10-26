const express = require("express")
const {google} = require("googleapis")
const chat = google.chat('v1');

const app = express();

app.get("/", async (req, res) => {

  /*
   Google Chat Test
  */
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/chat.bot"
  });
  
  // Create client instance for auth
  const client = await auth.getClient();
  google.options({auth: client});

  // 特定のスペースにメッセージを送る
  const res_create = await chat.spaces.messages.create({
    // Required. Space resource name, in the form "spaces/x". Example: spaces/AAAAMpdlehY
    parent: 'spaces/AAAACo9a8Fo',
    // Request body metadata
    requestBody: {
        "text": "テスト",
        "previewText": "こんにちは",
    },
  });
  console.log(res_create.data);

  res.send("hello!!");
})

app.listen(1337, (req, res) =>console.log("running on 1337"));