const express = require('express');
const app = express();
const port = 3030;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth = require('./auth.js');

app.use(express.json());
app.use(auth)

function fileToJSON(file) {
    return ({
        fileID: file.fileID,
        fileName: file.filename,
        url: file.url
    });
}

app.post('/new_file', async (req, res) => {
    
    let { userID, filename, url} = req.body;

    if (!userID) {
        res.status(404).send({
            "ERROR": "Missing userID in body."
        });

        return;
    } 
    
    if (!filename) {
        res.status(404).send({
            "ERROR": "Missing filename in body."
        });

        return;
    } 
    
    if (!url) {
        res.status(404).send({
            "ERROR": "Missing url in body."
        });

        return;
    }

    userID = parseInt(userID);

    if(isNaN(userID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    await prisma.files.create({
        data: {
            userID: userID,
            filename: filename,
            url: url
        }
    });

    res.sendStatus(200);
});

app.get('/get_files', async (req, res) => {
    let { userID } = req.query;

    if (!userID) {
        res.status(404).send({
            "ERROR": "Missing userID in URL parameters."
        });

        return;
    }

    userID = parseInt(userID);
    if(isNaN(userID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    const files = await prisma.files.findMany({
        where: {
            userID: parseInt(userID)
        }
    })

    if(files.length === 0) {
        res.status(404).send({
            "ERROR": "Provided userID was not found."
        });

        return;
    }

    res.status(200).send(
        files.map(file => fileToJSON(file))
    );

    return;
});

app.get('/get_file', async (req, res) => {
    let { fileID } = req.query;

    if(!fileID) {
        res.status(404).send({
            "ERROR": "Missing fileID in URL parameters."
        });

        return;
    }

    const file = await prisma.files.findUnique({
        where: {fileID: fileID}
    });

    if(!file) {
        res.status(404).send({
            "ERROR": "Provided fileID was not found."
        });

        return;
    }

    res.status(200).send(
        fileToJSON(file)
    )
    
});

app.delete('/delete_file', async (req, res) => {
    let { fileID } = req.query;

    if (!fileID) {
        res.status(404).send({
            "ERROR": "Missing fileID in URL parameters."
        });

        return;
    }

    try {
        await prisma.files.delete({
            where: {fileID: fileID}
        });

        res.sendStatus(200);
    } catch {
        res.status(404).send({
            "ERROR": "The file could not be deleted because it does not exist."
        });
    }

    return;
});

app.patch('/update_file', async (req, res) => {
    let { fileID, filename, url} = req.body;

    if (!fileID) {
        res.status(400).send({
            "ERROR": "Missing fileID in body."
        });

        return;
    } 

    if (!filename) {
        res.status(400).send({
            "ERROR": "Missing filename in body."
        });

        return;
    } 
    
    if (!url) {
        res.status(400).send({
            "ERROR": "Missing url in body."
        });

        return;
    }

    userID = parseInt(userID);

    if(isNaN(userID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    try {
        await prisma.files.update({
            where: {
                fileID: fileID
            },
            
            data: {
                filename: filename,
                url: url
            }
        });
    } catch {
        res.status(404).send({
            "ERROR": "Provided fileID was not found."
        });

        return;
    }

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`);
});