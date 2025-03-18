
📁 File Management Server API Documentation
===========================================

✨ Features
----------

*   Upload files and get public URL
*   Read, update, and delete files
*   API Key secured endpoints
*   Remote access via public URL

🔐 API Key Authentication
-------------------------

Include the following header in all requests:

    x-api-key: your_secret_api_key

If invalid or missing:

    { "message": "Invalid or missing API Key" }

📖 API Endpoints
----------------

### 1\. Upload File

POST /api/files/upload

**Headers:** `x-api-key`, `Content-Type: multipart/form-data`

**Body:** `image` (form-data file)

    {
      "message": "File uploaded",
      "url": "http://Domain Name/uploads/abc123.jpg",
      "fileId": "65f6dca12b9e9f23456abcd1"
    }

### 2\. Get All Files

GET /api/files

**Headers:** `x-api-key`

    [
      {
        "_id": "65f6dca12b9e9f23456abcd1",
        "filename": "abc123.jpg",
        "originalname": "myphoto.jpg",
        "url": "http://Domain Name/uploads/abc123.jpg",
        "createdAt": "2025-03-18T12:00:00Z"
      }
    ]

### 3\. Get Single File

GET /api/files/:id

**Headers:** `x-api-key`

    {
      "_id": "65f6dca12b9e9f23456abcd1",
      "filename": "abc123.jpg",
      "originalname": "myphoto.jpg",
      "url": "http://Domain Name/uploads/abc123.jpg",
      "createdAt": "2025-03-18T12:00:00Z"
    }

### 4\. Update File

PUT /api/files/:id

**Headers:** `x-api-key`, `Content-Type: multipart/form-data`

**Body:** `image` (new file)

    {
      "message": "File updated",
      "url": "http://Domain Name/uploads/newfile.jpg"
    }

### 5\. Delete File

DELETE /api/files/:id

**Headers:** `x-api-key`

    { "message": "File deleted" }

📂 Public File Access
---------------------

Uploaded files can be accessed directly without API key:

    http://Domain Name/uploads/filename.jpg

🛠️ Server Setup Tutorial
-------------------------

1.  Clone the repository:
    
        git clone https://github.com/yourusername/file-management-api.git
    
2.  Install dependencies:
    
        cd file-management-api
        npm install
    
3.  Create `.env` file:
    
        PORT=5000
        MONGODB_URI=your_mongodb_uri
        API_KEY=your_secret_api_key
    
4.  Run the server:
    
        npm start
    
5.  Server is now running at:
    
        http://localhost:5000
    

📚 Notes
--------

*   Files are stored locally in `/uploads` folder
*   Deploy to VPS/Cloud to serve from a custom domain
*   MongoDB stores all file metadata

© 2025 File Management API | Made with ❤️ by Gazi Tanvir Ahmed
