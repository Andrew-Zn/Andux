
let obj = {UPDATE_TITLE_TEXT:"value"};
let key = [];
for (let p1 in obj) {
    let boolen = obj.hasOwnProperty(p1);
            if (boolen) {key.push(p1);}
        }
console.log(key);
console.log(obj.a);

let  str = "sss.ff"
console.log(str.split('.'));
