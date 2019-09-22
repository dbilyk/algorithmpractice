function Maze (rows,columns){

  let _maze
  this.rowCount = rows
  this.colCount = columns

  let init = ()=>{
    result = []

    for(let i=0;i<rows;i++){
      let newRow = []
      
      for(let j=0;j<columns;j++){
        let cell
        if(j === 0 || j === columns-1){
          cell = new Cell(i,j,true)
          newRow.push(cell)
        }
        else if(i === 0 || i ===rows -1){
          cell = new Cell(i,j,true)
          newRow.push(cell)
        }
        else{
          cell = new Cell(i,j,(Math.random()>0.7)?true:false)
          newRow.push(cell)
        }


      }
      result.push(newRow)
    }

    let exitColIndex = 1 + Math.floor(Math.random()*columns-1)
    let exitRowIndex = (Math.random() > 0.5) ? 0 : rows-1
    result[exitRowIndex][exitColIndex].isWall = false

    _maze = result 
  }

  init()
  this.getMaze = ()=>{
    return _maze
  }
  this.forEachCell = (func)=>{
    for(let i=0;i<this.rowCount;i++){
      for(let j=0; j<this.colCount; j++){
        func(_maze[i][j])

      }
    } 

  }
  
  let _isInBounds = (row,col)=>{
    (row >=0 && row < this.rowCount && col >= 0 && col < this.colCount)?true:false
  }

  

  let findExitHelper = (maze,row,col)=>{
    if(!_isInBounds){
      return true
    }
    else if(maze[row][col].isWall){
      return false
    }
    else{
      
    }


  }

  this.findExit = (startRow,startCol)=>{
    findExitHelper(_maze,row,col)
  }
  document.addEventListener("startMaze",(e)=>{
    console.log(e.detail)
    let startRowColArray = e.detail.split(",")
    this.findExit(parseInt(startRowColArray[0]),parseInt(startRowColArray[1]))
  })
}


function Cell(row,col, isWall){
  this.row      = row,
  this.col      = col,
  this.isMarked = false,
  this.isBad    = false,
  this.isWall   = isWall
}

function MazeViewController(mazeInstance){
  let cellSize   = 30,
      wallColor  = "#aaa",
      floorColor = "#eee",
      markedColor = "#f55",
      badColor = "#ddd",

      uiCells    = {}


  this.updateUiCell = (row,col)=>{
    let cell = uiCells[`${row},${col}`]
    cell.style.backgroundColor = (cell.isMarked)?markedColor:floorColor
    cell.style.backgroundColor = (cell.isBad)?badColor:floorColor
    
    if (cell.isMarked || cell.isBad){
      cell.style.borderRadius = 15 + "px"
    }
    
    
  }

  
  //populate the View dynamically
  mazeInstance.forEachCell((cell)=>{
    let uiCell = document.createElement("div")
    uiCell.id = `${cell.row},${cell.col}`
    uiCell.className = (cell.isWall)?"wall":"floor"
    uiCell.style.width = cellSize + "px"
    uiCell.style.height = cellSize + "px"
    uiCell.style.position = "absolute"
    uiCell.style.top = (cell.row * 30) + "px"
    uiCell.style.left = (cell.col * 30) + "px"
    
    uiCell.style.backgroundColor = (cell.isWall)?wallColor:floorColor
    document.getElementsByTagName("body")[0].appendChild(uiCell)

    //start listening to each cell to start the maze.
    uiCell.addEventListener("click",(e=>{
      console.log(e)
      let startEvent = new CustomEvent("startMaze", {detail:e.target.id})
      document.dispatchEvent(startEvent)

      
    }))
    uiCells[`${cell.row},${cell.col}`] = uiCell
    
  })
  
}



