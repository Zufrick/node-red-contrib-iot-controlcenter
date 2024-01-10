
module.exports = function(RED) {
    function IOT_addNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        nodeRed = this;
        node.name = config.name;
        node.robot_name = config.robot_name;
        node.N = config.N;
        node.X = config.X;
        node.Y = config.Y;
        node.T = config.T;
        node.G = config.G;
        node.V = config.V;
        node.D0 = config.D0;
        node.L1 = config.L1;
        node.L2 = config.L2;
        node.L3 = config.L3;
        node.L4 = config.L4;
        node.P = config.P;
        node.Text = config.Text;
   
        this.on('input', function(msg) {
            msg.payload = {
                "robot_name": node.robot_name,
                "N": node.N,
                "X": node.X,
                "Y": node.Y,
                "T": node.T,
                "G": node.G,
                "V": node.V,
                "D0": node.D0,
                "L1": node.L1,
                "L2": node.L2,
                "L3": node.L3,
                "L4": node.L4,
                "P": node.P,
                "Text": node.Text,
            }
            node.send(msg)
        });
    }

    RED.nodes.registerType("Function", IOT_addNode);
};