var receiver = require('./receive');
var sender = require('./send');

receiver.receive(function(msg) {
    var data = JSON.parse(msg.content);

    var json = JSON.stringify({ 
        "SSN": data.SSN, 
        "loanAmount": data.Amount, 
        "loanDuration": data.Months,
        "creditScore": data.CreditScore
    });

    sender.send(json);
});
