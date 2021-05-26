var roleRepair = {
    run: function(creep){
        
        if(creep.memory.repairing && creep.carry.energy == 0 ){
            creep.memory.repairing = false;
            creep.say('gathering')
            
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity){
            creep.memory.repairing = true;
            creep.say('repairing')
        }
        var roadCritical = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: function(object){
                return ((object.hits <= (object.hitsMax * 0.5)) && (object.structureType == STRUCTURE_ROAD))
            }
        })
        var roadMaintain = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: function(object){
                return ((object.hits < (object.hitsMax * 0.8) && object.hits > (object.hitsMax * 0.5)) && (object.structureType == STRUCTURE_ROAD))
            }
        })
        var wallFix = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: function(object){
                return(object.structureType == 'constructedWall' && object.hits < object.hitsMax)
            }
        })
        if(creep.memory.repairing){
            if (roadCritical){
                creep.say('RoadCrit')
                creep.moveTo(roadCritical)
                creep.repair(roadCritical)
            }
            else if(roadMaintain){
                creep.say('RoadMaint')
                creep.moveTo(roadMaintain)
                creep.repair(roadMaintain)
            }
            else if(wallFix){
                creep.say('Wall')
                creep.moveTo(wallFix)
                creep.repair(wallFix)
            }
            else{
                if(creep.transfer(creep.room.find(STRUCTURE_TOWER)) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.find(STRUCTURE_TOWER))
            }
            }
            
        }
        
        if(!creep.memory.repairing){
            var sources = creep.room.find(FIND_SOURCES);
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter:(struct)=>{
                    return struct.structureType == STRUCTURE_CONTAINER && struct.store[RESOURCE_ENERGY] > 0;
                }
            })
            if(containers.length > 0 ){
                if(creep.withdraw(containers[0])==ERR_NOT_IN_RANGE){

                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }

            }
            else if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        }
 
        // else if(creep.carry.energy < creep.carryCapacity) {
        // var source = creep.pos.findClosestByPath(FIND_SOURCES)
        
        // if(creep.harvest(source) == ERR_NOT_IN_RANGE){
        //     creep.moveTo(source)
            
        //     }
        // }
       
        
        
    }
}
module.exports = roleRepair