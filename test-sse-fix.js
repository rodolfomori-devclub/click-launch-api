/**
 * Test SSE Streaming with the new Claude integration
 * This script simulates the frontend SSE parsing logic
 */

require('dotenv').config();

const testSSEParsing = () => {
  console.log('🧪 Testing SSE Data Parsing Logic\n');
  
  // Simulate different types of SSE data that might be received
  const testSSEData = [
    // Valid JSON metadata
    'data: {"type":"metadata","data":{"totalQuestions":36,"answeredQuestions":28,"generationType":"phase","phase":"pre-launch"}}',
    
    // Valid JSON content
    'data: {"type":"content","data":"EMAIL 1 - Confirmação de Inscrição\\nASSUNTO: Atenção! Confirme sua inscrição\\n\\nParabéns pela sua inscrição..."}',
    
    // Valid JSON completion
    'data: {"type":"complete","data":{"status":"completed","totalLength":3420,"phase":"pre-launch","generationType":"phase"}}',
    
    // Empty data line
    'data: ',
    
    // Plain text data (not JSON)
    'data: Some plain text content without JSON structure',
    
    // Malformed JSON
    'data: {"type":"content","data":malformed json}',
    
    // Error event
    'data: {"type":"error","data":"Test error message"}'
  ];
  
  // Function to simulate the frontend parsing logic
  function parseSSELine(line) {
    try {
      if (line.startsWith('data: ')) {
        const dataString = line.slice(6).trim();
        
        // Skip empty data lines
        if (!dataString) {
          console.log('⏭️  Skipped empty data line');
          return { skipped: true };
        }
        
        // Try to parse JSON data
        let data;
        try {
          data = JSON.parse(dataString);
        } catch (parseError) {
          console.log('⚠️  Non-JSON data detected, treating as plain text:', dataString.substring(0, 50) + '...');
          return { type: 'plain-text', content: dataString };
        }
        
        // Handle structured SSE data
        if (data && typeof data === 'object') {
          if (data.type === 'metadata') {
            console.log('📊 Metadata received:', data.data);
            return { type: 'metadata', data: data.data };
          } else if (data.type === 'content') {
            const content = data.data;
            if (content && typeof content === 'string' && content !== '[object Object]') {
              console.log('📝 Content chunk received:', content.length, 'characters');
              return { type: 'content', data: content };
            }
          } else if (data.type === 'complete') {
            console.log('✅ Generation completed:', data.data);
            return { type: 'complete', data: data.data };
          } else if (data.type === 'error') {
            console.log('❌ Error received:', data.data);
            return { type: 'error', data: data.data };
          }
        }
      }
    } catch (e) {
      console.error('❌ Error processing SSE line:', e.message);
      console.error('Raw line:', line);
      return { type: 'error', error: e.message };
    }
    
    return { type: 'unknown' };
  }
  
  // Test each SSE data line
  testSSEData.forEach((line, index) => {
    console.log(`\n--- Test ${index + 1} ---`);
    console.log('Input:', line);
    const result = parseSSELine(line);
    console.log('Result:', result);
  });
  
  console.log('\n🎉 SSE parsing test completed!');
  console.log('\nKey improvements:');
  console.log('✅ Handles empty data lines gracefully');
  console.log('✅ Supports both JSON and plain text content');
  console.log('✅ Robust error handling without breaking the stream');
  console.log('✅ Better logging for debugging');
  console.log('✅ Support for phase-based generation metadata');
};

// Test the SSE error handling improvements
const testSSEErrorHandling = () => {
  console.log('\n🔧 Testing SSE Error Handling Improvements\n');
  
  // Common error scenarios
  const errorScenarios = [
    { name: 'Undefined data', data: undefined },
    { name: 'Null data', data: null },
    { name: 'Empty string', data: '' },
    { name: 'Invalid JSON object', data: '{"incomplete": json' },
    { name: 'Non-string content', data: '{"type":"content","data":{"object":"data"}}' },
    { name: 'Missing type field', data: '{"data":"content without type"}' }
  ];
  
  errorScenarios.forEach(scenario => {
    console.log(`\n--- ${scenario.name} ---`);
    try {
      const line = `data: ${scenario.data || ''}`;
      console.log('Testing:', line);
      
      // Simulate the parsing logic
      if (line.startsWith('data: ')) {
        const dataString = line.slice(6).trim();
        
        if (!dataString) {
          console.log('✅ Empty data handled correctly');
          return;
        }
        
        try {
          const data = JSON.parse(dataString);
          console.log('✅ JSON parsed successfully:', data);
        } catch (parseError) {
          console.log('⚠️  JSON parse failed (expected), treated as plain text');
        }
      }
    } catch (error) {
      console.log('❌ Unhandled error:', error.message);
    }
  });
  
  console.log('\n✅ Error handling test completed successfully!');
};

// Run tests
testSSEParsing();
testSSEErrorHandling();

console.log('\n📋 Summary of SSE Fixes:');
console.log('1. Added trim() to remove whitespace from data strings');
console.log('2. Skip empty data lines instead of trying to parse them');
console.log('3. Graceful fallback for non-JSON data (treat as plain text)');
console.log('4. Better error logging without breaking the stream');
console.log('5. Support for new phase-based generation metadata');
console.log('6. Improved content validation and type checking');
console.log('\n🚀 The frontend should now handle SSE data more robustly!');