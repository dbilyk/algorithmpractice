let events = {
  onCellChange: "onCellChange"
}


function MazeModel (rows,columns){

  let _maze,
  _isRunning     = false
  
  this.rowCount = rows
  this.colCount = columns
  

  

  this.restart = ()=>{
    result = []

    for(let i=0;i<rows;i++){
      let newRow = []
      
      for(let j=0;j<columns;j++){
        let cell
        if(j === 0 || j === columns-1){
          cell = new Cell(i,j,true)
          newRow.push(cell)
        }
        else if(i === 0 || i === rows - 1){
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
    result[exitRowIndex][exitColIndex].setWall(false)

    _maze = result 
  }

  this.getMaze = ()=>{
    return _maze
  }
  this.forEachCell = (func)=>{
    for(let i=0;i < this.rowCount;i++){
      for(let j=0; j < this.colCount; j++){
        func(_maze[i][j])

      }
    } 

  }
  
  let _isInBounds = (row,col)=>{
    (row >=0 && row < this.rowCount && col >= 0 && col < this.colCount)?true:false
  }

  this.cell = (r,c)=>{
    if(typeof r === "string" && c === undefined){
     let rowColArr =  r.split(",")
     return _maze[parseFloat(rowColArr[0])][parseFloat(rowColArr[1])] 
    }
    else{
      return _maze[r][c]
    }
  }
  
  this.setRunningStatus = (bool)=>{
    _isRunning = bool
  }
  this.getRunningStatus = ()=>{
    return _isRunning
  }

  let findExitHelper = (row,col,lastCell)=>{
    if(!_isInBounds && !lastCell._isWall){
      return true
    }

    else if(_maze[row][col].isWall()){
      return false
    }
    else if(_maze[row][col].isTainted()){


    }
    else{
      //TODO: recursive calls to each side node.
      
    }
  }

  this.findExit = (row,col)=>{
    findExitHelper(row,col,[])
  }
  
}




//-----------------------------VIEW CONTROLLER------------------------------------------------

function MazeViewController(){
  let _view = new MazeView()
  let _model = new MazeModel(20,20)
      

  //clicking a cell should restart everything from the new location
  let onCellClick = (e)=>{

    //tell the model to restart search from new location.
    let clickedCell = _model.cell(e.target.id)
    start(clickedCell.row(),clickedCell.col())

    //RECURSIVE FUNCTION
    _model.findExit(clickedCell.row(),clickedCell.col())
    
  }

  


  let start = (row,col)=>{
    //restart the model.
    _view.removeAllCellsFromDOM()
    _model.restart()

    //load uiCells
    _model.forEachCell((cellData)=>{
      _view.createCell(cellData)
      let uiCell = _view.getUiCell(cellData)
      _view.updateCellStyles(cellData, uiCell)
      _view.bindCallbacksToCellClicks(uiCell, onCellClick)
      _view.addCellToDOM(uiCell)
    })
    
    //start listening to data changes
    document.addEventListener(events.onCellChange,(e)=>{
      let newCellData = e.detail
      
      let clickedUiCell = _view.getUiCell(newCellData)
      _view.updateCellStyles(newCellData,clickedUiCell)
    })
    
    
  }
  start()  
  
  
  


}

let MazeVC = new MazeViewController()




//---------------------------------------------VIEW------------------------------------------------


function MazeView(){

  let _cellSize = 30,
      wallColor  = "#aaa",
      floorColor = "#eee",
      markedColor = "#f55",
      badColor = "#ddd",
      _uiCells    = {}
      

  this.getUiCell = (cellData)=>{
    return _uiCells[`${cellData.row()},${cellData.col()}`]
  }

  //will be the com
  this.bindCallbacksToCellClicks = (uiCellNode, callback)=>{
    uiCellNode.addEventListener("click", (e)=>{
      callback(e)
    })
    
  }

  this.createCell = (cellData)=>{
    
    let uiCell    = document.createElement("div"),
        elementID = `${cellData.row()},${cellData.col()}`

    uiCell.id             = elementID
    uiCell.className      = (cellData.isWall())?"wall":"floor"
    uiCell.style.width    = _cellSize + "px"
    uiCell.style.height   = _cellSize + "px"
    uiCell.style.position = "absolute"
    uiCell.style.top      = (cellData.row() * _cellSize) + "px"
    uiCell.style.left     = (cellData.col() * _cellSize) + "px"

    _uiCells[elementID] = uiCell

  }


  this.updateCellStyles = (cellData,uiCell)=>{
    

    if(cellData.isTainted()){
      uiCell.style.backgroundColor = badColor
    }
    else if (cellData.isMarked()){
      uiCell.style.backgroundColor = markedColor
    }
    else if (cellData.isWall()){
      uiCell.style.backgroundColor = wallColor
    }
    else{
      uiCell.style.backgroundColor = floorColor
    }


    if (cellData.isMarked() || cellData.isTainted()){
      uiCell.style.borderRadius = 15 + "px"
    }
    else{
      uiCell.style.borderRadius = 0 + "px"
    }
  }
    
  this.addCellToDOM = (uiCell)=>{
    document.getElementsByTagName("body")[0].appendChild(uiCell)
  }

  this.removeAllCellsFromDOM = ()=>{
    document.getElementsByTagName("body")[0].childNodes.forEach((cell)=>cell.remove())
  }

  

}





// ---------------------------------HELPERS-------------------------------------------------------



function Cell(row,col, isWall){


  let _row            = row,
      _col            = col,
      _isMarked       = false,
      _isTainted      = false,
      _isWall         = isWall,
      _that           = this,
      _didChangeEvent



  let sendCellDidChangeEvent = ()=>{
    if (!_didChangeEvent){
      _didChangeEvent = new Event(events.onCellChange,{detail:_that})
    }
    document.dispatchEvent(_didChangeEvent)
  }

  this.row    = ()=>{
    return _row
  }
  this.col    = ()=>{
    return _col
  }
  this.isWall = ()=>{
    return _isWall
  }

  this.setWall = (bool)=>{
    _isWall = bool
  }

  this.isMarked = ()=>{
    return _isMarked
  }

  this.isTainted = ()=>{
    return _isTainted
  }


  this.mark   = ()=>{
    _isMarked = true
    sendCellDidChangeEvent()

  }
  this.unmark = ()=>{
    _isMarked = false
    sendCellDidChangeEvent()
  }
  this.taint  = ()=>{
    _isTainted = true
    sendCellDidChangeEvent()
  }
  this.untaint = ()=>{
    _isTainted = false
    sendCellDidChangeEvent()
    
  }
}

