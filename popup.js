document.getElementById('saveButton').addEventListener('click', () => {
  const text = document.getElementById('replacementWords').value;
  // Sépare le texte en mots (un par ligne) et enlève les lignes vides
  const words = text.split('\n').filter(word => word.trim() !== '');
  
  chrome.storage.sync.set({ replacementWords: words }, () => {
    alert('Mots sauvegardés !');
  });
});

// Charger les mots existants
chrome.storage.sync.get('replacementWords', (data) => {
  if (data.replacementWords) {
    document.getElementById('replacementWords').value = data.replacementWords.join('\n');
  }
});