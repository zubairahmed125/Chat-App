const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () =>{
it('should generate Message', () =>{

var from = "Zubair";
var text = "Asalaamualeykum";

var res = generateMessage(from , text);

 expect(res.createAt).toBeA('number');
 expect(res).toInclude({from,text});

});
});
