# simon-db

This demonstrates using a database service, MongoDB, to persistently save data. Our web service will call the database service to save high scores. This means that the Simon technology stack now has three layers.

1. Client application - Simple HTML/CSS/JavaScript
1. Web service - Caddy, Node.js, Express
1. Database service - MongoDB

The `simon-db` application starts where we left off with the `simon-service` application and then integrate with the database service. We use a cloud service called MongoDB Atlas for our database service. Once that is completed we can make service calls to MongoDB from our web service. This involves specifing the database service endpoint and making services calls like the following.

```Javascript
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<user>:<password>@cluster0.2iaao.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

```

You can view this application running here: [Example Simon DB](https://demo.cs260.click/simon-db). Although you won't be able to see any difference from the `simon-service` version, because the only difference is that when the `simon-db` service is restarted it doesn't lose its high score data because it is saved in the database.

## Create a MongoDB Atlas cluster

Before you can start writing your own code you need to get a MongoDB Atlas account and create a database cluster that you can use as your database service.

## Handling credentials

You now have credentials for accessing the database service. You need to protect those credentials. One common mistake is to check them into your code and then post it to a public GitHub repository. Instead you can read them from a secure location when your application executes. For this project we will read them from environment variables.

```Javascript
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error("Database not configured. Set environment variables");
}
```

This will require you to set these variables in your development and production environments before you can successfully execute. For Linux systems you can add your credentials for all users by modifying the `/etc/environment` file

```
sudo vi /etc/environment
```

and adding the following environment exports.

```
export MONGOUSER=<yourmongodbusername>
export MONGOPASSWORD=<yourmongodbpassword>
export MONGOHOSTNAME=<yourmongodbhostname>
```

For your development environment add the variables to your shell's profile file.

## Study this code

Get familiar with what this code teaches.

- Clone this repository to your development machine.
  ```sh
  git clone https://github.com/webprogramming260/simon-db.git
  ```
- Replace the database service URI with one from your Atlas cluster.
- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it from a VS Code debug session.
- See how data is populated in the database by viewing the contents of the database using the MongoDB Atlas console.
- Make modifications to the code as desired. Experiment and see what happens.

## Make your own version

- Create a new GitHub repository named `simon-db`.
- Clone the repository to your development environment.
- In the `simon-db` repository create your own version of the project. Refer to the example class project repository if you get stuck.
- Periodically commit and push your code to your repository as you hit different milestones. (4 commits are required for full credit.)
- Change the footer link to point to your code repository. (e.g. https://github.com/yourname/simon-db)
- Periodically deploy to your production environment using a copy of the `deploy.sh` script found in the [example class project](https://github.com/webprogramming260/simon-db/blob/main/deploy.sh). Take some time to understand how it works.
  ```sh
  ./deploy.sh -k <yourpemkey> -h <yourdomain> -s simon-db -p 3001
  ```
- Update the simon-db repository README.md to record and reflect on what you are learning.
- When you have completed your version. Do a final push of your code and deploy your final version to your production environment.
- Make sure your project is visible from your production environment (e.g. https://simon-db.yourhostname).
- Submit the URL to your project on the production environment for grading using the Canvas assignment page.

## Grading Rubric

- 20% - Project hosted from your production environment
- 30% - Successfully created your MongoDB Atlas cluster
- 30% - Web service storing information using the MongoDB database service
- 10% - At least four Git commits for the project (Initial, milestone, ..., milestone, final)
- 10% - Notes in your repository README.md about what you have learned
