var uuid = require('uuid');

// Including the Couchbase SDK and the node we configured
var couchbase = require('couchbase');
var connection = require('./connection');

// Instantiating the Couchbase cluster object using the node we configured
var cluster = new couchbase.Cluster(connection.node);

// Opening a connection to the Auction bucket
var bucket = cluster.openBucket('Auction', function(err) {
  if(err) {
    // Failed to connect to cluster
    throw err;
  }

  // Get the bike document
  bucket.get('bike', function(err, result) {
    if(err) {
      // Failed to retrieve doc
      throw err;
    } 

    // Set the value of the document to a variable
    doc = result.value;

    console.log("Retrieved doc:", JSON.stringify(doc));

    // Change the opening bid to 50
    doc.open = "50";

    console.log("Changed doc:", JSON.stringify(doc));

    // Update the document in Couchbase
    bucket.replace('bike', doc, function(err, result) {
      if(err) {
        // Failed to write key
        throw err;
      }

      console.log("Check the 'bike' document in the Couchbase web UI");
 
      // Success!
      process.exit(0);
    });
  });
});
