function generateParameterInputs() {
    const count = parseInt(document.getElementById('paramCount').value);
    const container = document.getElementById('parameterInputs');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const paramInput = document.createElement('div');
        paramInput.className = 'parameter-input';
        paramInput.innerHTML = 
            '<h3>Parameter ' + (i + 1) + '</h3>' +
            '<div class="form-group">' +
            '<label>Parameter Name:</label>' +
            '<input type="text" id="paramName' + i + '" placeholder="e.g., array, str, ch">' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Parameter Type:</label>' +
            '<select id="paramType' + i + '" onchange="showTypeSpecificInputs(' + i + ')">' +
            '<option value="array">Array</option>' +
            '<option value="number">Number</option>' +
            '<option value="binary">Binary String</option>' +
            '<option value="string">Character String</option>' +
            '<option value="char">Character</option>' +
            '<option value="intMatrix">Integer Matrix</option>' +
            '<option value="charMatrix">Character Matrix</option>' +
            '</select>' +
            '</div>' +
            '<div id="typeSpecificInputs' + i + '"></div>';
        container.appendChild(paramInput);
        showTypeSpecificInputs(i);
    }

    if (!document.getElementById('generateButton')) {
        const generateBtn = document.createElement('button');
        generateBtn.id = 'generateButton';
        generateBtn.textContent = 'Generate Code';
        generateBtn.onclick = generateCode;
        container.appendChild(generateBtn);
    }
}

function showTypeSpecificInputs(index) {
    const type = document.getElementById('paramType' + index).value;
    const container = document.getElementById('typeSpecificInputs' + index);
    
    switch(type) {
        case 'array':
            container.innerHTML = 
                '<div class="form-group">' +
                '<label>Size Range:</label>' +
                '<input type="number" id="paramSize' + index + '" placeholder="Maximum size" value="10">' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Value Range:</label>' +
                '<input type="number" id="paramMinVal' + index + '" placeholder="Minimum value" value="1">' +
                '<input type="number" id="paramMaxVal' + index + '" placeholder="Maximum value" value="10">' +
                '</div>' +
                '<div class="checkbox-group">' +
                '<input type="checkbox" id="paramSorted' + index + '">' +
                '<label for="paramSorted' + index + '">Generate Sorted Array</label>' +
                '</div>' +
                '<div class="checkbox-group">' +
                '<input type="checkbox" id="paramDistinct' + index + '">' +
                '<label for="paramDistinct' + index + '">Distinct Elements Only</label>' +
                '</div>';
            break;
        
        case 'intMatrix':
            container.innerHTML = 
                '<div class="form-group">' +
                '<label>Row Size Range:</label>' +
                '<input type="number" id="paramRowSize' + index + '" placeholder="Maximum rows" value="10">' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Column Size Range:</label>' +
                '<input type="number" id="paramColSize' + index + '" placeholder="Maximum columns" value="10">' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Value Range:</label>' +
                '<input type="number" id="paramMinVal' + index + '" placeholder="Minimum value" value="1">' +
                '<input type="number" id="paramMaxVal' + index + '" placeholder="Maximum value" value="10">' +
                '</div>';
            break;

        case 'charMatrix':
            container.innerHTML = 
                '<div class="form-group">' +
                '<label>Row Size Range:</label>' +
                '<input type="number" id="paramRowSize' + index + '" placeholder="Maximum rows" value="10">' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Column Size Range:</label>' +
                '<input type="number" id="paramColSize' + index + '" placeholder="Maximum columns" value="10">' +
                '</div>' +
                '<div class="form-group">' +
                '<label>Character Set:</label>' +
                '<select id="charSetType' + index + '" onchange="toggleCustomCharSet(' + index + ')">' +
                '<option value="az">Lowercase (a-z)</option>' +
                '<option value="AZ">Uppercase (A-Z)</option>' +
                '<option value="azAZ">Both Cases (a-z, A-Z)</option>' +
                '<option value="custom">Custom Characters</option>' +
                '</select>' +
                '</div>' +
                '<div id="customCharSet' + index + '" style="display: none;">' +
                '<label>Custom Characters:</label>' +
                '<input type="text" id="customChars' + index + '" placeholder="}g4t@m">' +
                '</div>';
            break;
            
        case 'number':
            container.innerHTML = 
                '<div class="form-group">' +
                '<label>Value Range:</label>' +
                '<input type="number" id="paramMinVal' + index + '" placeholder="Minimum value" value="1">' +
                '<input type="number" id="paramMaxVal' + index + '" placeholder="Maximum value" value="10">' +
                '</div>';
            break;
            
        case 'binary':
            container.innerHTML = 
                '<div class="form-group">' +
                '<label>Maximum Length:</label>' +
                '<input type="number" id="paramMaxLength' + index + '" placeholder="Maximum length" value="10">' +
                '</div>';
            break;
            
        case 'string':
        case 'char':
            container.innerHTML = 
                (type === 'string' ? 
                '<div class="form-group">' +
                '<label>Maximum Length:</label>' +
                '<input type="number" id="paramMaxLength' + index + '" placeholder="Maximum length" value="10">' +
                '</div>' : '') +
                '<div class="form-group">' +
                '<label>Character Set:</label>' +
                '<select id="charSetType' + index + '" onchange="toggleCustomCharSet(' + index + ')">' +
                '<option value="az">Lowercase (a-z)</option>' +
                '<option value="AZ">Uppercase (A-Z)</option>' +
                '<option value="azAZ">Both Cases (a-z, A-Z)</option>' +
                '<option value="custom">Custom Characters</option>' +
                '</select>' +
                '</div>' +
                '<div id="customCharSet' + index + '" style="display: none;">' +
                '<label>Custom Characters:</label>' +
                '<input type="text" id="customChars' + index + '" placeholder="}g4t@m">' +
                '</div>';
            break;
    }
}

