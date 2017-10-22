var amqp = require('amqplib/callback_api');

module.exports = {
    send: function(msg) {
        amqp.connect('amqp://datdb.cphbusiness.dk', function(err, conn) {
            conn.createChannel(function(err, ch) {
                var exchangeName = "Databasserne_BankRabbitMQ";
                var replyToChannel = "Databasserne_Normalizer";

                ch.assertExchange(exchangeName, 'fanout', { durable: false });
                ch.publish(exchangeName, '', new Buffer(msg), { 
					replyTo: replyToChannel
				});
            });
        });
    }
}