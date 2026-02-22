const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { DocumentProcessorServiceClient } = require("@google-cloud/documentai").v1;

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

// Temporary hardcoded user profiles for development/testing.
// These will be replaced by real user-provided profiles later.
const TEMP_USER_PROFILES = [
  {
    user_id: 'test_user_1',
    skin_type: 'sensitive',
    concerns: ['acne', 'redness'],
    allergies: ['fragrance'],
    pregnant: false,
    medications: ['topical_retinoid'],
    age_range: '25-34',
    preferred_avoid: ['alcohol']
  },
  {
    user_id: 'test_user_2',
    skin_type: 'oily',
    concerns: ['oiliness', 'large_pores'],
    allergies: [],
    pregnant: null,
    medications: [],
    age_range: '18-24',
    preferred_avoid: []
  }
];

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