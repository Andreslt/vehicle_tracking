const Express = require('express');
const app = Express();
const path = require('path');
const cors = require('cors');

app.use(cors());

app.use("/KML",Express.static(path.join(__dirname, "static")));

app.listen(3002,() => {
    console.log('server listening at port 3002')
});