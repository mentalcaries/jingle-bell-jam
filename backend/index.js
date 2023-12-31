const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors')
const app = express();
const PORT = 3001;

const corsOptions = ['https://localhost:3000', 'https://jinglejamtest.twilightparadox.com/' ]

app.use(cors(corsOptions))
app.use(express.json());

app.get('/', (req, res) => {
  let dataToSend;

  const pythonProcess = spawn('python3', ['scripts/ml.py']);
  // collect data from script
  pythonProcess.stdout.on('data', function (data) {
    dataToSend = data.toString();
  });

  // close stream from child process
  pythonProcess.on('exit', (code) => {
    console.log(`Data sent successfully`);
    res.send(dataToSend);
  });
});
app.listen(PORT, () =>
  console.log(`🚀 Listening on Port 
${PORT}!`)
);
