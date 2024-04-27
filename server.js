const express = require('express');
const app = express();
const path = require('path');
const { accountSid, authToken } = require('./config'); 
const client = require('twilio')(accountSid, authToken);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/makeCall', (req, res) => {
    const { phoneNumber } = req.body;

    client.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml', 
            to: phoneNumber,
            from: '+12672961685', 
        })
        .then(call => {
            console.log(call.sid);
            res.send({ message: 'Call initiated successfully!', callSid: call.sid });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: 'Failed to initiate call' });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
