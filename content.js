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
    // Détermine si on est sur Google
    const isGoogle = window.location.hostname.includes('google');
    
    const titleElements = document.querySelectorAll(`
        .cardText-first a.textActionButton,
        .listItemBodyText bdi,
        h3.LC20lb,
        .DKV0Md,
        .yuRUbf h3,
        .VwiC3b
    `);

    titleElements.forEach(element => {
        if (!element.hasAttribute('data-modified')) {
            const originalTitle = element.textContent;
            
            if (isGoogle) {
                // Pour Google : 2-3 remplacements aléatoires
                const words = originalTitle.split(' ');
                const numReplacements = Math.floor(Math.random() * 2) + 2; // 2 ou 3
                
                for (let i = 0; i < numReplacements; i++) {
                    const randomIndex = Math.floor(Math.random() * words.length);
                    const randomWord = getRandomWord(replacementWords);
                    words[randomIndex] = randomWord;
                }
                
                element.textContent = words.join(' ');
            } else {
                // Comportement original pour les autres sites
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
