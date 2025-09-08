export const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'finance', label: 'Finance' },
  { value: 'hr', label: 'HR' },
  { value: 'safety', label: 'Safety' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'reports', label: 'Reports' },
  { value: 'legal', label: 'Legal' },
  { value: 'internal', label: 'Internal' },
  { value: 'other', label: 'Other' }
];

export const PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

export const FILE_TYPES = {
  PDF: 'application/pdf',
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  PNG: 'image/png',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  TXT: 'text/plain'
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const API_ENDPOINTS = {
  DOCUMENTS: '/api/documents',
  PROCESS_FILE: '/api/process-file'
};
