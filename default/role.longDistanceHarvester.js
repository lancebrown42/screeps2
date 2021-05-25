var roleLongDistanceHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.room == creep.memory.home && creep.carry.energy == 0){
            // creep.say('im home and leaving')
            var exit = creep.room.findExitTo(creep.memory.target)
            creep.moveTo(creep.pos.findClosestByPath(exit))
        } else if(creep.room == creep.memory.target){
            // creep.say('uhhh')
    	    if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }else{
                // creep.say('3')
                var homeexit = creep.room.findExitTo(Game.spawns['Spawn1'].room)
                creep.moveTo(creep.pos.findClosestByPath(homeexit))
            }
        }
        else if(creep.room == creep.memory.home && creep.carry.energy > 0) {
            creep.say('ghm')
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER 
                                ) && structure.energy < structure.energyCapacity) //||
                                // (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity)
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(creep.pos.findClosestByPath(targets), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByPath(targets));
                }
            }
            
        }
        }
	}

module.exports = roleLongDistanceHarvester;