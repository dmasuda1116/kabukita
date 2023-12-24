import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Box, Button, Container, FormControl, FormControlLabel, FormLabel,
  InputLabel, ListItem, List, MenuItem, Radio, RadioGroup, Select,
  TextField, Grid, Typography
} from "@mui/material";
import liff from "@line/liff";
import "./App.css";
import { SelectChangeEvent } from '@mui/material/Select';

interface FormState {
  nickname: string;
  currentStatus: string;
  businessContent?: string;
  annualRevenue?: string;
  employeeNumber?: string;
  businessStartDate?: string;
  mainJobIncome?: string;
  occupation?: string;
  annualIncome?: string;
  specialSkill?: string;
}

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    liff
      .init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(() => {
        setMessage("LIFFの初期化が成功しました。");
      })
      .catch((e: Error) => {
        setMessage("LIFFの初期化が失敗しました。");
        setErrors(errors => [...errors, `${e}`]);
      });
  }, []);

  const [formState, setFormState] = useState<FormState>({
    nickname: '',
    currentStatus: '',
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
  
    // エラーチェック
    let errorMessages: string[] = [];
    if (!formState.nickname) {
      errorMessages.push("呼んでほしい名前を入力してください。");
    }
    if (!formState.currentStatus) {
      errorMessages.push("現状を選択してください。");
    }
    
    // エラーがある場合は処理を中断
    if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'));
      return;
    }
  
  // 送信するメッセージを作成
  let messageText = `プロフィール登録`;

  const addItem = (label: string, value: string | undefined) => {
    if (value) {
      messageText += `\n${label}: ${value}`;
    }
  };

  addItem("呼んでほしい名前", formState.nickname);
  addItem("現状", formState.currentStatus);
  addItem("事業内容", formState.businessContent);
  addItem("年商", formState.annualRevenue);
  addItem("従業員数", formState.employeeNumber);
  addItem("開業時期", formState.businessStartDate);
  addItem("本業収入", formState.mainJobIncome);
  addItem("職種", formState.occupation);
  addItem("年収", formState.annualIncome);
  addItem("得意（特異）なこと", formState.specialSkill);
  
    const messageData = {
      type: 'text' as const,
      text: messageText
    };
  
    // LINEにメッセージを送信
    try {
      if (liff.isLoggedIn()) {
        await liff.sendMessages([messageData]);
      } else {
        alert("LINEにログインしていません。");
      }
    } catch (error) {
      alert(`メッセージの送信に失敗しました: ${error}`);
    }
  
    // LIFFウィンドウを閉じる
    liff.closeWindow();
  };
  


return (
  <Container>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="nickname"
            label="呼んでほしい名前"
            value={formState.nickname}
            onChange={handleTextInputChange}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>現状</InputLabel>
            <Select
              name="currentStatus"
              value={formState.currentStatus}
              onChange={handleSelectInputChange}
              label="現状"
              required
            >
              <MenuItem value="会社経営">会社経営</MenuItem>
              <MenuItem value="個人事業主">個人事業主</MenuItem>
              <MenuItem value="副業">副業</MenuItem>
              <MenuItem value="会社員">会社員</MenuItem>
              <MenuItem value="公務員">公務員</MenuItem>
              <MenuItem value="専業主婦">専業主婦（夫）</MenuItem>
              <MenuItem value="学生">学生</MenuItem>
              <MenuItem value="その他">その他</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {formState.currentStatus === "会社経営" && (
          <>
            <Grid item xs={12}>
              <TextField
                name="businessContent"
                label="事業内容"
                value={formState.businessContent}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="annualRevenue"
                label="年商"
                value={formState.annualRevenue}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="employeeNumber"
                label="従業員数"
                value={formState.employeeNumber}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="businessStartDate"
                label="開業時期"
                value={formState.businessStartDate}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
          </>
        )}

        {formState.currentStatus === "個人事業主" && (
          <>
            <Grid item xs={12}>
              <TextField
                name="businessContent"
                label="事業内容"
                value={formState.businessContent}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="annualRevenue"
                label="年商"
                value={formState.annualRevenue}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="businessStartDate"
                label="開業時期"
                value={formState.businessStartDate}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
          </>
        )}

        {formState.currentStatus === "副業" && (
          <>
            <Grid item xs={12}>
              <TextField
                name="businessContent"
                label="事業内容"
                value={formState.businessContent}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="annualRevenue"
                label="年商"
                value={formState.annualRevenue}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="mainJobIncome"
                label="本業収入"
                value={formState.mainJobIncome}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
          </>
        )}

        {["会社員", "公務員"].includes(formState.currentStatus) && (
          <>
            <Grid item xs={12}>
              <TextField
                name="occupation"
                label="職種"
                value={formState.occupation}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="annualIncome"
                label="年収"
                value={formState.annualIncome}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="specialSkill"
                label="得意（特異）なこと"
                value={formState.specialSkill}
                onChange={handleTextInputChange}
                required
                fullWidth
              />
            </Grid>
          </>
        )}

        {["専業主婦", "学生"].includes(formState.currentStatus) && (
          <Grid item xs={12}>
            <TextField
              name="specialSkill"
              label="得意（特異）なこと"
              value={formState.specialSkill}
              onChange={handleTextInputChange}
              required
              fullWidth
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>送信</Button>
        </Grid>
      </Grid>
    </form>
  </Container>
);
};

export default App;