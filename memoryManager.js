var memoryManager = {
    sources: function(room){
        console.log(room)
        var sources = _.filter(room.find(FIND_SOURCES));
        terr = new Room.Terrain("E1S14")
        
        Memory.miningTiles = [];
        
    for(source of sources){
        try{
            
       for(var i = -1; i <=1; i++){
           for(var j = -1; j<=1; j++){
               var newX = source.pos.x+i;
               var newY = source.pos.y+j;
               var existingMiner = room.lookForAt(LOOK_CREEPS, newX, newY)
               if(existingMiner.length > 0){
                   if(existingMiner[0].memory.role=="miner"){

                       existingMiner = existingMiner[0].name
                       
                    }else{existingMiner = ""}
               }
               if(terr.get(newX, newY)!=1){
                //   console.log(JSON.stringify(source))
                   Memory.miningTiles.push({loc: new RoomPosition(source.pos.x+i, source.pos.y+j, source.pos.roomName), adjSource: source.id, miner: existingMiner})
                   console.log("Added (" + newX + "," + newY + ")")
                   throw("done " + source);
               }
           }
       }
        }catch(e){
            console.log(e)
        }
    }
    }
}
module.exports=memoryManager;