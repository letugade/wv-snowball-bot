// TODO: More Testing Required

const { dbsettings } = require("./config.json");
const { MongoClient } = require('mongodb');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// TODO: Add more stats to this
async function setUserStats(client, id, score) {

    // Query right collection in the database
    const database = client.db("snowballdb");
    const stats = database.collection("Stats");

    // Filter the user by id
    const filter = { _id: id};

    // Allow creation of entry if empty
    const options = { upsert: true};

    // Create document for the new user
    const doc = {
      _id: id,
      score: score
    }

    const result = await stats.updateOne(filter, doc, options);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
};

async function getUserStats(client, id) {
    return client.db("snowballdb").find(id);
};

async function main() {
    const uri = `mongodb://${dbsettings['user']}:${dbsettings['password']}@127.0.0.1:27017`;
    console.log(uri);
    const client = new MongoClient(uri);
    try {
        console.log("Connecting to client...");

        // Connect to the MongoDB cluster
        await client.connect();

        console.log("Connected!");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);