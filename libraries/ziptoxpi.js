const stream = require('stream');
const util = require('util');
const jszip = require('jszip');
const Transform = stream.Transform;

class ZipToXpi extends Transform{

    constructor(options){
        super(options);
        this.buffers = [];
        this.size = 0;
        this.max_size = 20971520;
        this.application_id = null;
    }

    _transform(chunk, encoding, callback){
        this.size += chunk.length;

        if (this.size < this.max_size) {
            this.buffers.push(chunk);
            callback();
            return;
        }

        callback(new Error("Compressed file is too heavy. Max size : " + this.max_size));
    }
    
    generateGuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    setApplicationId(application_id){
        this.application_id = application_id;
    }


    getApplicationId(){
        return this.application_id || this.generateGuid();
    }

    _flush(callback){
        var buffer = Buffer.concat(this.buffers);
    
        var p1 = jszip.loadAsync(buffer);
        var p2 = p1.then(zip => zip.file("manifest.json").async('string'));
    
        return Promise.all([p1, p2])
            .then(([zip, content]) => {
                var json = JSON.parse(content);
    
                json['applications'] = {
                    'gecko': {
                        'id': `${this.getApplicationId()}@foxify`
                    }
                };
    
                zip.file("manifest.json", JSON.stringify(json));
                return zip.generateAsync({
                    type: "nodebuffer"
                });
            })
            .then(buffer => {
                this.push(buffer);
                callback();
            });
    
    }
}

module.exports = ZipToXpi;