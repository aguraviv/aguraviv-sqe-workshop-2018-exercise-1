import assert from 'assert';
import {parseCode,table_array, build_table} from '../src/js/code-analyzer';
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script"}');});        
    it('simple identifier ', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 6;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":6,"raw":"6"}}],"kind":"let"}],"sourceType":"script"}'
        );});
    it('is parsing a function declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X, V, n){}')),
            '{"type":"Program","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"binarySearch"},"params":[{"type":"Identifier","name":"X"},{"type":"Identifier","name":"V"},{"type":"Identifier","name":"n"}],"body":{"type":"BlockStatement","body":[]},"generator":false,"expression":false,"async":false}],"sourceType":"script"}'
        );});                
    it('is parsing a varibles declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let x;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"x"},"init":null}],"kind":"let"}],"sourceType":"script"}'
        );});},
               
describe('The code parser parser', () => {
    it('testing let details', () => {
        assert.deepEqual(build_table(`function binarySearch(X, V, n){
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
                       }`)[0].line, 1 );});
    it('testing funtion details in array', () => {
        assert.deepEqual(table_array[2].line , 1);});  

        it('testing while details in the array', () => {
            assert.deepEqual(table_array[9].type , 'while statement');});
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[1].name , 'X');});
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[10].name , 'mid');});
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[9].condition , 'low <= high');});
        /*it('testing funtion details in array', () => {
            assert.deepEqual(table_array[14].value , 'mid + 1');});*/
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[13].type , 'if statement');});
        it('testing funtion details in array', () => {
            assert.deepEqual(table_array[5].name , 'high');});
}));
    

//}));
               
               
               
describe('The code parser parser', () => {
    it('testing let details', () => {
        assert.deepEqual(build_table(`function binarySearch(X, V, n){
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
                                       return mid;}
                               return -1;
                           }`)[0].line, 1 );});
                   
               
                   
});
               
               
describe('The code parser parser', () => {
    it('testing let details', () => {
                               
        assert.deepEqual(build_table(`function binarySearch(X, V, n){
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
                               }`)[0].line, 1 );});
                       
});
