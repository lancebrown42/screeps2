var roleLongDistanceHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.room == Game.rooms[creep.memory.home] && creep.store[RESOURCE_ENERGY] == 0){
            // creep.say('im home and leaving')
            var exit = creep.room.findExitTo(creep.memory.target)
            creep.moveTo(creep.pos.findClosestByPath(exit))
        } else if(creep.room == Game.rooms[creep.memory.target]){
            // creep.say('uhhh')
    	    if(creep.store.getFreeCapacity() > 0) {
                var sources = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }else{
                creep.say('3')
                var homeexit = creep.room.findExitTo(Game.rooms[creep.memory.home])
                creep.moveTo(creep.pos.findClosestByPath(homeexit))
            }
        }
        else if(creep.room == Game.rooms[creep.memory.home] && creep.store[RESOURCE_ENERGY] > 0) {
            // creep.say('ghm')
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_STORAGE) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });
            if(targets.length > 0) {
                if(creep.transfer(creep.pos.findClosestByPath(targets), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByPath(targets));
                }
            }else{
                creep.say("spawn")
                // creep.moveTo(Game.spawns.Spawn1)
            }
            
        }
        }
	}

module.exports = roleLongDistanceHarvester;