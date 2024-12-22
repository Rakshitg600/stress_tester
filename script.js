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
            '<input type="text" id="paramName' + i + '" placeholder="e.g., array, n, k">' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Parameter Type:</label>' +
            '<select id="paramType' + i + '" onchange="showTypeSpecificInputs(' + i + ')">' +
            '<option value="array">Array</option>' +
            '<option value="number">Number</option>' +
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
    
    if (type === 'array') {
        container.innerHTML = 
            '<div class="form-group">' +
            '<label>Size Range:</label>' +
            '<input type="number" id="paramSize' + index + '" placeholder="Maximum size" value="100000">' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Value Range:</label>' +
            '<input type="number" id="paramMinVal' + index + '" placeholder="Minimum value" value="1">' +
            '<input type="number" id="paramMaxVal' + index + '" placeholder="Maximum value" value="1000000000">' +
            '</div>' +
            '<div class="checkbox-group">' +
            '<input type="checkbox" id="paramSorted' + index + '">' +
            '<label for="paramSorted' + index + '">Generate Sorted Array</label>' +
            '</div>' +
            '<div class="checkbox-group">' +
            '<input type="checkbox" id="paramDistinct' + index + '">' +
            '<label for="paramDistinct' + index + '">Distinct Elements Only</label>' +
            '</div>';
    } else {
        container.innerHTML = 
            '<div class="form-group">' +
            '<label>Value Range:</label>' +
            '<input type="number" id="paramMinVal' + index + '" placeholder="Minimum value" value="1">' +
            '<input type="number" id="paramMaxVal' + index + '" placeholder="Maximum value" value="1000000000">' +
            '</div>';
    }
}

function generateCode() {
    const count = parseInt(document.getElementById('paramCount').value);
    let code = '#include <bits/stdc++.h>\nusing namespace std;\n\n';

    // Generate solution function signature
    code += '// Your solution to test\n';
    code += 'int solution(';
    let params = [];
    for (let i = 0; i < count; i++) {
        const type = document.getElementById('paramType' + i).value;
        const name = document.getElementById('paramName' + i).value || 'param' + i;
        params.push(type === 'array' ? 'vector<int>& ' + name : 'int ' + name);
    }
    code += params.join(', ') + ') {\n    // Replace with your solution\n    return 0;\n}\n\n';

    // Generate brute force function
    code += '// Brute force solution for verification\n';
    code += 'int bruteForceSolution(' + params.join(', ') + ') {\n    // Replace with brute force solution\n    return 0;\n}\n\n';

    // Generate array generators
    for (let i = 0; i < count; i++) {
        const type = document.getElementById('paramType' + i).value;
        if (type === 'array') {
            code += generateArrayGenerator(i);
        }
    }

    // Generate main function
    code += 'int main() {\n';
    code += '    srand(time(0));\n';
    code += '    int numTests = 100;\n\n';
    
    // Generate test loop
    code += '    for(int test = 1; test <= numTests; test++) {\n';
    
    // Generate parameters
    for (let i = 0; i < count; i++) {
        const type = document.getElementById('paramType' + i).value;
        const name = document.getElementById('paramName' + i).value || 'param' + i;
        
        if (type === 'array') {
            const maxSize = document.getElementById('paramSize' + i).value;
            code += '        int size' + i + ' = rand() % ' + maxSize + ' + 1;\n';
            code += '        vector<int> ' + name + ' = generateArray' + i + '(size' + i + ');\n';
        } else {
            const minVal = document.getElementById('paramMinVal' + i).value;
            const maxVal = document.getElementById('paramMaxVal' + i).value;
            code += '        int ' + name + ' = rand() % (' + maxVal + ' - ' + minVal + ' + 1) + ' + minVal + ';\n';
        }
    }

    // Generate solution calls
    let paramNames = [];
    for (let i = 0; i < count; i++) {
        paramNames.push(document.getElementById('paramName' + i).value || 'param' + i);
    }

    code += '\n        // Get results from both solutions\n';
    code += '        int result1 = solution(' + paramNames.join(', ') + ');\n';
    code += '        int result2 = bruteForceSolution(' + paramNames.join(', ') + ');\n\n';
    
    code += '        // Compare results\n';
    code += '        if(result1 != result2) {\n';
    code += '            cout << "Found mismatch on test " << test << ":\\n";\n';
    
    // Print parameters
    for (let i = 0; i < count; i++) {
        const type = document.getElementById('paramType' + i).value;
        const name = document.getElementById('paramName' + i).value || 'param' + i;
        
        if (type === 'array') {
            code += '            cout << "' + name + ' size: " << ' + name + '.size() << "\\n";\n';
            code += '            cout << "' + name + ' elements:\\n";\n';
            code += '            for(int x : ' + name + ') cout << x << " ";\n';
            code += '            cout << "\\n";\n';
        } else {
            code += '            cout << "' + name + ': " << ' + name + ' << "\\n";\n';
        }
    }
    
    code += '            cout << "Your solution output: " << result1 << "\\n";\n';
    code += '            cout << "Expected output: " << result2 << "\\n";\n';
    code += '            return 0;\n';
    code += '        }\n\n';
    
    code += '        cout << "Test " << test << " passed\\n";\n';
    code += '    }\n\n';
    code += '    cout << "All tests passed!\\n";\n';
    code += '    return 0;\n}\n';

    document.getElementById('codeOutput').style.display = 'block';
    document.getElementById('generatedCode').value = code;
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

function copyCode() {
    const codeArea = document.getElementById('generatedCode');
    codeArea.select();
    document.execCommand('copy');
    alert('Code copied to clipboard!');
}