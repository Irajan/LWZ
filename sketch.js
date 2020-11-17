
const encodeBtn = document.getElementById("encode");
const decodeBtn = document.getElementById("decode");
const string = document.getElementById("text");
const output = document.getElementById("response");

encodeBtn.addEventListener('click',function(e){

    let response = string.value.toUpperCase() + " ==> "
    if(string.value.length != 0){

       response +=   lzw_encode(string.value.toUpperCase())
        encodeBtn.disabled = true;
        decodeBtn.disabled = false;
    }

    else
        response = "No valid string"

    string.disabled = true;
   output.innerHTML = response;
})

decodeBtn.addEventListener('click',function(e){
    const encoded = lzw_encode(string.value.toUpperCase());
    const response = encoded + " ==> " + lzw_decode(encoded);
    output.innerHTML = response; 

    string.disabled = false;
    decodeBtn.disabled = true;
    encodeBtn.disabled = false;
})


function lzw_encode(s) {
     var dict = {};
     var data = (s + "").split("");
     var out = [];
     var currChar;
     var phrase = data[0];
     var code = 256;
     for (var i=1; i<data.length; i++) {
         currChar=data[i];
         if (dict[phrase + currChar] != null) {
             phrase += currChar;
         }
         else {
             out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
             dict[phrase + currChar] = code;
             code++;
             phrase=currChar;
         }
     }
     out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
     for (var i=0; i<out.length; i++) {
         out[i] = String.fromCharCode(out[i]);
     }
     return out.join("");
 }
 
 // Decompress an LZW-encoded string
 function lzw_decode(s) {
     var dict = {};
     var data = (s + "").split("");
     var currChar = data[0];
     var oldPhrase = currChar;
     var out = [currChar];
     var code = 256;
     var phrase;
     for (var i=1; i<data.length; i++) {
         var currCode = data[i].charCodeAt(0);
         if (currCode < 256) {
             phrase = data[i];
         }
         else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
         }
         out.push(phrase);
         currChar = phrase.charAt(0);
         dict[code] = oldPhrase + currChar;
         code++;
         oldPhrase = phrase;
     }
     return out.join("");
 }
