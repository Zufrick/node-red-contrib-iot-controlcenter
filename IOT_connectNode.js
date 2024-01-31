module.exports = function(RED) {
    const express = require('express');
    const app = express();
    const PORT = 17380
    var postJson = ""

    app.use(express.json());

    app.post('/platform_set', (req, res) => {
        res.send(req.body + + "ds");
    });

    app.get('/platform_set', (req, res) => {
        res.send(postJson);
    });

    app.listen(PORT, () => {
        const currentDate = new Date();
        console.log(currentDate.getDate() + " " + currentDate.toLocaleString('default', { month: 'short' }) + " " + ("0" + currentDate.getHours()).slice(-2) + ":" + ("0" + currentDate.getMinutes()).slice(-2) + ":" + ("0" + currentDate.getSeconds()).slice(-2) + ' - [info] Applied Robotics preset');
    });

    const lastNumbers = [];


    function random_delay(){
        let randomNumber = Math.floor(Math.random() * 301);
        while (lastNumbers.some((num) => Math.abs(randomNumber - num) < 30)) {
            randomNumber = Math.floor(Math.random() * 301);
        }
        
        lastNumbers.push(randomNumber);
        if (lastNumbers.length > 5) {
            lastNumbers.shift();
        }
        
        return randomNumber;
    }

    function IOT_connectNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.name = config.name;

        this.on('input', function(msg) {
            var jsonMSG = JSON.stringify(msg.payload);
            var delay = random_delay();
    
            setTimeout(() => {
                postJson = msg.payload
            }, delay);
            node.send(postJson)
        });
    }

    RED.nodes.registerType("IOT Send", IOT_connectNode);
};