var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');
var repairer = require('role.repair');
const roleRepair = require('./role.repair');

module.exports.loop = function () {

    var tower = Game.rooms['E1S14'].find(FIND_STRUCTURES, {
        filter: (struct) => {
            return struct.structureType == STRUCTURE_TOWER;
        }
    })[0];
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
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
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var containers = _.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
        filter: (struc) => {
            return struc.structureType == STRUCTURE_CONTAINER
        }
    }))
    
    // console.log('Harvesters: ' + harvesters.length);
    if (Game.spawns.Spawn1.room.energyAvailable >= 300) {
        if (Game.spawns.Spawn1.room.energyAvailable >= 500) {
            if (containers.length > 0) {

                if (miners.length < containers.length) {
                    var newName = 'Miner' + Game.time;
                    console.log('Spawning new Miner: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName,
                        { memory: { role: 'miner' } });

                }
                else if (transporters.length < miners.length) {


                    var newName = 'Transporter' + Game.time;
                    console.log('Spawning new transporter: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'transporter' } });

                }
                else if (repairers.length < 1){
                    var newName = 'Repairer' + Game.time;
                    console.log('Spawning new repairer: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'repairer' } });
                }
            } else {

                if (harvesters.length < 3) {


                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new bigger harvester: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'harvester' } });

                }
            }
            if (upgraders.length < 3) {

                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new bigger upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                    { memory: { role: 'upgrader' } });
            }
            else if (builders.length < 1) {



                var newName = 'Builder' + Game.time;
                console.log('Spawning new bigger Builder: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'builder' } });

            }
        }
        else if (harvesters.length < 3) {


            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'harvester' } });

        }

        else if (upgraders.length < 3) {



            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'upgrader' } });

        }
        else if (builders.length < 1) {



            var newName = 'Builder' + Game.time;
            console.log('Spawning new Builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'builder' } });

        }
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
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
        
    }
}