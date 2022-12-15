# simon-db

This demonstrates using a database service, MongoDB, to persistently save data. Our web service will call the database service to save high scores. This creates a third layer in our Simon technology stack.

1. Client application - Simple HTML/CSS/JavaScript
1. Web service - Caddy, Node.js, Express
1. Database service - MongoDB

The `simon-db` application starts where we left off with the `simon-service` application and then integrate with the database service. We use a cloud service called MongoDB Atlas for our database service. Once we are connected to Atlas, we can make service calls to MongoDB from our web service. This involves specifying the database service endpoint and making services calls like the following.

```Javascript
const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${userName}:${password}@${hostname}`;
const client = new MongoClient(url);
client.connect(err => {
  const collection = client.db("test").collection("devices");

  // ... perform actions on the collection object

  client.close();
});

```

You can view this application running here: [Example Simon DB](https://simon-db.cs260.click). Although you won't be able to see any difference from the `simon-service` version, because the only difference is that when the `simon-db` service is restarted it doesn't lose its high score data because it is saved persistently in the database.

## Create a MongoDB Atlas cluster

Before you can start writing your own code you need to get a MongoDB Atlas account and create a database cluster that you can use as your database service. If you have not done that yet go back and review the instruction on data services.

## Handling credentials

You now have credentials for accessing the database service. You need to protect those credentials. One common mistake is to check them into your code and then post it to a public GitHub repository. Instead you can read them from a secure location when your application executes. For this project we will read them from environment variables. The JavaScript `process.env` object provides access the environment.

```Javascript
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error("Database not configured. Set environment variables");
}
```

This will require you to set these variables in your development and production environments before you can successfully execute. For your production environment, you can add your credentials for all users by modifying the `/etc/environment` file

```
sudo vi /etc/environment
```

and adding the following environment exports.

```
export MONGOUSER=<yourmongodbusername>
export MONGOPASSWORD=<yourmongodbpassword>
export MONGOHOSTNAME=<yourmongodbhostname>
```

For your development environment add the same export commands to your shell's profile file. Depending on what console you are using the location for your shell profile will be different. For example, on a Mac you typically are using Zsh and you will add the export commands to the `.zprofile` file found in your user directory.

## Study this code

Get familiar with what this code teaches.

- Clone this repository to your development machine.
  ```sh
  git clone https://github.com/webprogramming260/simon-db.git
  ```
- Set up your environment variables with your Atlas credentials.
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
  ./deploy.sh -k <yourpemkey> -h <yourdomain> -s simon-db -p 3002
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
