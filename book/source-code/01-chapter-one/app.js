const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log("http://localhost:3000/ accessed by client");

    res.send('Hello World!')
});

app.get('/route', (req, res) => {
    console.log("http://localhost:3000/route accessed by client");
    
    res.send('Hello from /route end point')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});