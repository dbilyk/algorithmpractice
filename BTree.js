"use strict"

/**
 * The value type can be "number" currently.
 * TreeDepth specifies how many nodes in the tree.
 * @param {string} valueType 
 * @param {number} treeDepth
 * @param {boolean} containsRandomValues
 */
function BTree(treeDepth, valueType, containsRandomValues){

   if(!treeDepth){
      throw new Error("treeDepth is a required parameter.")
   }


   let _treeNode = {
         value: undefined,
         left : undefined,
         right: undefined
      },
      _rootNode,
      _valueType = valueType ? valueType : "number"


   this.getRootNode = ()=>{
      return _rootNode 
   }

   let _getRandomValue = ()=>{
      switch (valueType){
         case "number":
            return Math.floor(Math.random()*100)
            break;
      }   
   }
   
   let recursiveMakeTree = (depth, counter)=>{
      
      //base case
      if(depth < 0){
         return
      }
      //recursive case
      
      else{
         let node   = {..._treeNode},
             random = Math.random()
         
         if(containsRandomValues){
            node.value = _getRandomValue()
         }
         else{ 
            node.value = counter.val
         }
         
         counter.val += 1
         node.left  = recursiveMakeTree(depth - 1, counter)
         node.right = recursiveMakeTree(depth - 1, counter)
         return node
      }

   
      

   }

   let init = ()=>{
      let counter = {val:0}
      _rootNode = recursiveMakeTree(treeDepth, counter)
      console.log(_rootNode)
   }

   init()

   
   
}