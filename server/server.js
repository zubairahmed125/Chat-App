const path = require('path');
const express = require('express');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicPath));

app.listen(3000, () =>{
  console.log(`Server started on port ${port}`);
});
