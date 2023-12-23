import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, ListItem, List, MenuItem, Radio, RadioGroup, Select, TextField, Grid, Typography } from "@mui/material";
import liff from "@line/liff";
import "./App.css";
import { SelectChangeEvent } from '@mui/material/Select';

interface FormState {
  name: string;
  gender: string;
  age: string;
  businessContent: string;
  businessScale: string;
  employeeNumber: string;
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
    businessContent: '',
    businessScale: '',
    employeeNumber: '',
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

const handleSelectInputChange = (event: SelectChangeEvent<string>) => {
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
  setErrors([]);  // Clear out previous errors

  // Input validation
  // 入力検証
  let tempErrors: string[] = [];
  if (formState.name === '') {
    tempErrors.push(`名前を入力してください。`);
  }
  if (formState.gender === '') {
    tempErrors.push(`性別を入力してください。`);
  }
  if (formState.age === '') {
    tempErrors.push(`年齢を入力してください。`);
  }
  if (formState.businessContent === '') {
    tempErrors.push(`事業内容を入力してください。`);
  }
  if (formState.businessScale === '') {
    tempErrors.push(`事業規模を入力してください。`);
  }
  if (formState.employeeNumber === '') {
    tempErrors.push(`従業員数を入力してください。`);
  }
  if (formState.businessStartDate === '') {
    tempErrors.push(`事業開始時期を入力してください。`);
  }


  // Send the form data to LINE bot via LIFF
  if(tempErrors.length === 0 && liff.isLoggedIn()) {
    try {
      let message = [
        `名前: ${formState.name}`,
        `性別: ${formState.gender}`,
        `年齢: ${formState.age}`,
        `事業内容: ${formState.businessContent}`,
        `事業規模: ${formState.businessScale}`,
        `従業員数: ${formState.employeeNumber}`,
        `事業開始時期: ${formState.businessStartDate}`
      ].filter(item => item !== '').join('\n');
      
      await liff.sendMessages([{
        type: 'text',
        text: "プロフィール登録\n" + message
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
        {/* 氏名 */}
        <Grid item xs={12}>
          <Typography variant="h6" component="div">氏名</Typography>
          <TextField name="name" onChange={handleTextInputChange} required fullWidth />
        </Grid>

        {/* 性別 */}
        <Grid item xs={12}>
          <Typography variant="h6" component="div">性別</Typography>
          <TextField name="gender" onChange={handleTextInputChange} required fullWidth />
        </Grid>

        {/* 年齢 */}
        <Grid item xs={12}>
          <Typography variant="h6" component="div">年齢</Typography>
          <TextField name="age" onChange={handleTextInputChange} required fullWidth />
        </Grid>

        {/* 事業内容 */}
        <Grid item xs={12}>
          <Typography variant="h6" component="div">事業内容</Typography>
          <TextField name="businessContent" onChange={handleTextInputChange} required fullWidth />
        </Grid>

        {/* 事業規模 */}
        <Grid item xs={12}>
          <Typography variant="h6" component="div">事業規模 (年商/利益)</Typography>
          <TextField name="businessScale" onChange={handleTextInputChange} required fullWidth />
        </Grid>

        {/* 従業員数 */}
        <Grid item xs={12}>
          <Typography variant="h6" component="div">従業員数</Typography>
          <TextField name="employeeNumber" onChange={handleTextInputChange} required fullWidth />
        </Grid>

        {/* 事業開始時期 */}
        <Grid item xs={12}>
          <Typography variant="h6" component="div">事業開始時期</Typography>
          <TextField name="businessStartDate" onChange={handleTextInputChange} required fullWidth />
        </Grid>

        {/* 送信ボタン */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>送信</Button>
        </Grid>
      </Grid>
    </form>

    {/* エラーメッセージ */}
    {errors.length > 0 && (
      <ul>
        {errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
    )}
  </Container>
);
};

export default App;