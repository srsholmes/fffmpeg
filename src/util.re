let includes = (arr, str) => Js.Array.includes(str, arr);

let concat = (a, b) => a ++ " " ++ b;

let optionsString = Js.Array.reduce((a, b) => concat(a, b), "");

let optionsNumber = Js.Array.reduce((a, b) => a + b, 0);

let hello = optionsString([|"1", "2", "3"|]);

let helloNum = optionsNumber([|1, 2, 3|]);

Js.log(hello);

Js.log(helloNum);