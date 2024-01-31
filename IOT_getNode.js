module.exports = function(RED) {
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const PORT = 17381;
    const nodeReds = [];

    app.use(bodyParser.json());

    app.post('/platform_get', (req, res) => {
        const json = req.body;
        nodeReds.forEach(nodeRed => {
            nodeRed.send({payload: json});
        });
        res.send('Success');
    });

    app.get('/platform_get', (req, res) => {
        res.send('Success');
    });

    app.listen(PORT, () => {
        const currentDate = new Date();
    });

    function IOT_getNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        nodeRed = this;
        nodeReds.push(node);

        node.name = config.name;
    }

    RED.nodes.registerType("IOT Get", IOT_getNode);
}