const { google } = require("googleapis");
const path = require("path");
const stream = require("stream");


const KEYFILEPATH = path.join(__dirname, "..", "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});


exports.uploadFile = async (fileObject, name) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const drive = google.drive({ version: "v3", auth });

    const ext = fileObject.originalname.split('.').pop();
    const finalName = `${name}.${ext}`; // e.g., fratsareal34@gmail.com.png

    const { data } = await drive.files.create({
        media: {
            mimeType: fileObject.mimetype, // ✅ Fix typo: was mimeType instead of mimetype
            body: bufferStream,
        },
        requestBody: {
            name: finalName,
            parents: ["1WAiNwp2mB-yNiQtu1UMnrlZmtdPY2q88"], // your folder ID
        },
        fields: "id,name",
    });
    console.log("Uploading file with MIME type:", fileObject.mimetype);

    // Make file public
    await drive.permissions.create({
        fileId: data.id,
        requestBody: {
            role: "reader",
            type: "anyone",
        },
    });

    const publicUrl = `https://drive.google.com/uc?id=${data.id}`;
    console.log(`✅ Uploaded: ${data.name}`);
    console.log(`🔗 Public URL: ${publicUrl}`);

    return publicUrl
};
    