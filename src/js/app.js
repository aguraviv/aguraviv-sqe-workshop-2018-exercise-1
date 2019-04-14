import $ from 'jquery';
import {parseCode, build_table, table_array} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        
        //builds the new string to be added and sends it to the table
        build_table(codeToParse);
        var string_to_insert;
        for(var index=0; index<table_array.length; index++ ){
            //console.log("table_array in the " + j + " line:" + table_array[j].line + "name: " +table_array[j].name );
            var insert_to_table = the_string_to_add(table_array[index]);
            string_to_insert = string_to_insert + insert_to_table + ' ';
        }
        $('#table_data').html(string_to_insert);
    });
});

//adds the string to be added
const the_string_to_add = (the_new_line_to_string) => `<tr> <td> ${the_new_line_to_string.line} </td> <td>${the_new_line_to_string.type}</td> <td>${the_new_line_to_string.name}</td> <td>${the_new_line_to_string.condition}</td> <td>${the_new_line_to_string.value}`;   
