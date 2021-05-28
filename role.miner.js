var roleMiner = {
    run: function(creep){
        if(Object.keys(creep.memory).length < 4){
            var source = creep.room.find(FIND_SOURCES)
        if(creep.harvest(source[0])==ERR_NOT_IN_RANGE){
            creep.moveTo(source[0])
        }
        }else{

            if(JSON.stringify(creep.pos)==JSON.stringify(creep.memory.miningloc)){
                creep.memory.arrived = true;
                creep.harvest(Game.getObjectById(creep.memory.targetSource))
            }
            
            
        }
        if(creep.ticksToLive < 10){
            for(tile of Memory.miningTiles){
                if(tile.miner == creep.name){
                    tile.miner = "";
                }
                
            }
        }
    }
}
module.exports = roleMiner