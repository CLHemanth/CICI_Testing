const  {Snowflake}  = require('nodejs-snowflake');

const uid = new Snowflake();
console.log("-----------uid",uid)
uid.getUniqueID(); // A 64 bit id is returned



const id = uid.idFromTimestamp(Date.now()); // Here id will always be BigInt
const ts = Snowflake.timestampFromID(id, uid.customEpoch());


console.log("-------------id",id); // A 64 bit id is returned corresponding to the timestamp given

// Pass the custom epoch that was used to generate this ID

console.log("-----------------ts",ts) // Timestamp of creation of the id


const mid = Snowflake.instanceIDFromID(id);
console.log("----------------------mid",mid); // 2345 -> This is the 12 bit long machine id where this token was generated


let machineId = uid.instanceID(); // The instance id of the current instance, set either by user or randomly generated
console.log("=============machine id", machineId)
