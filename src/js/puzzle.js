export const startPuzzle = () => {
    const puzzleSection = document.querySelector('.puzzle-section');
    const garden = document.getElementById('balloonGarden');
    const messages = [
        "You are amazing!",
        "Keep smiling!",
        "Have a blast!",
        "Stay blessed!",
        "Love you!",
        "Birthday Magic!"
    ];

    puzzleSection.style.display = 'flex';
    puzzleSection.classList.add('fade-in');

    let poppedCount = 0;

    messages.forEach((msg, i) => {
        const balloon = document.createElement('div');
        balloon.className = 'puzzle-balloon';
        balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        balloon.style.animationDelay = `${i * 0.2}s`;
        
        const msgSpan = document.createElement('span');
        msgSpan.className = 'balloon-message';
        msgSpan.innerText = msg;
        balloon.appendChild(msgSpan);

        balloon.addEventListener('click', () => {
            if (!balloon.classList.contains('popped')) {
                // Hide previously popped messages
                document.querySelectorAll('.balloon-message').forEach(m => {
                    if (m !== msgSpan && m.parentElement.classList.contains('popped')) {
                        m.style.animation = 'none'; 
                        m.style.opacity = '0'; 
                        m.style.transform = 'scale(0.8) translateY(-10px)';
                        m.style.transition = 'all 0.3s ease';
                    }
                });

                balloon.classList.add('popped');
                poppedCount++;
                
                if (poppedCount === messages.length) {
                    setTimeout(() => {
                        puzzleSection.style.display = 'none';
                        import('./loveLetter.js').then(m => m.startLoveLetter());
                    }, 2000);
                }
            }
        });

        garden.appendChild(balloon);
    });
};
