var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            // creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            // creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter:(struct)=>{
                    return struct.structureType == STRUCTURE_CONTAINER || struct.structureType== STRUCTURE_STORAGE && (struct.store[RESOURCE_ENERGY] > 0);
                }
            })
            // console.log(containers)
            
            if(containers.length > 0 ){
                if(creep.withdraw(creep.pos.findClosestByPath(containers), RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){

                    creep.moveTo(creep.pos.findClosestByPath(containers), {visualizePathStyle: {stroke: '#ffaa00'}});
                }

            }
            else if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else if(creep.harvest(sources[0])==ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});

            }
        }
    }
};

module.exports = roleUpgrader;