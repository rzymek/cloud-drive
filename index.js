const { auth } = require('google-auth-library');
const VER = "v7";

exports.drive = (req, res) => {
  console.log(VER);
  return auth.getApplicationDefault().then(res => {
    let client = res.credential;

    // The createScopedRequired method returns true when running on GAE or a local developer
    // machine. In that case, the desired scopes must be passed in manually. When the code is
    // running in GCE or a Managed VM, the scopes are pulled from the GCE metadata server.
    // See https://cloud.google.com/compute/docs/authentication for more information.
    if (client.createScopedRequired && client.createScopedRequired()) {
      // Scopes can be specified either as an array or as a single, space-delimited string.
      const scopes = ['https://www.googleapis.com/auth/cloud-platform'];
      client = client.createScoped(scopes);
    }
    return client.request({
      url: 'https://www.googleapis.com/drive/v3/files'
    });
  }).then(res => {
    console.log({data:res.data});
    return res.end(res.data);
  }).catch(err => res.end(err.message))
}