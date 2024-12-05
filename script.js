function dayOne() {
    const inputText = document.getElementById('inputText').value;
    const output = document.getElementById('output');
    const values = inputText.split(/\s+/); 
    const evenIndexValues = [];
    const oddIndexValues = [];
    let distanceSum = 0;
    values.forEach((value, index) => {
        if (index % 2 === 0) { 
            evenIndexValues.push(value);
          } else {
            oddIndexValues.push(value);
          }
    });
    evenIndexValues.sort();
    oddIndexValues.sort();
    for(let i = 0; i<evenIndexValues.length; i++){
        if(evenIndexValues[i]>oddIndexValues[i]){
            distanceSum += (evenIndexValues[i] - oddIndexValues[i]);
        }
        else{
            distanceSum += (oddIndexValues[i] - evenIndexValues[i]);
        }
    }
    console.log(distanceSum);

    let amountOfRepeats = 0;
    let similarityScore = 0;
    evenIndexValues.forEach((value1)=>{
        oddIndexValues.forEach((value2)=>{
        if(value1==value2){
            amountOfRepeats++;
        }
        });
        similarityScore += (value1 * amountOfRepeats);
        amountOfRepeats = 0;
    });
    console.log(similarityScore);
    output.innerHTML = "Distance: " + distanceSum + "<br>Similarity score: " + similarityScore;
}

function dayTwo() {
    const inputText = document.getElementById("inputText2").value;
    const output = document.getElementById("output2");
    const lines = inputText.split(/\r?\n/);
    let safeReports = 0;

    lines.forEach((line) => {
        const levels = line.split(/\s+/).map(Number);
        
        if (isSafeReport(levels)) {
            safeReports++;
            return;
        }
        
        for (let i = 0; i < levels.length; i++) {
            const modifiedLevels = levels.filter((_, index) => index !== i);
            if (isSafeReport(modifiedLevels)) {
                safeReports++;
                break;
            }
        }
    });
    
    output.innerHTML = "Safe reports: " + safeReports;
}

function isSafeReport(levels) {
    const isIncreasing = levels.every((level, i) => 
        i === 0 || level > levels[i-1]
    );
    
    const isDecreasing = levels.every((level, i) => 
        i === 0 || level < levels[i-1]
    );

    const validDifferences = levels.every((level, i) => 
        i === 0 || Math.abs(level - levels[i-1]) >= 1 && Math.abs(level - levels[i-1]) <= 3
    );
    
    return (isIncreasing || isDecreasing) && validDifferences;
}

function dayThree(){
const inputText = document.getElementById("inputText3").value;
const output = document.getElementById("output3");
var total = 0;
var total2 = 0;
const regex = /mul\((\d+),(\d+)\)/g;
let match;

while ((match = regex.exec(inputText)) !== null) {
    total += Number(match[1])*Number(match[2]);
}

//part2
let tableMatch = [];
var splitByDo = inputText.split('do()');
splitByDo.forEach(line =>{
tableMatch.push(line.split('don\'t()')[0]);
});
while ((match = regex.exec(tableMatch)) !== null) {
    total2 += Number(match[1])*Number(match[2]);
}
output.innerHTML = "Total (part 1): " + total + "\nTotal (part 2): "+total2;
}

//dayFour

function dayFour(){
    const inputText = document.getElementById("inputText4").value;
    const output = document.getElementById("output4");

    var matrixRow = inputText.split("\n");
    var matrix = matrixRow.map(row => row.split(""));
    var sum = 0;
    var sum2 = 0;
    console.log(matrix);
    sum += findXMAS(matrix);
    sum2 += findX_Mas(matrix);
    matrix = rotateMatrix90(matrix);
    sum += findXMAS(matrix);
    sum2 += findX_Mas(matrix);
    console.log(matrix);
    matrix = rotateMatrix90(matrix);
    sum += findXMAS(matrix);
    sum2 += findX_Mas(matrix);
    console.log(matrix);
    matrix = rotateMatrix90(matrix);
    sum += findXMAS(matrix);
    sum2 += findX_Mas(matrix);
    console.log(matrix);
    output.innerHTML = "Total: "+sum + "\nX-MAS Total: " + sum2;

}
function findXMAS(matrix){
    const rows = matrix.length;
    const cols = matrix[0].length;
    var totalFound = 0;
    for(let j = 0; j<= cols; j++) {
        for (let i = 0; i <= rows - 4; i++) { // Ensure there is room for "XMAS"
            if (
                matrix[i][j] === 'X' &&
                matrix[i + 1][j] === 'M' &&
                matrix[i + 2][j] === 'A' &&
                matrix[i + 3][j] === 'S'
            ) {
                totalFound++;
            }
            if (
                matrix[i][j] === 'X' &&
                matrix[i + 1][j+1] === 'M' &&
                matrix[i + 2][j+2] === 'A' &&
                matrix[i + 3][j+3] === 'S'
            ) {
                totalFound++;
            }
        }
    }
    return totalFound;
    //part 1

}
function findX_Mas(matrix){
    const rows = matrix.length;
    const cols = matrix[0].length;
    var totalFound = 0;
    for(let j = 1; j< cols-1; j++) {
        for (let i = 1; i < rows-1; i++) { 
            if (
                matrix[i][j] === 'A' &&
                matrix[i + 1][j+1] === 'M' &&
                matrix[i - 1][j-1] === 'S' &&
                matrix[i + 1][j-1] === 'S' &&
                matrix[i - 1][j+1] === 'M'
            ) {
                totalFound++;
            }
        }
    }
    return totalFound;
}

function rotateMatrix90(matrix) {
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let rotated = Array.from({ length: cols }, () => Array(rows));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            rotated[col][rows - row - 1] = matrix[row][col];
        }
    }

    return rotated;
}