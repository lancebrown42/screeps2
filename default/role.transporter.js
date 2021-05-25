var roleTransport = {
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity){
            // creep.say("looking")
            var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (struc)=>{
                    return struc.structureType == STRUCTURE_CONTAINER && struc.store.energy > 0
                }
            })
            creep.moveTo(source)
            creep.withdraw(source, 'energy')
            // if(creep.pickup(source) == ERR_NOT_IN_RANGE){
            //     creep.say('moving')
            //     creep.moveTo(source)
            // }
        }
        if(creep.carry.energy >0){
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(struc){
                    return ((struc.structureType == STRUCTURE_SPAWN ||
                    struc.structureType == STRUCTURE_EXTENSION) &&
                    // struc.structureType == STRUCTURE_TOWER ||
                    // struc.structureType == STRUCTURE_STORAGE) &&
                    struc.energy < struc.energyCapacity)
                   //( struc.structureType == STRUCTURE_STORAGE &&
                    
                   // struc.store.energy < struc.storeCapacity)
                }
            })
            if(target){
                creep.moveTo(target)
                creep.transfer(target,'energy')
            }else if(creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(struc){
                    return (struc.structureType == STRUCTURE_TOWER &&
                    struc.energy < struc.energyCapacity)
                    
                }})){
                    creep.moveTo(creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(struc){
                    return (struc.structureType == STRUCTURE_TOWER &&
                    struc.energy < struc.energyCapacity)
                    
                }}))
                creep.transfer(creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(struc){
                    return (struc.structureType == STRUCTURE_TOWER &&
                    struc.energy < struc.energyCapacity)
                    
                }}), 'energy')
                } else{
                    creep.moveTo(creep.room.storage)
                    creep.transfer(creep.room.storage, 'energy')
                }
        }
    }
}
module.exports = roleTransport