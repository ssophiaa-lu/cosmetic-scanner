const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { DocumentProcessorServiceClient } = require("@google-cloud/documentai").v1;

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

const PROJECT_ID = "skincare-checker-new";
const LOCATION = "us"; // usually us
const PROCESSOR_ID = "e8e47ed785fa3c12";

const client = new DocumentProcessorServiceClient({
  keyFilename: "ocr-service.json",
});

app.post("/ocr", upload.single("image"), async (req, res) => {
    try {
        // 🔹 Add these debug logs
    
        const name = `projects/${PROJECT_ID}/locations/${LOCATION}/processors/${PROCESSOR_ID}`;
    
        const request = {
          name,
          rawDocument: {
            content: req.file.buffer,
            mimeType: "image/jpeg", // or "image/png" if your file is PNG
          },
        };
    
        const [result] = await client.processDocument(request);
        const text = result.document.text;
    
        console.log("OCR success:", text);  // logs the extracted text
        res.json({ text });
      } catch (err) {
        console.error("OCR error:", err);  // logs detailed errors
        res.status(500).send("OCR failed");
      }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 OCR server running on port ${PORT}`);
});