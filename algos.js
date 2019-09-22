//recursion practice


//Variant on the algo below, but only print the dice rolls that add up to some number. --------------------------------------------

let sumCount1 = [0]
let sumCount2 = [0]

function diceSumHelper(diceLeft,choices,desiredSum){
  

  if(diceLeft === 0){
    let finalSum = choices.reduce((a,b)=> a+b,0)
    if(finalSum === desiredSum){
      console.log(choices)
    }
  }
  else{
    //using backtracking to explroe each option with a shared array.
    for(let i=1; i<=6; i++){
      //choose
      choices.push(i)

      //if the choices that we know about so far add up to the same or greater value than our target value, then don't bother exploring anymore.
      let sumWithNewValue = choices.reduce((a,b)=> a+b,0)
      if(sumWithNewValue > desiredSum) {
        choices.pop()
        continue
      }
      else {
        //explore
        diceSumHelper(diceLeft - 1, choices, desiredSum)

        //unchoose
        choices.pop()
      }
    }    
  }
}

function getDiceCombosForSum(diceCount, desiredSum){
  diceSumHelper(diceCount, [], desiredSum)
}

getDiceCombosForSum(3,3)

console.log("-----------")
//given N 6-sided dice, print all possible combinations of them.----------------------------------------
function diceCountHelper(diceLeft,choices){
  

  if(diceLeft === 0){
    console.log(choices)
  }
  else{
    //using backtracking to explroe each option with a shared array.
    for(let i=1; i<=6; i++){
      //choose
      choices.push(i)
      //explore
      diceCountHelper(diceLeft - 1, choices)
      //unchoose
      choices.pop()
    }    
  }
}

function getDiceCombos(diceCount){
  diceCountHelper(diceCount, [])
}

getDiceCombos(3)



//reverse lines----------------------------------------------------------------------------------------
function reverseHelper(linesLeft, result){
  if(linesLeft == 0){
    return result
  }
  else{
    let linesArr = linesLeft.split(/\n/)
    let newLinesLeft = linesArr.reduce((prev,curr,i)=>{
      if(i!=linesArr.length-1) return prev + "\n" + linesArr[i]
      else return prev + ""
    },"")
    return reverseHelper(newLinesLeft,result + linesArr[linesArr.length-1])
  }
}

function reverseLines(string){
  return reverseHelper(string, "")
}

//console.log(reverseLines("once again,\n leave the train,\n all is lost, \n father frost."))




//check if a string is a palindrome----------------------------------------------------------------

function isPalindrome(remainingString){
  console.log(remainingString)
  let s = remainingString.toLowerCase()

  //base case
  if(remainingString.length <= 1){
    return true
  }
  if(s.charAt(0) === s.charAt(s.length-1)){
    return isPalindrome(s.slice(1,s.length-1))
  }
  else{
    return false
  }
}
//console.log(isPalindrome("a"))



//Print all ways to rearrange the characters in a string--------------------------------------------.
function stringAnagramsHelper(choiceChars, resultStr){
  //base case
  if(choiceChars.length === 0){
    console.log(resultStr)
  }
  else{
    let chars = choiceChars.split('')

    for (let i = 0; i < chars.length; i++) {
      //choose
      let c = chars[i]
      
      //explore
      let remainingChoices = choiceChars.slice(0,i)+choiceChars.slice(i+1)
      let nextResult = resultStr + c
      stringAnagramsHelper(remainingChoices, nextResult)

      //unchoose - not needed because I'm not operating on variables shared between loop iterations...
      
    }
  }
}

function stringAnagrams(str){
  stringAnagramsHelper(str, "")
}
//stringAnagrams("abc")



//print all binary numbers given the number of digits N. --------------------------------------------
function printBinaryHelper(digitCount, prefix){
  if(digitCount === 0){
    console.log(prefix)
  }
  else{
    printBinaryHelper(digitCount - 1, prefix + "0")
    printBinaryHelper(digitCount - 1, prefix + "1")
  }
}

function printBinary(digitCount){
  if(digitCount == 0){
    return null
  }
  else{
    printBinaryHelper(digitCount,"")
  }

}
//printBinary(3)




