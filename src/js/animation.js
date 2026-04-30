//jshint esversion:6

const button = document.querySelector(".btn"),
  darkroom = document.querySelector(".darkroom"),
  giftroom = document.querySelector(".giftroom"),
  hallway = document.querySelector(".hallway"),
  room = document.querySelector(".empty-room"),
  flash = document.querySelector(".flash");

// These are the text elements that hold messages to be displayed in the respective screes

const blackText = document.querySelectorAll(".bb-text"), // msgs in the dark room scene
  giftText = document.querySelectorAll(".gift-text"), // msgs in the gift scene
  hallText = document.querySelectorAll(".hall-text"), // msgs in the hallway scene
  roomText = document.querySelectorAll(".room-text"), // msgs in empty room scene
  CTAtext = document.querySelector(".btn-ref");

//Elements in the card page

const frames = document.querySelectorAll(".frame"),
  msgWindow = document.querySelector(".scroll"), // this one has the message frame in [0] and card fram in [1]
  msg = document.querySelector(".text"); // the Message para

//Sfx files

const light = document.querySelector(".switch-aud"),
  blast = document.querySelector(".blast-aud"),
  door = document.querySelector(".door-aud"),
  haunt = document.querySelector(".haunt-aud"),
  music = document.querySelector(".hbd-aud");

//  readMsg() displays the paras in each scene successively. It takes an array of the para elements as input.

const readMsg = (text) => {
  for (let i = 0; i < text.length; i++) {
    // this loop goes through all the text msg paras
    setTimeout(() => {
      // A timeout of 5s ia applied to all text elements so that appear successively one after the other
      text[i].classList.add("read"); // this adds a fadeIn-fadeOut animation to elements
      if (i === text.length - 1) {
        // this ensures that the button appears only after the last text is displayed.
        button.style.display = "inline-block";
        CTAtext.style.display = "block";
      }
    }, 5000 * i);
  }
};

const celebrate = () => {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const colors = ['#FFD700', '#FFA500', '#FF69B4', '#FF1493', '#FFFFFF'];
  
  class Particle {
    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.2;
      this.vx = (Math.random() - 0.5) * 25;
      this.vy = (Math.random() - 0.5) * 25 - 10;
      this.gravity = 0.2;
      this.friction = 0.98;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.size = Math.random() * 8 + 2;
      this.life = 1;
      this.decay = Math.random() * 0.01 + 0.002;
      this.isHeart = Math.random() > 0.6;
    }

    draw() {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      if (this.isHeart) {
        ctx.font = `${this.size * 2}px serif`;
        ctx.fillText('❤️', this.x, this.y);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.angle += this.spin;
      this.x += this.vx + Math.sin(this.angle) * 3; // Flutter effect
      this.y += this.vy;
      this.life -= this.decay;
    }
  }

  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }

  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    if (particles.length > 0) {
      requestAnimationFrame(animateParticles);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  animateParticles();
};

// transition() is animation for change from one scene to another. It takes the current scene div element as input.

const transition = (currentScene) => {
  currentScene.classList.add("fade-in");
  currentScene.style.opacity = "0";
  button.style.display = "none";
  CTAtext.style.display = "none";
};

//Animation Code

/*
    In the beginning, the black page appears signifying a dark room and after displaying the msg paras
    one by one, a button(bulb) appears and the user is asked to click the button to swith on the lights.
*/

