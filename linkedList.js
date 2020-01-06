function __(){
    console.log(...arguments)
}

function LinkedList(isSinglyLinked, elementsArray){
    let _head = null,
        node = {data:null, next:null}
    
    let init = ()=>{
        let nextNode = null
        for(let i = elementsArray.length - 1;i >= 0;i--){
            let newNode = {...node}
            newNode.data = elementsArray[i]
            newNode.next = null
            if (i == elementsArray.length - 1){
                nextNode = newNode
                continue
            }
            
            newNode.next = nextNode
            
            if(i == 0){
                _head = newNode
            }
        }
    }
    
    init()
    this.getHead = ()=>{
        return {..._head}
    }
}

let ll = new LinkedList(true, ["s", "d","t"])
__(ll.getHead())