/*
function BooleanGridNS(){
  function generateGrid(rows,columns){
    result = []

    for(let i=0;i<rows;i++){
      let newRow = []
      for(let j=0;j<columns;j++){
        newRow.push(Math.round(Math.random(0,1)))
      }
      result.push(newRow)
    }

    return result 
  }

  function getRandomInRange(val){
    return Math.floor(Math.random() * val)
  }

  function getRandomNonWallPosition(grid,row,col){
    let counter = 0
    while(true){
      let randomRow    = getRandomInRange(row)
      let randomColumn = getRandomInRange(col)

      if(grid[randomRow][randomColumn] === 0){
        return [randomRow,randomColumn]
      }

      if (counter === 100) {
        throw "tried too many times."
      }

      counter ++
    }
  }


  function Grid(){
    let rowCount         = 20
    let colCount         = 20
        this.data        = generateGrid(rowCount,colCount)
        this.startingPos = getRandomNonWallPosition(this.data, rowCount, colCount)
        this.endingPos   = getRandomNonWallPosition(this.data, rowCount, colCount)
        this.path        = []
        this.getNode     = (rowColArr)=>{
          return this.data[rowColArr[0]][rowColArr[1]]
        }
        this.nodeIsInBounds = (rowColArr)=>{
          let rowIndex = rowColArr[0]
          let colIndex = rowColArr[1]
          if(rowIndex < 0 || rowIndex > rowCount - 1){
            return false
          }
          else if(colIndex < 0 || colIndex > colCount -1){
            return false
          }
          else{
            return true
          }
        }
        this.nodesDoMatch = (nodeArr1,nodeArr2)=>{
          return JSON.stringify(nodeArr1) === JSON.stringify(nodeArr2)
        }
        this.shortestStepPath = null
        
  }
  
  let testGrid = new Grid()

  
  function getShortestPath(gridData){
    nextStep(gridData, gridData.startingPos,gridData.startingPos,gridData.endingPos,0)
    return gridData.shortestStepPath

  }

  console.log(getShortestPath(testGrid))
  //find and store the available nodes with a visited flag.
  //if we are on a node with NO available path, return null.
  //if we are on a node with options, move to the option that tends best towards the goal first
  //if we get to a node with nowhere to go but where we came from, mark this node as spent and return back one and try other options.


  


  function nextStep(grid, previousPos,currentPos, targetPos, stepCounter){
    let currentRow = currentPos[0]
    let currentCol = currentPos[1]

    let neighborNodes = [
      [currentRow -1, currentCol],
      [currentRow+1,currentCol],
      [currentRow,currentCol-1],
      [currentRow,currentCol+1]]

    //for every neighbor of this node...
    for(let i = 0; i < 4;i++){

      //check if neighbor is a valid neighbor
      if(grid.nodeIsInBounds(neighborNodes[i]) === true){

        //if its a wall, then do nothing
        if(grid.getNode(neighborNodes[i]) === 1){
          continue
        }

        //if its a valid step...
        if(grid.getNode(neighborNodes[i]) === 0){
          //base case, we found the target.  Log the step value.
          if(grid.nodesDoMatch(neighborNodes[i],targetPos)){
            stepCounter += 1
            if(grid.shortestStepPath){
              if(stepCounter < grid.shortestStepPath){
                grid.shortestStepPath = stepCounter
              }
            }
            else{
              grid.shortestStepPath = stepCounter
            }            


          }
          else{
            //if current neighbor is the one we came from, do nothing, we don't have backtracking so we just break.
            if(grid.nodesDoMatch(neighborNodes[i],previousPos)){
              return
            }
            
            stepCounter +=1
            nextStep(grid, currentPos, neighborNodes[i],targetPos,stepCounter)
          
          }

        }


      }
    }    


  }

  

}
BooleanGridNS()
*/

/*
function factorialNS(){
  function getFactorialOf(val){
    if(val === 1){
      return 1
    }
    else{
      return val * getFactorialOf(val-1)
    }
  }

  let testValue = 10
  console.log(`The factorial of ${testValue} is ${getFactorialOf(testValue)}`)
}

*/


//A builder is looking to build a row of N houses that can be of K different colors. He has a goal of minimizing cost while ensuring that no two neighboring houses are of the same color.
//Given an N by K matrix where the nth row and kth column represents the cost to build the nth house with kth color, return the minimum cost which achieves this goal.


//sum [n][k]
// [
//   [4000,5000,2300],
//   [2000,1500,1000],
//   [6500,3000,3500]
  
// ]

// function Problem2(){
//   function minCostCalc(houseCount,ColorCount){

//   }


// }





// Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
// For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.
// Follow-up: Can you do this in O(N) time and constant space?

//[2,3,12,-5,1,1,-23]
//[40,42 ,13,12,1,1,-23,-23]

//[1,1,1,3,1,-1,1,0]

//call the recursive sum function twice - once for the first positive element, and once for the second positive element.
//take the first element and start 
// function adjacentSums() {
//   function getMaxNonAdjacentSum(intArray){

//     let nonAdjacentSums = []
  
//     for(let i = 0; i< intArray.length; i++){
//       let currentVal = intArray[intArray]
  
//       if(currentVal<=0){
//         continue
//       }
//       else{
//         nonAdjacentSums.push(recursiveSum())
//       }
//     }
    
  
//   }
  
//   function recursiveSum(index, subArray){
    
//   }
// }
