const request = require('request');

exports.function = (req, res) => {
  request('https://www.googleapis.com/drive/v3/files', (err, response, body) => {
    if (err) {
      console.error(err);
      console.error(err.request._headers);
      res.end(JSON.stringify(err.errors, null, ' '));
      return;
    }
    res.end(body);
  });
}