function generateArrayGenerator(index) {
    const name = document.getElementById('paramName' + index).value || 'param' + index;
    const minVal = document.getElementById('paramMinVal' + index).value;
    const maxVal = document.getElementById('paramMaxVal' + index).value;
    const sorted = document.getElementById('paramSorted' + index).checked;
    const distinct = document.getElementById('paramDistinct' + index).checked;

    let code = '// Generate random array for ' + name + '\n';
    code += 'vector<int> generateArray' + index + '(int size) {\n';
    code += '    vector<int> arr(size);\n\n';
    
    if (distinct) {
        code += '    set<int> unique;\n';
        code += '    while(unique.size() < size) {\n';
        code += '        unique.insert(rand() % (' + maxVal + ' - ' + minVal + ' + 1) + ' + minVal + ');\n';
        code += '    }\n';
        code += '    arr.assign(unique.begin(), unique.end());\n';
    } else {
        code += '    for(int i = 0; i < size; i++) {\n';
        code += '        arr[i] = rand() % (' + maxVal + ' - ' + minVal + ' + 1) + ' + minVal + ';\n';
        code += '    }\n';
    }

    if (sorted) {
        code += '    sort(arr.begin(), arr.end());\n';
    }

    code += '    return arr;\n';
    code += '}\n\n';
    return code;
}

function generateMatrixGenerator(index, type) {
    const name = document.getElementById('paramName' + index).value || 'param' + index;
    const isCharMatrix = type === 'charMatrix';
    
    let code = `// Generate random ${isCharMatrix ? 'character' : 'integer'} matrix for ${name}\n`;
    code += `vector<vector<${isCharMatrix ? 'char' : 'int'}>> generateMatrix${index}(int rows, int cols) {\n`;
    code += `    vector<vector<${isCharMatrix ? 'char' : 'int'}>> matrix(rows, vector<${isCharMatrix ? 'char' : 'int'}>(cols));\n\n`;
    
    if (isCharMatrix) {
        const charSetType = document.getElementById('charSetType' + index).value;
        let charSet;
        switch(charSetType) {
            case 'az': charSet = 'abcdefghijklmnopqrstuvwxyz'; break;
            case 'AZ': charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; break;
            case 'azAZ': charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; break;
            case 'custom': charSet = document.getElementById('customChars' + index).value; break;
        }
        code += `    string charset = "${charSet}";\n`;
        code += '    for(int i = 0; i < rows; i++) {\n';
        code += '        for(int j = 0; j < cols; j++) {\n';
        code += '            matrix[i][j] = charset[rand() % charset.length()];\n';
        code += '        }\n';
        code += '    }\n';
    } else {
        const minVal = document.getElementById('paramMinVal' + index).value;
        const maxVal = document.getElementById('paramMaxVal' + index).value;
        code += '    for(int i = 0; i < rows; i++) {\n';
        code += '        for(int j = 0; j < cols; j++) {\n';
        code += `            matrix[i][j] = rand() % (${maxVal} - ${minVal} + 1) + ${minVal};\n`;
        code += '        }\n';
        code += '    }\n';
    }
    
    code += '    return matrix;\n}\n\n';
    return code;
}

