const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./errorHandler');

const app = express();
app.use(bodyParser.json());

let userId = 'ag2483';
let email = 'ag2483@srmist.edu.in';
let rollNumber = 'RA2111026020088';

app.use(errorHandler);

app.post('/bfhl', (req, res) => {
  const data = req.body.data;
  let numbers = [];
  let alphabets = [];
  let highestAlphabet = [];

  for (let i = 0; i < data.length; i++) {
    if (!isNaN(data[i])) {
      numbers.push(data[i]);
    } else {
      alphabets.push(data[i]);
      if (alphabets.length === 1 || data[i] > highestAlphabet[0]) {
        highestAlphabet = [data[i]];
      } else if (data[i] === highestAlphabet[0]) {
        highestAlphabet.push(data[i]);
      }
    }
  }

  res.json({
    "is_success": true,
    "user_id": userId,
    "email": email,
    "roll_number": rollNumber,
    "numbers": numbers,
    "alphabets": alphabets,
    "highest_alphabet": highestAlphabet
  });
});

app.get('/bfhl', (req, res) => {
  res.json({
    "operation_code": 1
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});