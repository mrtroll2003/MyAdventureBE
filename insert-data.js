const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://21522041:12032003@cluster0.ebrkrjv.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
 
 // Reference the database to use
 const dbName = "MyAdventure";
                      
 async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();
         const db = client.db(dbName);

         // Reference the "people" collection in the specified database
         const col = db.collection("account");

         // Create a new document                                                                                                                                           
         let accountDocument = {
             "email": "bichhang1234.tcv@gmail.com",
             "password": "123456"
         }

         // Insert the document into the specified collection        
         const p = await col.insertOne(accountDocument);

         // Find and return the document
         const filter = { "email": "21522041@gm.uit.edu.vn" };
         const document = await col.findOne(filter);
         console.log("Document found:\n" + JSON.stringify(document));

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
