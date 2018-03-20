const google = require("googleapis");
const VER = "v6";

exports.drive = (req, res) => {
    console.log(VER);
    console.log(process.env);
    const service = google.drive('v3');
    service.files.list({}, (err, response) => {
        if (err) {
            console.error(err);
            console.error(err.request._headers);
            res.end(JSON.stringify(err.errors, null, ' '));
            return;
        }
        const files = response.files;
        console.log("files:", files);
        if (files.length === 0) {
            res.end('No files found.');
        }
        else {
            res.end(files.map(file => file.name).join("\n"));
        }
    });
}
