// TextEditor.js
class TextEditor {
    constructor() {
      this.init();
    }
  
    async init() {
      // Initialize IndexedDB
      const db = await idb.openDB('text-editor-db', 1, {
        upgrade(db) {
          db.createObjectStore('content');
        }
      });
  
      // Load content from IndexedDB
      const textArea = document.getElementById('editor');
      const content = await db.get('content', 1);
      if (content) {
        textArea.value = content;
      }
  
      // Save content to IndexedDB when unfocused
      textArea.addEventListener('blur', async () => {
        await db.put('content', textArea.value, 1);
      });
    }
  }
  
  new TextEditor();
  