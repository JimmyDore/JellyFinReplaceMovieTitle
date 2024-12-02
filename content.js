function replaceRandomWord(title, replacement) {
    const words = title.split(' ');
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      words[randomIndex] = replacement;
      return words.join(' ');
    }
    return title;
  }
  
  function getRandomWord(words, excludedWord = null) {
    if (words.length <= 1) {
        return words[0];
    }
    
    const availableWords = excludedWord ? 
        words.filter(word => word !== excludedWord) : 
        words;
    
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }
  
  // Fonction pour modifier les titres
  function modifyTitles(replacementWords) {
    console.log("Modification avec les mots:", replacementWords);
    const titleElements = document.querySelectorAll('.cardText-first a.textActionButton, .listItemBodyText bdi');
    
    titleElements.forEach(element => {
        if (!element.hasAttribute('data-modified')) {
            const originalTitle = element.textContent;
            
            if (originalTitle.includes(':')) {
                const [leftPart, rightPart] = originalTitle.split(':');
                const leftWords = leftPart.trim().split(' ');
                const rightWords = rightPart.trim().split(' ');
                
                const randomWord1 = getRandomWord(replacementWords);
                const randomWord2 = getRandomWord(replacementWords, randomWord1);
                
                if (leftWords.length > 0) {
                    leftWords[leftWords.length - 1] = randomWord1;
                }
                if (rightWords.length > 0) {
                    rightWords[rightWords.length - 1] = randomWord2;
                }
                
                element.textContent = `${leftWords.join(' ')} : ${rightWords.join(' ')}`;
            } else {
                const words = originalTitle.split(' ');
                if (words.length > 0) {
                    const lastWord = words[words.length - 1];
                    const randomWord = replacementWords[Math.floor(Math.random() * replacementWords.length)];
                    if (!isNaN(lastWord)) {
                        element.textContent = originalTitle + ' ' + randomWord;
                    } else {
                        words[words.length - 1] = randomWord;
                        element.textContent = words.join(' ');
                    }
                }
            }
            element.setAttribute('data-modified', 'true');
        }
    });
  }
  
  // Observer les changements dans le DOM
  const observer = new MutationObserver((mutations) => {
    chrome.storage.sync.get('replacementWords', (data) => {
      const replacementWords = data.replacementWords || ['mot1', 'mot2', 'mot3'];
      modifyTitles(replacementWords);
    });
  });
  
  // Configuration de l'observer
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Exécution initiale
  chrome.storage.sync.get('replacementWords', (data) => {
    const replacementWords = data.replacementWords || ['mot1', 'mot2', 'mot3'];
    modifyTitles(replacementWords);
  });
