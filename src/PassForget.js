import * as React from "react";
import { useState } from 'react';
import axios from 'axios';
import "react-router";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const PassForget = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    setName(event.currentTarget.value);
  };
  const handlePassChange = (event) => {
    setPass(event.currentTarget.value);
  };


  const handleLogin = async(event) => {
    event.preventDefault();
    try {
      const url='http://127.0.0.1:8000/users/'+ name +'/reset_password';
      const response = await axios.post(url);
      const { accessToken } = response.data;
      // アクセストークンを保存する (CookieやlocalStorage、Redux storeなど)
      // ...

      // 認証が必要なページへリダイレクトする
      window.location.href = '/profile';
    } catch (error) {
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    }
  };


  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          パスワードを忘れた場合
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt:1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="登録したユーザーネーム"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleNameChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="新しいパスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={handlePassChange}
          />

          <Button
            margin="normal"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt:3, mb:2 }}
          >
            進む
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PassForget;