const TokenValidator = require('twilio-flex-token-validator').validator;

exports.handler = (context, event, callback) => {
  TokenValidator(event['X-Flex-JWE'], context.ACCOUNT_SID, context.AUTH_TOKEN)
    .then(tokenResult => {
      console.log("validated token", tokenResult);
      let plugins = [{
        "name":"Flex Signal Dev Ops Plugin",
        "src":"https://signal-2019-flex-cicd.s3-us-west-1.amazonaws.com/dist/master/plugin-signal-demo-test.js"
      }]

      context.getTwilioClient()
        .taskrouter
        .workspaces('WSe9ef8674f6523dd4bcddc3877f38e284')
        .workers(tokenResult.worker_sid)
        .fetch()
        .then(worker => {
           let attributes = JSON.parse(worker.attributes);
           if (attributes.branch !== undefined) {
             plugins[0].src = plugins[0].src.replace('master', attributes.branch);
           }

           console.log(`\nreturning plugins for branch ${attributes.branch}`, plugins);
           callback(null, plugins);
        }).catch(e => {
           console.error('failed to fetch worker attributes', e);
           callback(null, plugins);
        });
    })
    .catch(err => {
      console.log(err);
      callback('Access Denied');
    });
};
