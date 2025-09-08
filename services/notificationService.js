/**
 * Simple notification service for KMRL document processing
 * Provides console notifications and can be extended for email/Slack integration
 */

export function sendNotification(document) {
  const { fileName, category, priority, uploadedAt } = document;
  
  // Console notification (for MVP demo)
  const timestamp = new Date(uploadedAt).toLocaleString();
  const priorityEmoji = getPriorityEmoji(priority);
  const categoryEmoji = getCategoryEmoji(category);
  
  console.log('\n🚨 NEW DOCUMENT NOTIFICATION 🚨');
  console.log('═══════════════════════════════════');
  console.log(`📄 File: ${fileName}`);
  console.log(`${categoryEmoji} Category: ${category}`);
  console.log(`${priorityEmoji} Priority: ${priority}`);
  console.log(`⏰ Uploaded: ${timestamp}`);
  console.log('═══════════════════════════════════');
  
  // Generate department-specific notification
  const departmentMessage = getDepartmentNotification(category, fileName);
  console.log(`📢 ${departmentMessage}`);
  console.log('');
  
  return {
    success: true,
    message: departmentMessage,
    timestamp: new Date().toISOString()
  };
}

function getPriorityEmoji(priority) {
  switch (priority?.toLowerCase()) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
    default: return '⚪';
  }
}

function getCategoryEmoji(category) {
  switch (category?.toLowerCase()) {
    case 'finance': return '💰';
    case 'hr': return '👥';
    case 'safety': return '🛡️';
    case 'engineering': return '⚙️';
    case 'reports': return '📊';
    case 'legal': return '⚖️';
    case 'internal': return '📋';
    default: return '📄';
  }
}

function getDepartmentNotification(category, fileName) {
  switch (category?.toLowerCase()) {
    case 'finance':
      return `💰 New Finance document "${fileName}" uploaded – assigned to Finance Department.`;
    case 'hr':
      return `👥 New HR document "${fileName}" uploaded – assigned to Human Resources & Operations.`;
    case 'safety':
      return `🛡️ New Safety Circular "${fileName}" uploaded – assigned to Safety & Operations Department.`;
    case 'engineering':
      return `⚙️ New Engineering document "${fileName}" uploaded – assigned to Technical & Maintenance Department.`;
    case 'reports':
      return `📊 New Report "${fileName}" uploaded – assigned to Management & Analytics Team.`;
    case 'legal':
      return `⚖️ New Legal document "${fileName}" uploaded – assigned to Legal & Compliance Department.`;
    case 'internal':
      return `📋 New Internal document "${fileName}" uploaded – assigned to Administration Department.`;
    default:
      return `📄 New document "${fileName}" uploaded – requires manual categorization.`;
  }
}

// Future enhancement: Email notification function
export async function sendEmailNotification(document, recipients) {
  // TODO: Implement email notification using nodemailer or similar
  console.log(`📧 Email notification would be sent to: ${recipients.join(', ')}`);
  return { success: true, message: 'Email notification queued' };
}

// Future enhancement: Slack notification function  
export async function sendSlackNotification(document, webhookUrl) {
  // TODO: Implement Slack webhook notification
  console.log(`💬 Slack notification would be sent to webhook: ${webhookUrl}`);
  return { success: true, message: 'Slack notification queued' };
}
