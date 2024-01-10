const stream = require("stream");
const { google } = require("googleapis");

const uploadToDrive = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3" }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1iEYXrfA7VyvUKyDczLlUPN3yAqH_aWLt"],
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

module.exports = { uploadToDrive };
