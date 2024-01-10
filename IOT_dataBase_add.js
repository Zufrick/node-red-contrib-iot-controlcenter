// var select = document.getElementById("node-input-method");
// var div = document.getElementById("myDiv");

module.exports = function(RED) {
    function IOT_addNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        nodeRed = this;
        node.name = config.name;
        node.method = config.method;
        node.tablename = config.nameTable;
        node.properties = config.properties;
        // node.ip = config.ip;
   
        this.on('input', function(msg) {
            switch(node.method){
                case 'SELECT':
                    msg.topic = node.method + " " + node.properties + " from " + node.tablename + ";";
                    break;

                case 'INSERT':
                    var nameArray = []
                    var valueArray = []
                    node.properties = node.properties.replace(/\s/g, '');
                    let properties_str = node.properties.split(";")
                    for (let n = 0; n < properties_str.length; n++) {
                        let param = properties_str[n].split("=")
                        nameArray.push(param[0])
                        valueArray.push(param[1])
                    }
                    
                    var nameReq = "(" 
                    var valueReq = "("

                    for (let n = 0; n < nameArray.length; n++){
                        if (n != nameArray.length - 1){
                            nameReq += nameArray[n]
                            nameReq += ", "

                            valueReq += valueArray[n]
                            valueReq += ", "
                        }
                        else{
                            nameReq += nameArray[n]
                            nameReq += ")"

                            valueReq += valueArray[n]
                            valueReq += ")"
                        }
                    }
                    msg.topic = node.method + " into " + node.tablename + " " + nameReq + " values " + valueReq + ";";
                    break;
                
                case 'DELETE':
                    msg.topic = node.method + " from " + node.tablename + " where " + node.properties + ";";
                    break;
            }
            console.log(msg.topic)
            node.send(msg)
        });
        
        // this.on('output', function(msg) {
        //     msg.payload = "SELECT * FROM Device_table;";
        //     node.send(msg);
        //     console.log("out")
        // });

        // select.addEventListener("change", function() {
        //     if (select.value === "get") {
        //       div.removeAttribute("class");
        //     }
        //   });
    }

    RED.nodes.registerType("Request", IOT_addNode);
};