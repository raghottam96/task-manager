const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
var cors = require("cors");

app.use(bodyParser.json());

let usedID = [];
let fileName = "storage.json";

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hey, welcome to my API");
});

//Get all tasks
app.get("/GetTasks", (req, res) => {
	res.send(GetTasks());
});

//Add new Task
app.post("/AddTask", (req, res) => {
	let TaskID = GetRandomID();
	let tasks = [];

	tasks = GetTasks();
	tasks.push({ TaskID, ...req.body });

	let result = UpdateJSON(tasks);

	res.send(result);
});

//Delete existing Task
app.delete("/DeleteTask/:id", (req, res) => {
	let id = Number(req.params["id"]);

	let tasks = GetTasks();

	tasks = tasks.filter((task) => {
		return task.TaskID !== id;
	});

	UpdateJSON(tasks);

	res.send("1");
});

//Update Task
app.post("/UpdateTask", (req, res) => {
	let task = req.body;
	let tasks = GetTasks();

	tasks = tasks.filter((task) => {
		return task.TaskID !== task.TaskID;
	});

	tasks.push(task);

	UpdateJSON(tasks);
	res.send("1");
});

//#region Helper Methods

function GetRandomID() {
	let randNum = 0;
	do {
		randNum = Math.floor(Math.random() * 100000000);
	} while (usedID.includes(randNum));

	usedID.push(randNum);
	usedID.sort();

	return randNum;
}

function GetTasks() {
	let tasks = [];

	try {
		let jsonString = fs.readFileSync(fileName, "utf-8");
		tasks = JSON.parse(jsonString);
	} catch (err) {
		console.console.error("Failed to Convert json string to object");
	}

	return tasks;
}

function UpdateJSON(tasks) {
	try {
		let data = JSON.stringify(tasks, null, 2);
		fs.writeFileSync(fileName, data);
	} catch (error) {
		// logging the error
		console.error(error);
		return "-1";
	}

	return "1";
}

//#endregion

//Start Server
app.listen(5000, () => {
	console.log("Server running on Port 5000");
});
