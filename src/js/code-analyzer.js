import * as esprima from 'esprima';
const new_line_object = (line,type,name, condition, value) => ({line,type,name,condition,value});
var table_array = [];
var string_range_code;


const parseCode = (codeToParse) => {
    string_range_code = codeToParse;
    const root = esprima.parseScript(codeToParse);
    return root;
};
//reads the loc parse and saves his location
const use_loc_to_parse = (codeToParse) => esprima.parseScript(codeToParse, {loc: true, range: true});

//takes from the user it's input and sends it to module         
const build_table = (codeToParse) => { 
    string_range_code = codeToParse;
    module_builder(use_loc_to_parse(codeToParse));
    return table_array;};

    /*
const module_builder= (root) =>{
    switch(root.type){
        case 'Program' :  program_helper(root); break;
        case 'BlockStatement' : program_helper(root); break;
        case 'FunctionDeclaration': function_decleration_parser(root); break;
        case 'VariableDeclaration' :variable_decleration_parser_for_array(root); break;
        case 'ExpressionStatement' : expression_statement_parser(root); break;
        case 'ReturnStatement' : return_statement_parser(root); break;
        case 'IfStatement' : if_statement_parser(root); break;
        case 'WhileStatement' : while_statement_parser(root); break;
        case 'ForStatement' : for_statement_parser(root); break;
        case 'BinaryExpression' : return Binary_Expression_parser(root); 
        case 'Literal': return literal_parser(root); 
        case 'Identifier': return root.name; 
        case 'MemberExpression' : return Member_Expression_parser(root); 
        case 'UnaryExpression' : return Unary_Expression_parser(root) ; 
            //needs to be  finished
        case 'UpdateExpression' : update_expression_parser(root); break;
        default: return;
}};
*/
    
const module_builder= (root) =>{
    switch(root.type){
    case 'Program' :  program_helper(root); break;
    case 'BlockStatement' : program_helper(root); break;
    case 'FunctionDeclaration': function_decleration_parser(root); break;
    case 'VariableDeclaration' :variable_decleration_parser_for_array(root); break;
    default: return module_builder_second(root);
    }};

const module_builder_second = (root) =>{
    switch(root.type){
    case 'ExpressionStatement' : expression_statement_parser(root); break;
    case 'ReturnStatement' : return_statement_parser(root); break;
    case 'IfStatement' : if_statement_parser(root); break;
    case 'WhileStatement' : while_statement_parser(root); break;
    default: return module_builder_third(root);
    }
};


const module_builder_third = (root) =>{
    switch(root.type){
    case 'ForStatement' : for_statement_parser(root); break;
    case 'UpdateExpression' : update_expression_parser(root); break;
    //case 'Literal': return literal_parser(root); 
    //case 'Identifier': return root.name;
    //default: return;
    }
};
/*
const module_builder_forth = (root) =>{
    switch(root.type){
    case 'BinaryExpression' : return Binary_Expression_parser(root); 
    case 'UnaryExpression' : return Unary_Expression_parser(root) ; 
    //needs to be  finished
    
    case 'MemberExpression' : return Member_Expression_parser(root);
    default: return;
    }
};
*/
/* unsued
const Member_Expression_parser = (root) => {
    
    var x = root.range;
    var y = string_range_code.substring(x[0], x[1]);
    return y;
    

    
    //return ;
};

const Unary_Expression_parser = (root) => {
    var x = root.operator;
    var y = module_builder(root.argument);
    var s= x+ y;
    return s;
};
*/
/*
const literal_parser = (root) => {
    return root.value;
};
*/
const program_helper = (root) => {
    for(var i =0; i<root.body.length; i++){
        module_builder(root.body[i]);
    }
};

const function_decleration_parser = (root) => {
    var function_name = root.id.name;
    var new_object_func_decl = new_line_object(root.loc.start.line, 'function declaration', function_name,' ',' ');   
    table_array.push(new_object_func_decl) ;
    //reades all the params
    for(var i =0; i<root.params.length; i++){
        var variable_name = root.params[i].name;
        var new_object_func_decl_one = new_line_object(root.loc.start.line, 'variable declaration', variable_name,' ',' ');   
        table_array.push(new_object_func_decl_one);
    }
    module_builder(root.body);
};

const variable_decleration_parser_for_array = (root) => {
    for(var i =0; i<root.declarations.length; i++){
        var variable_name = root.declarations[i].id.name;
        var new_object_func_decl = new_line_object(root.loc.start.line, 'variable declaration', variable_name,' ',' ');   
        table_array.push(new_object_func_decl);
    }
    return;
};

const expression_statement_parser = (root) => {
    //var name_of_operator = root.expression.operator; -> not relevant currently
    var name_of_identifier = root.expression.left.name;
    /*var x = root.test.range;
    var test = string_range_code.substring(x[0], x[1]); */
    var x = root.expression.right.range;
    var value_of_identifier = string_range_code.substring(x[0], x[1]);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'assignment expression', name_of_identifier,' ',value_of_identifier);   
    table_array.push(new_object_func_decl);
    return;
};


const return_statement_parser = (root) => {
    var x = root.argument.range;
    var value_of_return =  string_range_code.substring(x[0], x[1]);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'ReturnStatement',' ',' ',value_of_return);   
    table_array.push(new_object_func_decl);

    return;
};

const if_statement_parser = (root) => {
    //not sure if needs to evaluate or take the string as it is
    //var test = module_builder(root.test);

    var x = root.test.range;
    var test = string_range_code.substring(x[0], x[1]);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'if statement', ' ',test,' ');   
    table_array.push(new_object_func_decl);
    module_builder(root.consequent);
    module_builder(root.alternate);
    return;
};

const while_statement_parser = (root) => {
    //not sure if needs to evaluate or take the string as it is
    //var test = module_builder(root.test);
    var x = root.test.range;
    var test = string_range_code.substring(x[0], x[1]);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'while statement', ' ',test,' ');   
    table_array.push(new_object_func_decl);
    program_helper(root.body);
    return;
};

//need to be fixed
const for_statement_parser = (root) => {
    module_builder(root.init);
    //var test = module_builder(root.test);
    var x = root.test.range;
    var test = string_range_code.substring(x[0], x[1]);
    module_builder(root.update);
    var new_object_func_decl = new_line_object(root.loc.start.line, 'for statement',' ',test,' ');
    table_array.push(new_object_func_decl);
    program_helper(root.body);
    return;
};

/* unused
const assignment_expression_parser = (root) => {
    var right = module_builder(root.expression.right);
    var name = root.expression.left;
    var new_object_func_decl = new_line_object(root.loc.start.line, "assignment statement", name ," ",right);   
    table_array.push(new_object_func_decl);
    return;
};
*/

const update_expression_parser = (root) => {
    var name = root.argument.name;
    var operator= root.operator;
    var total_name = name+ operator; 
    var new_object_func_decl = new_line_object(root.loc.start.line, 'update Statement', total_name ,' ',' '); 
    table_array.push(new_object_func_decl);
    return;
};

/*
const Binary_Expression_parser = (root) => {
    var left = module_builder(root.left); 
    var operator = root.operator;
    var  right=  module_builder(root.right);
    var s = (''+ left + ' '+operator +' '+ right);
    return s;
};

*/
export {parseCode, build_table, table_array};