export const animate = function () {
  CTAtext.innerHTML = "Click the Light Bulb.";

  readMsg(blackText);

  button.addEventListener("click", function () {
    if (button.classList.contains("switch")) {
      /* 
              When the switch is pressed, the black div will wipe out and the backgroung scene with no 
              elements will appear, signifying that the lights are turned on and the room is empty. Then 
              the msg will be displayed after which, the user will be asked to move out and the button with
              door icon will appear. 
          */

      light.play();
      transition(darkroom);
      CTAtext.innerHTML = "Click the Door";
      setTimeout(function () {
        button.classList.add("door-out");
        button.classList.remove("switch");
        darkroom.style.display = "none";
        readMsg(roomText);
      }, 4000);
    } else if (button.classList.contains("door-out")) {
      /* 
              when the door is pressed, scene changes to cemetry. Again, the msg will be displayed, after 
              which, the user will be asked to come inside and the button with door will appear again.
          */

      door.play();
      transition(room);
      setTimeout(function () {
        haunt.play();
        haunt.loop = true;
        button.classList.add("door-in");
        button.classList.remove("door-out");
        room.style.display = "none";
        readMsg(hallText);
      }, 4000);
    } else if (button.classList.contains("door-in")) {
      /* 
              when the door is pressed, scene changes to the gift room. Again, the msg will be displayed, after 
              which, the user will be asked to open the gift and the button with gift will appear.
          */

      door.play();
      transition(hallway);
      CTAtext.innerHTML = "Click the Gift";
      setTimeout(function () {
        button.classList.add("gift");
        button.classList.remove("door-in");
        hallway.style.display = "none";
        readMsg(giftText);
      }, 4000);
    } else if (button.classList.contains("gift")) {
      /* 
              when the gift is pressed, the gift scene vanishes and the white div fades slowly giving a sense 
              of explosion. After that, the message frame appears and moves up until the message completes. Then,
              the message frame fades away and the card appears.
          */

      haunt.pause();
      blast.play();
      giftroom.style.display = "none";
      celebrate();
      transition(flash);

      music.loop = true;
      music.play();

      if (!process.env.SCROLL_MSG) {
        frames[0].style.display = "flex";
        setTimeout(() => {
          frames[0].classList.add("appear");
          frames[0].style.opacity = "1";
        }, 1500);
        return;
      }

      //This value is stored in the --readTime css variable of root element and is calculated dynamically at build time.
      const readTime =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--readTime"
          )
        ) + 5;

      frames[1].style.display = "flex";

      setTimeout(() => {
        frames[1].classList.add("appear");
        frames[1].style.opacity = "1";
        msg.classList.add("move-up");
      }, 1500);

      setTimeout(() => {
        msg.style.transform = "translateY(-100%)";
        flash.style.display = "none";
      }, 5000);

      setTimeout(() => {
        msgWindow.classList.add("fade-in");
        msgWindow.style.opacity = "0";
      }, readTime * 1000);

      setTimeout(() => {
        frames[1].style.display = "none";
        frames[0].style.display = "flex";
        frames[0].classList.add("appear");
        frames[0].style.opacity = "1";

        frames[0].classList.add("appear");
        frames[0].style.opacity = "1";

        // Navigation for HBD -> NASA
        document.getElementById("nextToNasa").onclick = () => {
          frames[0].classList.add("fade-out");
          setTimeout(() => {
            frames[0].style.display = "none";
            const nasaFrame = document.querySelector(".frame-nasa");
            nasaFrame.style.display = "flex";
            nasaFrame.classList.add("appear");
            
            const pic2 = document.querySelector(".bd-pic-2");
            if (pic2) {
                pic2.style.display = "block";
                pic2.classList.add("fade-in");
            }
          }, 1500);
        };

        // Navigation for NASA -> Wishes
        document.getElementById("nextToWishes").onclick = () => {
          const nasaFrame = document.querySelector(".frame-nasa");
          nasaFrame.classList.add("fade-out");
          setTimeout(() => {
            nasaFrame.style.display = "none";
            const wishesFrame = document.querySelector(".frame-wishes");
            wishesFrame.style.display = "flex";
            wishesFrame.classList.add("appear");
          }, 1500);
        };

        // Navigation for Wishes -> Puzzle
        document.getElementById("nextToPuzzle").onclick = () => {
          const wishesFrame = document.querySelector(".frame-wishes");
          wishesFrame.classList.add("fade-out");
          setTimeout(() => {
            wishesFrame.style.display = "none";
            import('./puzzle.js').then(m => m.startPuzzle());
          }, 1500);
        };

        // Modal Toggle Logic
        const setupModal = (openId, modalId, closeIds) => {
          const openBtn = document.getElementById(openId);
          const modal = document.getElementById(modalId);
          
          if (openBtn && modal) {
            openBtn.onclick = () => {
              modal.classList.add('active');
            };
            
            closeIds.forEach(id => {
              const closeBtn = document.getElementById(id);
              if (closeBtn) {
                closeBtn.onclick = () => {
                  modal.classList.remove('active');
                };
              }
            });
          }
        };

        setupModal('openMsgModal', 'msgModal', ['closeMsgModal', 'closeMsgModalOverlay']);
        setupModal('openNasaModal', 'nasaModal', ['closeNasaModal', 'closeNasaModalOverlay']);
      }, (readTime + 3) * 1000);
    }
  });
};
