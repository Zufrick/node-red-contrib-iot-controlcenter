module.exports = function(RED) {
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const PORT = 17381

    app.use(bodyParser.json());

    // app.post('/platform_get', (req, res) => {
    //     const json = req.body;
    //     nodeRed.send({payload: json});
    //     res.send('Success');
    // });


    // app.get('/platform_get', (req, res) => {
    //     res.send("OK");
    // });

    // app.listen(PORT, () => {
    //     const currentDate = new Date();
    // });

    function IOT_Init(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        nodeRed = this;
        node.name = config.name;
   
        this.on('input', function(msg) {
            var jsonMSG = JSON.stringify(msg.payload);
            postJson = msg.payload
        });
        
        this.on('output', function(msg) {
            msg.payload = "getJson";
            node.send(msg);
        });
    }

    function send_debug(){
        nodeRed.send({payload: getJson});
    }

    RED.nodes.registerType("Init", IOT_Init);
};