function generateBinaryStringGenerator(index) {
    const name = document.getElementById('paramName' + index).value || 'param' + index;
    const maxLength = document.getElementById('paramMaxLength' + index).value;

    return `string generateBinaryString${index}(int length) {
    string result(length, '0');
    for(int i = 0; i < length; i++) {
        result[i] = (rand() % 2) ? '1' : '0';
    }
    return result;
}\n\n`;
}

function generateStringGenerator(index) {
    const name = document.getElementById('paramName' + index).value || 'param' + index;
    const charSetType = document.getElementById('charSetType' + index).value;
    let charSet;

    switch(charSetType) {
        case 'az':
            charSet = 'abcdefghijklmnopqrstuvwxyz';
            break;
        case 'AZ':
            charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'azAZ':
            charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'custom':
            charSet = document.getElementById('customChars' + index).value;
            break;
    }

    return `string generateString${index}(int length) {
    string charset = "${charSet}";
    string result(length, ' ');
    for(int i = 0; i < length; i++) {
        result[i] = charset[rand() % charset.length()];
    }
    return result;
}\n\n`;
}

function generateCharGenerator(index) {
    const name = document.getElementById('paramName' + index).value || 'param' + index;
    const charSetType = document.getElementById('charSetType' + index).value;
    let charSet;

    switch(charSetType) {
        case 'az':
            charSet = 'abcdefghijklmnopqrstuvwxyz';
            break;
        case 'AZ':
            charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'azAZ':
            charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'custom':
            charSet = document.getElementById('customChars' + index).value;
            break;
    }

    return `char generateChar${index}() {
    string charset = "${charSet}";
    return charset[rand() % charset.length()];
}\n\n`;
}

function toggleCustomCharSet(index) {
    const charSetType = document.getElementById('charSetType' + index).value;
    const customCharSetDiv = document.getElementById('customCharSet' + index);
    customCharSetDiv.style.display = charSetType === 'custom' ? 'block' : 'none';
}
function getParameterSignature(type, name) {
    switch(type) {
        case 'array':
            return 'vector<int>& ' + name;
        case 'intMatrix':
            return 'vector<vector<int>>& ' + name;
        case 'charMatrix':
            return 'vector<vector<char>>& ' + name;
        case 'binary':
        case 'string':
            return 'string& ' + name;
        case 'char':
            return 'char ' + name;
        default:
            return 'int ' + name;
    }
}
function getReturnTypeSignature(type) {
    switch(type) {
        case 'vector':
            return 'vector<int>';
        case 'string':
        case 'binary':
            return 'string';
        case 'bool':
            return 'bool';
        case 'char':
            return 'char';
        default:
            return 'int';
    }
}

