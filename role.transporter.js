var roleTransport = {

    run: function (creep = new Creep()) {
        if (creep.store.getFreeCapacity() > 0) {
            var dropped = creep.room.find(FIND_DROPPED_RESOURCES)
            var tombs = creep.room.find(FIND_TOMBSTONES, {
                filter: (tomb) => {
                    return tomb.store[RESOURCE_ENERGY] > 0;
                }
            })
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }

            })

            if (dropped.length > 0) {
                if (creep.withdraw(dropped[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0])
                }
            } else if (tombs.length > 0) {
                if (creep.withdraw(tombs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombs[0])
                }
            } else if (sources.length > 0) {
                if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0])
                }
            }
        } else {

            // var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // var repairs = creep.room.find(FIND_STRUCTURES,{
            //     filter:(structure)=>{
            //         return(structure.structureType == STRUCTURE_CONTAINER ||
            //             structure.structureType == STRUCTURE_ROAD) &&
            //             structure.hits < (structure.hitsMax * .6);
            //     }
            // })
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
        }
            // } else if (buildTargets.length > 0) {
            //     if (creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(buildTargets[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            //     }
            // }
        }

    },





    old: function () {

        //run: function(creep){
        //     if(creep.carry.energy < creep.carryCapacity){
        //         // creep.say("looking")
        //         var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //             filter: (struc)=>{
        //                 return struc.structureType == STRUCTURE_CONTAINER && struc.store.energy > 0
        //             }
        //         })
        //         creep.moveTo(source)
        //         creep.withdraw(source, 'energy')
        //         // if(creep.pickup(source) == ERR_NOT_IN_RANGE){
        //         //     creep.say('moving')
        //         //     creep.moveTo(source)
        //         // }
        //     }
        //     if(creep.carry.energy >0){
        //         var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //             filter: function(struc){
        //                 return ((struc.structureType == STRUCTURE_SPAWN ||
        //                 struc.structureType == STRUCTURE_EXTENSION) &&
        //                 // struc.structureType == STRUCTURE_TOWER ||
        //                 // struc.structureType == STRUCTURE_STORAGE) &&
        //                 struc.energy < struc.energyCapacity)
        //                //( struc.structureType == STRUCTURE_STORAGE &&

        //                // struc.store.energy < struc.storeCapacity)
        //             }
        //         })
        //         if(target){
        //             creep.moveTo(target)
        //             creep.transfer(target,'energy')
        //         }else if(creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //             filter: function(struc){
        //                 return (struc.structureType == STRUCTURE_TOWER &&
        //                 struc.energy < struc.energyCapacity)

        //             }})){
        //                 creep.moveTo(creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //             filter: function(struc){
        //                 return (struc.structureType == STRUCTURE_TOWER &&
        //                 struc.energy < struc.energyCapacity)

        //             }}))
        //             creep.transfer(creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //             filter: function(struc){
        //                 return (struc.structureType == STRUCTURE_TOWER &&
        //                 struc.energy < struc.energyCapacity)

        //             }}), 'energy')
        //             } else{
        //                 creep.moveTo(creep.room.storage)
        //                 creep.transfer(creep.room.storage, 'energy')
        //             }
        //     }
        // }
    }
}
module.exports = roleTransport