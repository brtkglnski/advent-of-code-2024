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

