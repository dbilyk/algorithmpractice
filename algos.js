//recursion practice






//A builder is looking to build a row of N houses that can be of K different colors. He has a goal of minimizing cost while ensuring that no two neighboring houses are of the same color.
//Given an N by K matrix where the nth row and kth column represents the cost to build the nth house with kth color, return the minimum cost which achieves this goal.


//sum [n][k]
[
  [4000,5000,2300],
  [2000,1500,1000],
  [6500,3000,3500]
  
]

function Problem2(){
  function minCostCalc(houseCount,ColorCount){

  }


}





// Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
// For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.
// Follow-up: Can you do this in O(N) time and constant space?

//[2,3,12,-5,1,1,-23]
//[40,42 ,13,12,1,1,-23,-23]

//[1,1,1,3,1,-1,1,0]

//call the recursive sum function twice - once for the first positive element, and once for the second positive element.
//take the first element and start 
function adjacentSums() {
  function getMaxNonAdjacentSum(intArray){

    let nonAdjacentSums = []
  
    for(let i = 0; i< intArray.length; i++){
      let currentVal = intArray[intArray]
  
      if(currentVal<=0){
        continue
      }
      else{
        nonAdjacentSums.push(recursiveSum())
      }
    }
    
  
  }
  
  function recursiveSum(index, subArray){
    
  }
}
