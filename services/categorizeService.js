export function categorizeAndPrioritize(textContent) {
  const lowerCaseText = textContent.toLowerCase();
  let category = "Other";
  let priority = "Low";

  if (lowerCaseText.includes("invoice") || lowerCaseText.includes("payment")) {
    category = "Finance";
  } else if (lowerCaseText.includes("report") || lowerCaseText.includes("metrics")) {
    category = "Reports";
  } else if (lowerCaseText.includes("contract") || lowerCaseText.includes("agreement")) {
    category = "Legal";
  } else if (lowerCaseText.includes("internal") || lowerCaseText.includes("policy")) {
    category = "Internal";
  }

  if (lowerCaseText.includes("urgent") || lowerCaseText.includes("deadline")) {
    priority = "High";
  } else if (lowerCaseText.includes("important")) {
    priority = "Medium";
  }

  return { category, priority };
}