function generateCode() {
    const count = parseInt(document.getElementById('paramCount').value);
    const hasMultipleAnswers = document.getElementById('multipleAnswersCheckbox').checked;
    let code = '#include <bits/stdc++.h>\nusing namespace std;\n\n';
    const returnType = document.getElementById('returnType').value;

    if (hasMultipleAnswers) {
        code += '// Custom comparator function for solution verification\n';
        code += generateComparatorFunction(returnType) + '\n\n';
    }
    // Generate solution function signature
    code += '// Your solution to test\n';
    code += getReturnTypeSignature(returnType) + ' solution(';
    let params = [];
    for (let i = 0; i < count; i++) {
        const type = document.getElementById('paramType' + i).value;
        const name = document.getElementById('paramName' + i).value || 'param' + i;
        params.push(getParameterSignature(type, name));
    }
    code += params.join(', ') + ') {\n    // Replace with your solution\n    return 0;\n}\n\n';

    // Generate brute force function
    code += '// Brute force solution for verification\n';
    code += getReturnTypeSignature(returnType) + ' bruteForceSolution(';
    code += params.join(', ') + ') {\n    // Replace with brute force solution\n    return 0;\n}\n\n';

    // Generate parameter generators
    for (let i = 0; i < count; i++) {
        const type = document.getElementById('paramType' + i).value;
        if (type === 'array') {
            code += generateArrayGenerator(i);
        } else if (type === 'binary') {
            code += generateBinaryStringGenerator(i);
        } else if (type === 'string') {
            code += generateStringGenerator(i);
        } else if (type === 'char') {
            code += generateCharGenerator(i);
        } else if (type === 'intMatrix' || type === 'charMatrix') {
            code += generateMatrixGenerator(i, type);
        }
    }

    // Generate main function
    code += generateMainFunction(count, hasMultipleAnswers);

    document.getElementById('codeOutput').style.display = 'block';
    document.getElementById('generatedCode').value = code;
}

