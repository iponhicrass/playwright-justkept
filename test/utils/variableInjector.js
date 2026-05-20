/**
 * Helper function to replace variable tokens e.g., ${username} with actual values
 * @param {string} text 
 * @param {Object} dataset 
 * @returns {string} Processed text
 */
function inject(text, dataset) {
  if (!text || typeof text !== 'string') return text;
  
  return text.replace(/\$\{([^}]+)\}/g, (match, varName) => {
    if (dataset && dataset[varName] !== undefined) {
      return dataset[varName];
    }
    // Return original if variable is not mapped
    return match;
  });
}

/**
 * Creates a new row object with Target and Data fields populated with variables.
 * @param {Object} row 
 * @param {Object} dataset - Key-Value pair from the _Data sheet
 * @returns {Object} New injected row
 */
export function injectVariables(row, dataset) {
  if (!dataset) return row; // No variables to inject
  
  return {
    ...row,
    Target: inject(row.Target, dataset),
    Data: inject(row.Data, dataset)
  };
}
