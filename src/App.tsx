import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, ListItem, List, MenuItem, Radio, RadioGroup, Select, TextField, Grid, Typography } from "@mui/material";
import liff from "@line/liff";
import "./App.css";
import { SelectChangeEvent } from '@mui/material/Select';

interface FormState {
  name: string;
  gender: string;
  age: string;
  businessActivity: string;
  businessScale: string;
  numberOfEmployees: string;
  businessStartDate: string;
}

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        setMessage("LIFFの初期化が成功しました。");
      })
      .catch((e: Error) => {
        setMessage("LIFFの初期化が失敗しました。");
        setErrors(errors => [...errors, `${e}`]);
      });
  }, []);

  const [formState, setFormState] = useState<FormState>({
    name: '',
    gender: '',
    age: '',
    businessActivity: '',
    businessScale: '',
    numberOfEmployees: '',
    businessStartDate: ''
  });

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (typeof name === "string" && typeof value === "string") {
      setFormState({
        ...formState,
        [name]: value
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]); // Clear out previous errors

    // Input validation
    let tempErrors: string[] = [];
    if (formState.name === '') {
      tempErrors.push(`氏名を入力してください。`);
    }

    // Add additional validation as needed

    setErrors(tempErrors);

    // Send the form data to LINE bot via LIFF
    if (tempErrors.length === 0 && liff.isLoggedIn()) {
      try {
        await liff.sendMessages([{
          type: 'text',
          text: "フォーム初回登録\n" + JSON.stringify(formState)
        }]);
        liff.closeWindow();
      } catch (err) {
        setErrors(errors => [...errors, 'フォームの送信中に問題が発生しました。もう一度試してください。']);
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* 各フィールドの追加 */}
          <Grid item xs={12}>
            <Typography variant="h6" component="div">氏名</Typography>
            <TextField name="name" onChange={handleTextInputChange} required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">性別</Typography>
            <TextField name="gender" onChange={handleTextInputChange} required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">年齢</Typography>
            <TextField name="age" onChange={handleTextInputChange} required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">事業内容</Typography>
            <TextField name="businessActivity" onChange={handleTextInputChange} required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">事業規模 (年商/利益)</Typography>
            <TextField name="businessScale" onChange={handleTextInputChange} required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">従業員数</Typography>
            <TextField name="numberOfEmployees" onChange={handleTextInputChange} required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">事業開始時期</Typography>
            <TextField name="businessStartDate" onChange={handleTextInputChange} required fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>送信</Button>
          </Grid>
        </Grid>
      </form>

      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      )}
    </Container>
  );
};

export default App;
