// Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
// For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.
// Follow-up: Can you do this in O(N) time and constant space?

//[2,3,12,-5,1,1,-23]
//[40,42 ,13,12,1,1,-23,-23]

//[1,1,1,3,1,-1,1,0]

//call the recursive sum function twice - once for the first positive element, and once for the second positive element.
//take the first element and start 

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
  for(subArray)
  if(subArray[index] <= 0){
    return
  }
  for()
}