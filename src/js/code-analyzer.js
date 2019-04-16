import * as esprima from 'esprima';
const new_line_object = (line,type,name, condition, value) => ({line,type,name,condition,value});
let table_array = [];
let string_range_code;


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
    program_handler(use_loc_to_parse(codeToParse));
    return table_array;};
    
const program_handler= (root) =>{
    switch(root.type){
    case 'Program' :  program_helper(root); break;
    case 'FunctionDeclaration': function_decleration_parser(root); break;
    case 'VariableDeclaration' :variable_decleration_parser_for_array(root); break;
    default: return the_statements_handler(root);
    }};

const the_statements_handler = (root) =>{
    switch(root.type){
    case 'ForStatement' : for_statement_parser(root); break;
    case 'BlockStatement' : program_helper(root); break;
    case 'IfStatement' : if_statement_parser(root); break;
    case 'WhileStatement' : while_statement_parser(root); break;
    default: return expression_handler(root);
    }
};


const expression_handler = (root) =>{
    switch(root.type){
    case 'ExpressionStatement' : expression_statement_parser(root); break;
    case 'ReturnStatement' : return_statement_parser(root); break;
    case 'UpdateExpression' : update_expression_parser(root); break;
    }
};

const program_helper = (root) => {
    for(let index =0; index<root.body.length; index++){
        program_handler(root.body[index]);
    }
};

const function_decleration_parser = (root) => {
    let function_name = root.id.name;
    let new_object_func_decl = new_line_object(root.loc.start.line, 'function declaration', function_name,' ',' ');   
    table_array.push(new_object_func_decl) ;
    //reades all the params
    for(let index =0; index<root.params.length; index++){
        let variable_name = root.params[index].name;
        let new_object_func_decl_one = new_line_object(root.loc.start.line, 'variable declaration', variable_name,' ',' ');   
        table_array.push(new_object_func_decl_one);
    }
    program_handler(root.body);
};

const variable_decleration_parser_for_array = (root) => {
    for(let index =0; index<root.declarations.length; index++){
        let variable_name = root.declarations[index].id.name;
        let new_object_func_decl = new_line_object(root.loc.start.line, 'variable declaration', variable_name,' ',' ');   
        table_array.push(new_object_func_decl);
    }
    return;
};

const expression_statement_parser = (root) => {
    let name_of_identifier = root.expression.left.name;
    let left_and_right_sides_of_expression = root.expression.right.range;
    let value_of_identifier = string_range_code.substring(left_and_right_sides_of_expression[0], left_and_right_sides_of_expression[1]);
    let new_object_func_decl = new_line_object(root.loc.start.line, 'assignment expression', name_of_identifier,' ',value_of_identifier);   
    table_array.push(new_object_func_decl);
    return;
};


const return_statement_parser = (root) => {
    let left_and_right_sides_of_expression = root.argument.range;
    let value_of_return =  string_range_code.substring(left_and_right_sides_of_expression[0], left_and_right_sides_of_expression[1]);
    let new_object_func_decl = new_line_object(root.loc.start.line, 'ReturnStatement',' ',' ',value_of_return);   
    table_array.push(new_object_func_decl);

    return;
};

const if_statement_parser = (root) => {

    let left_and_right_sides_of_expression = root.test.range;
    let test = string_range_code.substring(left_and_right_sides_of_expression[0], left_and_right_sides_of_expression[1]);
    let new_object_func_decl = new_line_object(root.loc.start.line, 'if statement', ' ',test,' ');   
    table_array.push(new_object_func_decl);
    program_handler(root.consequent);
    program_handler(root.alternate);
    return;
};

const while_statement_parser = (root) => {
    let left_and_right_sides_of_expression = root.test.range;
    let test = string_range_code.substring(left_and_right_sides_of_expression[0], left_and_right_sides_of_expression[1]);
    let new_object_func_decl = new_line_object(root.loc.start.line, 'while statement', ' ',test,' ');   
    table_array.push(new_object_func_decl);
    program_helper(root.body);
    return;
};

//need to be fixed
const for_statement_parser = (root) => {
    program_handler(root.init);
    let left_and_right_sides_of_expression = root.test.range;
    let test = string_range_code.substring(left_and_right_sides_of_expression[0], left_and_right_sides_of_expression[1]);
    program_handler(root.update);
    let new_object_func_decl = new_line_object(root.loc.start.line, 'for statement',' ',test,' ');
    table_array.push(new_object_func_decl);
    program_helper(root.body);
    return;
};


const update_expression_parser = (root) => {
    let name = root.argument.name;
    let operator= root.operator;
    let total_name = name+ operator; 
    let new_object_func_decl = new_line_object(root.loc.start.line, 'update Statement', total_name ,' ',' '); 
    table_array.push(new_object_func_decl);
    return;
};

export {parseCode, build_table, table_array};
