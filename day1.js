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