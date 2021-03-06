var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');
var roleRepair = require('role.repair');
var roleClaim = require('role.claim');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');


module.exports.loop = function () {

    var tower = Game.rooms['E1S14'].find(FIND_STRUCTURES, {
        filter: (struct) => {
            return struct.structureType == STRUCTURE_TOWER;
        }
    })[0];
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType!=STRUCTURE_WALL
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
            for(tile in Memory.miningTiles){
                if(tile.miner==name){
                    tile.miner="";
                }
            }
        }
    }
    var tower2 = Game.rooms['E2S14'].find(FIND_STRUCTURES, {
        filter: (struct) => {
            return struct.structureType == STRUCTURE_TOWER;
        }
    })[0];
    if (tower2) {
        var closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType!=STRUCTURE_WALL
        });
        if (closestDamagedStructure) {
            tower2.repair(closestDamagedStructure);
        }

        var closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower2.attack(closestHostile);
        }
    }
    
    



    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var ldHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'longDistanceHarvester')
    var containers = _.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
        filter: (struc) => {
            return struc.structureType == STRUCTURE_CONTAINER
        }
    }))
    
    // console.log('Harvesters: ' + harvesters.length);
    if (Game.spawns.Spawn1.room.energyAvailable >= 300) {
        if (Game.spawns.Spawn1.room.energyAvailable >= 500) {
            if (containers.length > 0) {

                if (miners.length < Memory.miningTiles.length) {
                    try{

                        var newName = 'Miner' + Game.time;
                        var miningSpot = {};
                        var miningSource = "";
                        require('memoryManager').sources(Game.rooms['E1S14'])
                        console.log('Spawning new Miner: ' + newName);
                        for(spot of Memory.miningTiles){
                            // console.log(spot.miner)
                            if (spot.miner==""||spot.miner==[]){
                                miningSpot = spot.loc;
                                spot.miner = newName;
                                miningSource = spot.adjSource
                                break;
                            }
                            
                        }
                        
                        Game.spawns['Spawn1'].spawnCreep([WORK, WORK,WORK, WORK, WORK], newName,
                            { memory: { role: 'miner', miningloc: miningSpot, targetSource: miningSource, arrived: false, driver: "",  } });
                        }
                        
                        catch(e){
                            if(e instanceof TypeError){
                                console.log(e.stack)
                            }
                            console.log(e);
                        }
                        

                }
                else if (transporters.length < miners.length+3) {


                    var newName = 'Transporter' + Game.time;
                    console.log('Spawning new transporter: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'transporter', hauling: false, fare:"", fareDest:"", tugging:false, narrow:false } });

                }
                else if(ldHarvesters.length < 2){
                    if(Game.spawns.Spawn1.room.energyAvailable >= 550){
                        
                    var newName = 'LongHarvester' + Game.time;
                    console.log('Spawning new long harvester: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'longDistanceHarvester', harvesting: true, home: 'E1S14', target:'E2S14' } });
                    }
                }
                else if (repairers.length < 1){
                    var newName = 'Repairer' + Game.time;
                    console.log('Spawning new repairer: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'repairer', repairing: false } });
                }
            } else {

                if (harvesters.length < 1) {


                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new bigger harvester: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'harvester', harvesting: true } });

                }
                
            }
            if (upgraders.length < 5) {

                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new bigger upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                    { memory: { role: 'upgrader', upgrading: false } });
            }
            else if (builders.length < 2) {

                if(Game.spawns.Spawn1.room.energyAvailable >= 550){

                var newName = 'Builder' + Game.time;
                console.log('Spawning new bigger Builder: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                    { memory: { role: 'builder', building: false } });
                }

            }
        }
        else if (harvesters.length < 1) {


            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'harvester', harvesting: true } });

        }

        else if (upgraders.length < 2) {



            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'upgrader', upgrading: false } });

        }
        else if (builders.length < 1) {



            var newName = 'Builder' + Game.time;
            console.log('Spawning new Builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'builder', building: false } });

        }
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '???????' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepair.run(creep);
        }
        if(creep.memory.role =='claimer'){
            roleClaim.run(creep);
        }
        if(creep.memory.role=='longDistanceHarvester'){
            roleLongDistanceHarvester.run(creep)
        }
        
    }
}