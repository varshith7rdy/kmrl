export function categorizeAndPrioritize(textContent) {
  const lowerCaseText = textContent.toLowerCase();
  let category = "Other";
  let priority = "Low";

  // KMRL-specific categorization based on MVP requirements
  if (lowerCaseText.includes("invoice") || lowerCaseText.includes("payment") || 
      lowerCaseText.includes("budget") || lowerCaseText.includes("financial") ||
      lowerCaseText.includes("expense") || lowerCaseText.includes("procurement")) {
    category = "Finance";
  } else if (lowerCaseText.includes("training") || lowerCaseText.includes("employee") ||
             lowerCaseText.includes("recruitment") || lowerCaseText.includes("hr") ||
             lowerCaseText.includes("human resource") || lowerCaseText.includes("staff") ||
             lowerCaseText.includes("personnel")) {
    category = "HR";
  } else if (lowerCaseText.includes("safety") || lowerCaseText.includes("security") ||
             lowerCaseText.includes("emergency") || lowerCaseText.includes("incident") ||
             lowerCaseText.includes("accident") || lowerCaseText.includes("hazard") ||
             lowerCaseText.includes("risk") || lowerCaseText.includes("protocol")) {
    category = "Safety";
  } else if (lowerCaseText.includes("maintenance") || lowerCaseText.includes("engineering") ||
             lowerCaseText.includes("technical") || lowerCaseText.includes("repair") ||
             lowerCaseText.includes("infrastructure") || lowerCaseText.includes("construction") ||
             lowerCaseText.includes("equipment") || lowerCaseText.includes("system")) {
    category = "Engineering";
  } else if (lowerCaseText.includes("report") || lowerCaseText.includes("metrics") ||
             lowerCaseText.includes("analysis") || lowerCaseText.includes("statistics")) {
    category = "Reports";
  } else if (lowerCaseText.includes("contract") || lowerCaseText.includes("agreement") ||
             lowerCaseText.includes("legal") || lowerCaseText.includes("compliance")) {
    category = "Legal";
  } else if (lowerCaseText.includes("internal") || lowerCaseText.includes("policy") ||
             lowerCaseText.includes("circular") || lowerCaseText.includes("memo")) {
    category = "Internal";
  }

  // Enhanced priority detection
  if (lowerCaseText.includes("urgent") || lowerCaseText.includes("immediate") ||
      lowerCaseText.includes("emergency") || lowerCaseText.includes("critical") ||
      lowerCaseText.includes("deadline") || lowerCaseText.includes("asap")) {
    priority = "High";
  } else if (lowerCaseText.includes("important") || lowerCaseText.includes("priority") ||
             lowerCaseText.includes("attention") || lowerCaseText.includes("review")) {
    priority = "Medium";
  }

  return { category, priority };
}
