var express = require('express');
var app = express();
var history = require('connect-history-api-fallback');
app.use('/',express.static('build/'));
app.use(history({
  rewrites: [
    {to: '/' }
  ]
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/build/index.html');
})

app.listen('3005',function () {
  console.log('listen on 3005');
});