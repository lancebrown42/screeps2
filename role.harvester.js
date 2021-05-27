var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0 ) {
            creep.memory.harvesting = false;
            creep.say('⚡ haul');
        }
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            
            creep.say('🔄 harvest');
        }
        if(creep.memory.harvesting){

            
            
            var sources = creep.room.find(FIND_SOURCES);
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter:(struct)=>{
                    return struct.structureType == STRUCTURE_CONTAINER && struct.store[RESOURCE_ENERGY] > 0;
                }
            })
            if(containers.length > 0 ){
                if(creep.withdraw(containers[0], RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){

                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }

            }
            else if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        
        else {
            var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if(buildTargets.length > 0){
                if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            }
        }
	}
};

module.exports = roleHarvester;