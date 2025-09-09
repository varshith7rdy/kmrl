import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
// import pdf from "pdf-parse";
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
  let textContent = "";

  try {
    switch (fileExtension) {
      case ".pdf":
        console.log("PDF detected. Skipping pdf-parse for now.");
        textContent = "PDF processing temporarily skipped.";
        break;
      case ".jpeg":
      case ".jpg":
      case ".png":
        // Use Tesseract.js to recognize text from image files.
        const { data: { text } } = await Tesseract.recognize(filePath, "eng");
        textContent = text;
        break;
      case ".docx":
        // Use mammoth to extract raw text from Word documents.
        const { value } = await mammoth.extractRawText({ path: filePath });
        textContent = value;
        break;
      case ".txt":
        // Read text directly from a plain text file.
        textContent = fs.readFileSync(filePath, "utf-8");
        break;
      default:
        textContent = "Unsupported file type.";
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
  const apiKey = "YOUR_API_KEY";
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
