function sendMessage() {
// Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
// Set the region
  AWS.config.update({region: 'eu-central-1'});

// Create an SQS service object
  var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

  var params = {
    DelaySeconds: 10,
    MessageAttributes: {
      "Title": {
        DataType: "String",
        StringValue: "Usabilyics"
      },
      "Author": {
        DataType: "String",
        StringValue: "Usabilyics"
      }
    },
    MessageBody: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
      "<confirmation>\n" +
      "    <id>1</id>\n" +
      "    <email>drygielski.marcin@gmail.com</email>\n" +
      "    <subject>Usabilytics</subject>\n" +
      "    <sender/>\n" +
      "    <result>fail</result>\n" +
      "    <duration>12122</duration>\n" +
      "    <timestamp>2018-11-17T15:52:38+00:00</timestamp>\n" +
      "    <language>en</language>\n" +
      "</confirmation>",
    QueueUrl: "https://sqs.eu-central-1.amazonaws.com/566822930562/notifier_queue"
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
}
