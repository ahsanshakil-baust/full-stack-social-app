// uploadToDrive.js
const { google } = require("googleapis");
const fs = require("fs");
const credentials = require("./apikey.json");

const auth = new google.auth.GoogleAuth({
  keyFile: "apikey.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

async function uploadFileToDrive(filePath, fileName) {
  const fileMetadata = {
    name: fileName,
  };

  const media = {
    // mimeType: "image/jpeg",
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, webContentLink",
    });

    return response.data.webContentLink;
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error;
  }
}

module.exports = uploadFileToDrive;
