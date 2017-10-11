var amqp = require('amqplib/callback_api');

module.exports = {
    receive: function(callback) {
        amqp.connect('amqp://datdb.cphbusiness.dk', function(err, conn) {
            conn.createChannel(function(err, ch) {
                var exchangeName = "Databasserne_Test";

                ch.assertExchange(exchangeName, 'direct', { durable: false });
                ch.assertQueue('', { exclusive: true }, function(err, q) {

                    console.log(" [*] Waiting for message [*] ");

                    ch.bindQueue(q.queue, exchangeName, 'BankNODE');
                    ch.consume(q.queue, function(msg) {
                        callback(msg);
                    }, { noAck: true });
                });
            });
        });
    }
}