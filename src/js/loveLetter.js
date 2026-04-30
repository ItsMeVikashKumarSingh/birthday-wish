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
            <button class="next-letter-btn">Next Message ➔</button>
        `;
        
        // Random rotation
        const rot = (Math.random() - 0.5) * 5;
        letter.style.setProperty('--rot', `${rot}deg`);
        
        lettersContainer.innerHTML = ''; // Clear previous
        lettersContainer.appendChild(letter);
        
        setTimeout(() => {
            letter.classList.add('show');
        }, 100);

        letter.querySelector('.next-letter-btn').onclick = () => {
            letter.classList.remove('show');
            setTimeout(() => {
                currentMsgIndex++;
                showNextLetter();
            }, 500);
        };
    };
};
