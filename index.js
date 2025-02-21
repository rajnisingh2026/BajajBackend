const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const USER_ID = 'RajniGandha_26062004'; 
const EMAIL = '06393rj@gmail.com';
const ROLL_NUMBER = '22BET10080';

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    if (!data || !Array.isArray(data)) {
      return res.json({ is_success: false });
    }

    const numbers = [];
    const alphabets = [];
    for (const item of data) {
      const strItem = String(item).trim();
      if (!isNaN(strItem)) {
        numbers.push(strItem);
      } else if (strItem.length === 1 && /^[a-zA-Z]$/.test(strItem)) {
        alphabets.push(strItem);
      }
    }

    let highest_alphabet = [];
    if (alphabets.length > 0) {
      let maxChar = alphabets[0];
      for (const char of alphabets) {
        if (char.toUpperCase() > maxChar.toUpperCase()) {
          maxChar = char;
        }
      }
      highest_alphabet = [maxChar];
    }

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false });
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