function generateMainFunction(count, hasMultipleAnswers) {
    let code = 'int main() {\n';
    code += '    srand(time(0));\n';
    code += '    int numTests = 100;\n\n';
    
    code += '    for(int test = 1; test <= numTests; test++) {\n';
    
    // Generate parameters
    for (let i = 0; i < count; i++) {
        const type = document.getElementById('paramType' + i).value;
        const name = document.getElementById('paramName' + i).value || 'param' + i;
        
        switch(type) {
            case 'array':
                const maxSize = document.getElementById('paramSize' + i).value;
                code += `        int size${i} = rand() % ${maxSize} + 1;\n`;
                code += `        vector<int> ${name} = generateArray${i}(size${i});\n`;
                break;
            case 'intMatrix':
            case 'charMatrix':
                const maxRows = document.getElementById('paramRowSize' + i).value;
                const maxCols = document.getElementById('paramColSize' + i).value;
                code += `        int rows${i} = rand() % ${maxRows} + 1;\n`;
                code += `        int cols${i} = rand() % ${maxCols} + 1;\n`;
                code += `        auto ${name} = generateMatrix${i}(rows${i}, cols${i});\n`;
                break;
            case 'binary':
            case 'string':
                const maxLength = document.getElementById('paramMaxLength' + i).value;
                code += `        int len${i} = rand() % ${maxLength} + 1;\n`;
                code += `        string ${name} = generate${type === 'binary' ? 'BinaryString' : 'String'}${i}(len${i});\n`;
                break;
            case 'char':
                code += `        char ${name} = generateChar${i}();\n`;
                break;
            default:
                const minVal = document.getElementById('paramMinVal' + i).value;
                const maxVal = document.getElementById('paramMaxVal' + i).value;
                code += `        int ${name} = rand() % (${maxVal} - ${minVal} + 1) + ${minVal};\n`;
        }
    }

    let paramNames = [];
    for (let i = 0; i < count; i++) {
        paramNames.push(document.getElementById('paramName' + i).value || 'param' + i);
    }

    code += '\n        // Get results from both solutions\n';
    const returnType = document.getElementById('returnType').value;
    code += `        ${getReturnTypeSignature(returnType)} result1 = solution(${paramNames.join(', ')});\n`;
    code += `        ${getReturnTypeSignature(returnType)} result2 = bruteForceSolution(${paramNames.join(', ')});\n`;
    
    code += '        // Compare results\n';
    if (hasMultipleAnswers) {
        code += '        if(!areAnswersEquivalent(result1, result2)) {\n';
    } else {
        code += '        if(result1 != result2) {\n';
    }
    
    // Print parameters on mismatch
    for (let i = 0; i < count; i++) {
        const type = document.getElementById('paramType' + i).value;
        const name = document.getElementById('paramName' + i).value || 'param' + i;
        
        switch(type) {
            case 'array':
                code += `            cout << "${name} size: " << ${name}.size() << "\\n";\n`;
                code += `            cout << "${name} elements: ";\n`;
                code += `            for(int x : ${name}) cout << x << " ";\n`;
                code += '            cout << "\\n";\n';
                break;
            case 'intMatrix':
            case 'charMatrix':
                code += `            cout << "${name} dimensions: " << ${name}.size() << "x" << ${name}[0].size() << "\\n";\n`;
                code += `            cout << "${name} elements:\\n";\n`;
                code += `            for(const auto& row : ${name}) {\n`;
                code += `                for(const auto& elem : row) cout << elem << " ";\n`;
                code += `                cout << "\\n";\n`;
                code += `            }\n`;
                break;
            case 'binary':
            case 'string':
                code += `            cout << "${name}: " << ${name} << "\\n";\n`;
                code += `            cout << "${name} length: " << ${name}.length() << "\\n";\n`;
                break;
            default:
                code += `            cout << "${name}: " << ${name} << "\\n";\n`;
        }
    }
    
    // Print results
    code += '            cout << "Your solution output: ';
    switch(returnType) {
        case 'vector':
            code += '";\n            for(int x : result1) cout << x << " ";\n';
            break;
        case 'bool':
            code += '" << (result1 ? "true" : "false") << "\\n";\n';
            break;
        default:
            code += '" << result1 << "\\n";\n';
    }
    code += '            cout << "Brute Force solution output: ';
    switch(returnType) {
        case 'vector':
            code += '";\n            for(int x : result2) cout << x << " ";\n';
            break;
        case 'bool':
            code += '" << (result2 ? "true" : "false") << "\\n";\n';
            break;
        default:
            code += '" << result2 << "\\n";\n';
    }
    code += '            return 0;\n';
    code += '        }\n\n';
    
    code += '        cout << "Test " << test << " passed\\n";\n';
    code += '    }\n\n';
    code += '    cout << "All tests passed!\\n";\n';
    code += '    return 0;\n}\n';

    return code;
}
function generateComparatorFunction(returnType) {
    let code = 'bool areAnswersEquivalent(';
    code += getReturnTypeSignature(returnType) + ' answer1, ';
    code += getReturnTypeSignature(returnType) + ' answer2) {\n';
    
    // Add template code based on return type
    switch(returnType) {
        case 'vector':
            code += '    // Example: Check if vectors have same elements in any order\n';
            code += '    if(answer1.size() != answer2.size()) return false;\n';
            code += '    vector<int> sorted1 = answer1;\n';
            code += '    vector<int> sorted2 = answer2;\n';
            code += '    sort(sorted1.begin(), sorted1.end());\n';
            code += '    sort(sorted2.begin(), sorted2.end());\n';
            code += '    return sorted1 == sorted2;\n';
            break;
        
        case 'string':
            code += '    // Example: Check if strings are rotations of each other\n';
            code += '    if(answer1.length() != answer2.length()) return false;\n';
            code += '    string temp = answer1 + answer1;\n';
            code += '    return temp.find(answer2) != string::npos;\n';
            break;
            
        case 'intMatrix':
        case 'vector<vector<int>>':
            code += '    // Example: Check if matrices have same elements\n';
            code += '    if(answer1.size() != answer2.size() || answer1[0].size() != answer2[0].size()) return false;\n';
            code += '    vector<int> flat1, flat2;\n';
            code += '    for(const auto& row : answer1) flat1.insert(flat1.end(), row.begin(), row.end());\n';
            code += '    for(const auto& row : answer2) flat2.insert(flat2.end(), row.begin(), row.end());\n';
            code += '    sort(flat1.begin(), flat1.end());\n';
            code += '    sort(flat2.begin(), flat2.end());\n';
            code += '    return flat1 == flat2;\n';
            break;

        case 'bool':
            code += '    // Direct comparison for boolean values\n';
            code += '    return answer1 == answer2;\n';
            break;
            
        default:
            code += '    // Replace with your custom comparison logic\n';
            code += '    // Example: Check if absolute difference is within epsilon\n';
            code += '    const double epsilon = 1e-9;\n';
            code += '    return abs(answer1 - answer2) <= epsilon;\n';
    }
    
    code += '}\n';
    return code;
}
function copyCode() {
    const codeArea = document.getElementById('generatedCode');
    codeArea.select();
    document.execCommand('copy');
    alert('Code copied to clipboard!');
}