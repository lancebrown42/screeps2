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
            var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (struct)=>{
                    return struct.structureType==STRUCTURE_CONTAINER && struct.store[RESOURCE_ENERGY] > 0
                }
            })
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(source)
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