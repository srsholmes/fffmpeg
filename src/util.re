let includes = (arr, str) => Js.Array.includes(str, arr);

let concat = (a, b) => a ++ " " ++ b;

let optionsString = List.fold_left((a, b) => concat(a, b), "");