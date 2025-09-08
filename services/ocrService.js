import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import mammoth from "mammoth";
export async function main(filePath) {
  try {
    const extractedText = await performOCRAndAnalysis(filePath);
    const summary = await analyzeDocumentContent(extractedText)

    console.log(summary);
    
    if (!extractedText) {
      throw new Error('No text could be extracted from the file');
    }
    
    // Log analysis for debugging
    console.log("--- Document Analysis Report ---");
    console.log("Extracted Text Length:", extractedText.length);
    console.log("--------------------------------")
    
    return extractedText;
  } catch (error) {
    console.error('Error in main OCR function:', error);
    throw error; // Re-throw to be handled by the controller
  }
}

// This function is now only used for processing and returning text
// main();s OCR and text extraction from various document file types.
//  * @param {string} filePath - The path to the document file.
//  * @returns {Promise<string>} - A promise that resolves with the extracted text content.
//  */

export async function performOCRAndAnalysis(filePath) {
  const fileExtension = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath).toLowerCase();
  let textContent = "";

  try {
    switch (fileExtension) {
      case ".pdf":
        console.log("PDF file detected - extracting text content:", fileName);
        try {
          // Dynamic import to avoid initialization issues
          const pdfParse = (await import("pdf-parse")).default;
          const pdfBuffer = fs.readFileSync(filePath);
          const pdfData = await pdfParse(pdfBuffer);
          textContent = pdfData.text;
          
          // If PDF has no extractable text, keep what we have for AI processing
          if (!textContent || textContent.trim().length < 10) {
            console.log("PDF contains no extractable text");
            textContent = `${fileName} - PDF document with no extractable text content`;
          }
        } catch (pdfError) {
          console.log("PDF parsing failed:", pdfError.message);
          textContent = `${fileName} - PDF document (parsing failed)`;
        }
        break;
      case ".jpeg":
      case ".jpg":
      case ".png":
        console.log("Image file detected - performing OCR:", fileName);
        try {
          const { data: { text } } = await Tesseract.recognize(filePath, "eng+mal", {
            logger: m => console.log(m)
          });
          textContent = text;
          
          // Keep whatever text was extracted, even if minimal
          if (!textContent || textContent.trim().length < 5) {
            console.log("OCR extracted minimal text");
            textContent = `${fileName} - Image document with minimal readable text`;
          }
        } catch (ocrError) {
          console.log("OCR failed:", ocrError.message);
          textContent = `${fileName} - Image document (OCR processing failed)`;
        }
        break;
      case ".docx":
        console.log("DOCX file detected - extracting text:", fileName);
        try {
          const { value } = await mammoth.extractRawText({ path: filePath });
          textContent = value;
          
          // Keep whatever content was extracted from DOCX
          if (!textContent || textContent.trim().length < 10) {
            console.log("DOCX contains minimal text");
            textContent = `${fileName} - Word document with minimal content`;
          }
        } catch (docxError) {
          console.log("DOCX parsing failed:", docxError.message);
          textContent = `${fileName} - Word document (parsing failed)`;
        }
        break;
      case ".txt":
        console.log("Text file detected - reading content:", fileName);
        try {
          textContent = fs.readFileSync(filePath, "utf-8");
          
          // Keep whatever content exists in text file
          if (!textContent || textContent.trim().length < 5) {
            console.log("Text file is empty or very short");
            textContent = `${fileName} - Text document with minimal content`;
          }
        } catch (txtError) {
          console.log("Text file reading failed:", txtError.message);
          textContent = `${fileName} - Text document (reading failed)`;
        }
        break;
      default:
        console.log("Unsupported file type:", fileExtension);
        textContent = `${fileName} - Document type ${fileExtension} (unsupported format)`;
        break;
    }
  } catch (error) {
    console.error("OCR error:", error);
    textContent = "Error during OCR or text extraction.";
  }

  return textContent;
}


/**
 * Generates a summary, priority, and metadata for a given text content using the Gemini API.
 * @param {string} textContent - The text content extracted from the document.
 * @returns {Promise<object>} - A promise that resolves with a structured object containing the analysis.
 */
export async function analyzeDocumentContent(textContent) {
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDfrVnWEt0DRlMakg8KYgnkPtSV7Cxiku0";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const systemPrompt = `You are a government-facing document analysis system. Your task is to provide a comprehensive summary, priority assessment, and detailed metadata for a given document's content.`;

  const userQuery = `Analyze the following document content and provide the requested information in a structured format:
    
    Document Content:
    ---
    ${textContent}
    ---
    
    Summary: A concise, single-paragraph summary of the document's content and purpose.
    Priority: An assessment of its priority for a government agency (High, Medium, Low) and a brief justification.
    Metadata: A JSON object containing key information about the document, including its purpose, known limitations, and security and scalability notes.`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          summary: { type: "STRING" },
          priority: { type: "STRING" },
          metadata: {
            type: "OBJECT",
            properties: {
              purpose: { type: "STRING" },
              known_limitations: { type: "STRING" },
              security_note: { type: "STRING" },
              scalability_note: { type: "STRING" }
            }
          }
        },
        propertyOrdering: ["summary", "priority", "metadata"]
      }
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      const json = candidate.content.parts[0].text;
      return JSON.parse(json);
    } else {
      console.error("Unexpected API response format:", result);
      return {
        summary: "Analysis failed due to unexpected API response.",
        priority: "Unknown",
        metadata: {
          purpose: "Error handling",
          known_limitations: "API response format issue.",
          security_note: "N/A",
          scalability_note: "N/A"
        }
      };
    }
  } catch (error) {
    console.error("Error generating analysis report with Gemini API:", error);
    return {
      summary: "Analysis failed due to API call error.",
      priority: "Unknown",
      metadata: {
        purpose: "Error handling",
        known_limitations: error.message,
        security_note: "N/A",
        scalability_note: "N/A"
      }
    };
  }
}

/**
 * A simple main function to demonstrate the complete workflow.
 * Replace 'example.jpg' with a valid file path to test.
//  */
// export async function main(filePath) {
//    // CHANGE THIS TO A VALID FILE PATH
//   const extractedText = await performOCRAndAnalysis(filePath);
//   const analysisReport = await analyzeDocumentContent(extractedText);

//   console.log("\n--- Document Analysis Report ---");
//   console.log("Summary:", analysisReport.summary);
//   console.log("\nPriority:", analysisReport.priority);
//   console.log("\nMetadata:", JSON.stringify(analysisReport.metadata, null, 2));
//   console.log("--------------------------------\n");
//   return analysisReport
// }

// Call the main function to run the demonstration.
// main();
