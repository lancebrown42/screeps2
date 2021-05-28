var roleTransport = {

    run: function (creep) {
      
        if(!creep.memory.tugging){
            
            var fares = creep.room.find(FIND_CREEPS,{
                filter:(fare)=>{
                    return(fare.memory.role=="miner" && fare.memory.arrived == false && !fare.memory.driver)
                }
            })
            // console.log(fares.length)
            if(fares.length > 0){
                fare = fares[0];
                Game.getObjectById(fare.id).memory.driver = creep.name;
                creep.memory.fare = fare.id;
                creep.memory.fareDest = fare.memory.miningloc;
                creep.memory.tugging = true;
            }
        }else{
            var fare = Game.getObjectById(creep.memory.fare)
            var destination = new RoomPosition(creep.memory.fareDest.x, creep.memory.fareDest.y, creep.memory.fareDest.roomName);
            if(!creep.pos.isNearTo(fare)){
                creep.say("🚖")
                creep.moveTo(fare)
            }else if(!creep.pos.isEqualTo(destination)&& !fare.pos.isEqualTo(destination)){
                // console.log(destination.x)
                creep.pull(fare);
                fare.move(creep);
                if(creep.pos.isEqualTo(Game.flags['PathStart'])){
                    creep.memory.narrow = true
                }
                if(creep.memory.narrow){
                    creep.moveByPath(Room.deserializePath('4831455566664555'))
                }else{
                    // console.log("moving to " + typeof destination)
                    creep.moveTo(destination);
                }

            }else if(creep.pos.isEqualTo(destination)){
                creep.pull(fare);
                fare.move(creep);
                creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0])
                
            }else{
                
                creep.memory.tugging = false;
                creep.memory.fare="";
                creep.memory.narrow = false;
            }
            if(creep.ticksToLive < 10){
                fare.memory.driver="";
            }

            
            
        }
        if(!creep.memory.tugging && creep.memory.hauling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.hauling = false;
            creep.say('🔄 gather');
        }
        if(!creep.memory.tugging && !creep.memory.hauling && creep.store.getFreeCapacity() == 0) {
            creep.memory.hauling = true;
            creep.say('⚡ haul');
        }
        if (!creep.memory.tugging && !creep.memory.hauling) {
            // creep.say('searching')
            var dropped = creep.room.find(FIND_DROPPED_RESOURCES)
            var tombs = creep.room.find(FIND_TOMBSTONES, {
                filter: (tomb) => {
                    return tomb.store[RESOURCE_ENERGY] > 0;
                }
            })
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }

            })
            

            if (dropped.length > 0) {
                
                if (creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0])
                // }else if(creep.withdraw(creep.pos.findClosestByPath(FIND_STRUCTURES,{filter:(struc)=>{return struc.structureType==STRUCTURE_CONTAINER&&struc.store[RESOURCE_ENERGY] > 0}}),RESOURCE_ENERGY) ==ERR_NOT_IN_RANGE){
                //     creep.pickup(dropped[0], RESOURCE_ENERGY)
                //     creep.memory.hauling = true
                }else{
                    creep.pickup(dropped[0])
                    // try{creep.withdraw(creep.pos.findClosestByPath(FIND_STRUCTURES,{filter:(struc)=>{return struc.structureType==STRUCTURE_CONTAINER&&struc.store[RESOURCE_ENERGY] > 0}}),RESOURCE_ENERGY)}
                    // catch(e){

                    // }
                    creep.memory.hauling = true
                }
            } else if (tombs.length > 0) {
                if (creep.withdraw(tombs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombs[0])
                }else if(creep.store.getFreeCapacity ==0){
                    creep.memory.hauling = true
                }
            } else if (sources.length > 0) {
                // console.log(JSON.stringify(sources[0].store["energy"]))
                sources.sort((a,b)=>{return b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]})
                // console.log(JSON.stringify(sources[0].store[RESOURCE_ENERGY]))
                if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0])
                }else{
                    creep.memory.hauling = true
                }
            }
        } else if(!creep.memory.tugging){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_STORAGE) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });
        var overflow = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_STORAGE) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });
        
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else if(overflow.length > 0){
            if(creep.transfer(overflow[0], RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                creep.moveTo(overflow[0], {visualizePathStyle:{stroke:'#ff00ff'}})
            }
        }
            
        }
        if(creep.room != Game.rooms['E1S14']){
            creep.moveTo(Game.spawns.Spawn1)
        }
    }





    
}
module.exports = roleTransport