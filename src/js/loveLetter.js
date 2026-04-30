export const startLoveLetter = () => {
    const loveLetterSection = document.querySelector('.love-letter-section');
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('openEnvelope');
    const lettersContainer = document.getElementById('lettersContainer');

    const messages = [
        "Wish you the happiest birthday, Khushi!",
        "One picture from you can change my whole day, my whole mood, my whole heartbeat.",
        "Even through screens and pixels, your laugh reaches me like sunlight through a window.",
        "Every notification from you feels like a heartbeat whispering, I’m here, and I love you.",
        "Our messages might travel through wires, but every word you send lands straight in my heart.",
        "Ever since we met, my heart knew where it wanted to stay— with you.",
        "You turned ordinary days into moments that feel beautifully meant to be."
    ];

    let currentMsgIndex = 0;

    loveLetterSection.style.display = 'flex';
    loveLetterSection.classList.add('fade-in');

    openBtn.addEventListener('click', () => {
        envelope.classList.add('active');
        
        setTimeout(() => {
            // Hide envelope to center the letter better
            envelope.style.opacity = "0";
            setTimeout(() => {
                envelope.style.display = "none";
                showNextLetter();
            }, 600);
        }, 800);
    });

    const showNextLetter = () => {
        if (currentMsgIndex >= messages.length) {
            // End of letters
            const endMsg = document.createElement('div');
            endMsg.className = 'letter show';
            endMsg.innerHTML = `
                <p>That's all for now... I hope this made you smile. 🤍</p>
                <cite>Forever yours, ${window.SENDER_NAME || ''}</cite>
            `;
            lettersContainer.appendChild(endMsg);
            return;
        }

        const msg = messages[currentMsgIndex];
        const letter = document.createElement('blockquote');
        letter.className = 'letter';
        letter.innerHTML = `
            <p>${msg}</p>
            <cite>${window.SENDER_NAME || 'With Love'}</cite>
            <span style="font-size: 0.8rem; color: #888; margin-top: 20px; font-style: italic;">(Swipe to next)</span>
        `;
        
        // Random rotation
        const rot = (Math.random() - 0.5) * 5;
        letter.style.setProperty('--rot', `${rot}deg`);
        
        // lettersContainer.innerHTML = ''; // Do NOT clear, we want to see the old one fall away
        lettersContainer.appendChild(letter);
        
        setTimeout(() => {
            letter.classList.add('show');
        }, 100);

        // Swipe logic
        let startY = 0;
        let startX = 0;

        const triggerNext = () => {
            if (!letter.classList.contains('show')) return;
            letter.classList.remove('show');
            letter.classList.add('swipe-out'); 
            
            setTimeout(() => {
                letter.remove(); 
            }, 800);

            currentMsgIndex++;
            showNextLetter();
        };

        const handleSwipe = (e) => {
            const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
            const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            
            if (Math.abs(endY - startY) > 30 || Math.abs(endX - startX) > 30) {
                triggerNext();
            }
        };

        letter.addEventListener('touchstart', e => {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        });
        letter.addEventListener('touchend', handleSwipe);

        letter.addEventListener('mousedown', e => {
            startY = e.clientY;
            startX = e.clientX;
        });
        letter.addEventListener('mouseup', handleSwipe);
    };
};
