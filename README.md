# jarvide-api
The API for interacting with user files

This API is not meant for public use (as of now). We may expose public endpoints later on. For now, while the endpoints are technically public,
you will need the authorization key to access any endpoints.

# Technologies
As of right now, the only technologies in use are:
  - Node.js
  - Prisma
  - Express.js
  - SQLite (Planning on transitioning to PostgreSQL)

# Table of contents <a name="toc"></a>

- [TOC](#toc)
- [General Reference](#ref)
  - [`File` object](#file-obj)
  - [Errors](#errors)
- [Endpoints](#endpoints)
  - [POST `/new_file`](#new_file)
  - [GET `/get_file`](#get_file)
  - [GET `/get_files`](#get_files)
  - [DELETE `/delete_file`](#delete_file)
  - [PATCH `/update_file`](#update_file)
- [Examples](#examples)

# General Reference <a name="ref"></a>
### File Object <a name="file-obj"></a>
A `File` object contains the following properties:
- `fileID: String` - The unique indentifier associated with this file.
- `filename: String` - The name of this file.
- `url: String` - The Discord attachment URL that points to this file.

Example `File` object:
```json
{
  "fileID": "ab0915fa-271b-480b-a606-2ba9d3c2613d",
  "filename": "index.js",
  "url": "https://www.discord.com/attachments/123456789/123456789"
}
```

### Errors <a name="errors"></a>
All **4XX** error codes will always return a JSON alongside their error codes.
This is the syntax for one:
```json
{
  "ERROR": "MESSAGE"
}
```
Where `MESSAGE` is a short but descriptive string 
that gives more information on what exactly went wrong.
The response code will also closely reflect the error.

# Endpoints <a name="endpoints"></a>
## POST `/new_file` <a name="new_file"></a>

Creates a new file associated with a user.

### Body
- `userID: Int` - The Discord ID of the user with whom this file is associated with.
- `filename: String` - The name of this file.
- `url: String` - The Discord attachment URL that points to this file.

### Status codes
- `200` - The ID was valid and was present in the database. The response body contains the files.
- `400` - The ID was not a valid ID. An ID consists of only numbers.
----------

## GET `/get_files` <a name="get_files"></a>
Gets all files associated with the given Discord user ID.

### URL parameters
- `userID: Int` - The Discord ID of the user whose files to return.

### Return value
A **list** of **File** objects
Refer to the "General Reference" section for the properties of a `File` object.

### Status codes
- `200` - The ID was valid and was present in the database. The response body contains the files.
- `400` - The ID was not a valid ID. An ID consists of only numbers.
- `404` - The ID was valid but was not found in the database.
----------
## GET `/get_file` <a name="get_file"></a>
Gets a single file with its ID

## URL parameters
`fileID: String` - The ID of the file to retrieve.

## Return value
A single **File** object.
Refer to the "General Reference" section for the properties of a `File` object.

## Status codes
- `200` - The ID was valid and the corresponding file was successfully returned
- `400` - The ID was not a valid file ID.
- `404` - The ID was a valid file ID but a corresponding file was not found in the database.
----------
## DELETE `/delete_files` <a name="delete_files"></a>
Deletes a file given the file ID

### URL parameters
`fileID: String` - The ID of the file that should be deleted

### Status codes
- `200` - The file was successfully deleted.
- `400` - The ID was not a valid ID.
- `404` - The ID was valid but the associated file was not found in the database
----------
## PATCH `/update_file` <a name="update_file"></a>
Update a file given the file ID, new file name, and new attachment URL

### Body
- `fileID: String` - The ID of the file which you wish to update.
- `filename: String` - The new name of this file.
- `url: String` - The new Discord attachment URL that points to this file.

### Status codes
- `200` - All information was valid and the file was successfully validated
- `400` - Missing a certain piece of information. The returned error will describe what went wrong.
- `404` - The provided file ID was valid but was not found in the database.

# Examples <a name="examples"></a>
Following are a few examples on how to use the different endpoints.
The actual IP of the API server or the domain should be substituted for `server-ip`.

```
POST https://server-ip/new_file/

{
  "userID": "432643355634171905",
  "filename": "index.js",
  "url": "https://cdn.discordapp.com/attachments/844432226745057280/929190129397022750/index.js"
}
```

```
GET https://server-ip/get_file?fileID=579d92b9-0c2a-4337-a269-f6053cf545a6
```
Note that for most libraries that aid in making HTTP requests, there will
most likely be a way to pass in a JSON-like object for the querystring params
rather than having to format it manually.

```
DELETE https://server-ip/delete_file?fileID=579d92b9-0c2a-4337-a269-f6053cf545a6
```

```
PATCH https://server-ip/update_file

{
  "fileID": "579d92b9-0c2a-4337-a269-f6053cf545a6",
  "filename": "new_index.js",
  "url": "https://cdn.discordapp.com/attachments/844432226745057280/929190129397022750/new_index.js"
}
```