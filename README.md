my project of mapping a function in javascript into a table of variable types and details about them.

the project is using Html, Javascript and Json, in order to parse the input with it's right type.

in order to run the project in visual studio code envirement, perform the following 
(in the terminal of the directory of the project):
1.  npm i
2. npm install jslint
3. Run index.html from the terminal in the folder
4. A window will open in explorer\default option -> copy it to the chrome browser
4.1 enter the function (can choose one from the down functions), and then press the "parse code".
5. a table will be shown that represent the variables details: line, type, name, condition(if has one), and value(also not obligatory).

possible input:
1.
function binarySearch(X, V, n){
    let low, high, mid;
    low = 0;
    high = n - 1;
    while (low <= high) {
        mid = (low + high)/2;
        if (X < V[mid])
            high = mid - 1;
        else if (X > V[mid])
            low = mid + 1;
        else
            return mid;
    }
    return -1;
}


2. 


function binarySearch(X, V, n){
    let low, high, mid;
    low = 0;
    high = n - 1;
    for(var i =0; low <= high; i++) {
        mid = (low + high)/2;
        if (X < V[mid])
            high = mid - 1;
        else if (X > V[mid])
            low = mid + 1;
        else
            return mid;
    }
    return -1;
}

