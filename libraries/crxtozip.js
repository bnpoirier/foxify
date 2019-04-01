const stream = require('stream');
const util = require('util');
const Transform = stream.Transform;

class CrxToZip extends Transform{

    constructor(options){
        super(options);
        this.signatureRemoved = false;
        
        return this;
    }


    isValid(chunk){
        // 43 72 32 34 (Cr24)
        if (chunk[0] !== 67 || chunk[1] !== 114 || chunk[2] !== 50 || chunk[3] !== 52) {
            return false;
        }
    
        // 02 00 00 00
        if (chunk[4] !== 2 || chunk[5] !== 0 || chunk[6] !== 0 || chunk[7] !== 0) {
            return false;
        }
    
        return true;
    }

    _transform(chunk, encoding, callback){
        if(!this.signatureRemoved){
            if(!this.isValid(chunk)) callback(new Error("Invalid or corrupted CRX extension"));
    
            var publicKeyLength = 0 + chunk[8] + (chunk[9] << 8) + (chunk[10] << 16) + (chunk[11] << 24);
            var signatureLength = 0 + chunk[12] + (chunk[13] << 8) + (chunk[14] << 16) + (chunk[15] << 24);
            
            // 16 = Magic number (4), CRX format version (4), lengths (2x4)
            var header = 16;
            var zipStartOffset = header + publicKeyLength + signatureLength;
            
            chunk = chunk.slice(zipStartOffset, chunk.length);
            this.signatureRemoved = true;
        }
        this.push(chunk);
        callback();
    }
}


module.exports = CrxToZip;
