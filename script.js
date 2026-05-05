document.addEventListener('DOMContentLoaded', () => {

    /* --- TERMINAL INTERACTIVA LOGIC --- */
    const termInput = document.getElementById('terminalInput');
    const termBody = document.getElementById('terminalBody');

    if(termInput && termBody) {
        // Base de datos de comandos
        const commands = {
            'help': 'Comandos disponibles: <span class="term-highlight">whoami, cat skills.json, clear, sudo, date, download cv</span>',
            'whoami': 'enrique_contreras - Backend Developer buscando optimizar procesos y construir sistemas robustos.',
            'date': new Date().toString(),
            'sudo': '<span class="term-error">Permiso denegado. Este incidente será reportado al CTO.</span>',
            'cat skills.json': `{\n  "status": 200,\n  "data": {\n    "core": ["Java", "Spring Boot", "Spring Batch"],\n    "databases": ["SQL", "DBeaver"],\n    "devops": ["Docker", "GitLab"]\n  }\n}`,
            'download cv': 'Iniciando descarga del currículum... <br><span class="term-success">¡Descarga completada!</span>'
        };

        // Forzar foco en la terminal al hacer clic en ella
        document.querySelector('.terminal-window').addEventListener('click', () => {
            termInput.focus();
        });

        termInput.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                termInput.value = '';

                // Imprimir el comando ejecutado
                termBody.innerHTML += `<div class="term-line"><span class="term-prompt">enrique@backend:~$</span> ${cmd}</div>`;

                // Evaluar comando
                if(cmd === 'clear') {
                    termBody.innerHTML = '';
                } else if(commands[cmd]) {
                    
                    // LÓGICA ESPECIAL PARA EL CV
                    if(cmd === 'download cv') {
                        termBody.innerHTML += `<div class="term-line">${commands[cmd]}</div>`;
                        
                        // Crear enlace invisible para forzar la descarga
                        const link = document.createElement('a');
                        // OJO: Asegúrate de tener un PDF real con este nombre en tu carpeta
                        link.href = 'CV_Enrique_Contreras.pdf'; 
                        link.download = 'CV_Enrique_Contreras.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                    } else if(cmd.includes('json')) {
                        termBody.innerHTML += `<pre class="term-json">${commands[cmd]}</pre>`;
                    } else {
                        termBody.innerHTML += `<div class="term-line">${commands[cmd]}</div>`;
                    }
                    
                } else if(cmd !== '') {
                    termBody.innerHTML += `<div class="term-line term-error">bash: ${cmd}: command not found. Escribe 'help' para ver la lista de comandos.</div>`;
                }

                // Auto-scroll hacia abajo
                termBody.scrollTop = termBody.scrollHeight;
            }
        });
    }
    /* --- PROGRESS BAR --- */
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + '%';
        
        // Nav Shadow
        const nav = document.getElementById('nav');
        if(window.scrollY > 50) { nav.classList.add('scrolled'); } 
        else { nav.classList.remove('scrolled'); }
    });

    /* --- HAMBURGUESA & MOBILE NAV --- */
    const burger = document.getElementById('navBurger');
    const navMobile = document.getElementById('navMobile');
    burger.addEventListener('click', () => {
        const open = navMobile.classList.toggle('open');
        burger.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });
    
    document.querySelectorAll('.mob-link, .mob-cta').forEach(a => {
        a.addEventListener('click', () => {
            navMobile.classList.remove('open');
            burger.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* --- TYPEWRITER EFFECT --- */
    const text = "// Backend Developer  ·  Java · Spring Boot · Spring Batch  ·  Andújar, Jaén";
    const speed = 50;
    let i = 0;
    const typeWriterEl = document.getElementById("typewriter");
    
    function typeWriter() {
        if (i < text.length) {
            typeWriterEl.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    // Iniciar con ligero retraso
    setTimeout(typeWriter, 1000);

    /* --- EMAIL PROTEGIDO --- */
    const u = 'cnntreraslopez.enrique', d = 'gmail.com', email = u + '@' + d;
    const subject = '?subject=Hola%20Enrique%20-%20Contacto%20desde%20portfolio';
    const link = document.getElementById('emailLink');
    const display = document.getElementById('emailDisplay');
    if(display) display.textContent = email;
    if(link){
        const href = 'mailto:' + email + subject;
        link.setAttribute('href', href);
        link.addEventListener('click', e => {
            e.preventDefault();
            window.location.href = href;
        });
    }

    /* --- CURSOR MEJORADO --- */
    const cDot = document.getElementById('cDot');
    const cRing = document.getElementById('cRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    // Verificar si es dispositivo táctil
    const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    
    if(!isTouch) {
        document.addEventListener('mousemove', e => {
            mx = e.clientX; 
            my = e.clientY;
            cDot.style.left = mx + 'px';
            cDot.style.top = my + 'px';
        });
        
        const loop = () => {
            rx += (mx - rx) * 0.15; // Suavidad
            ry += (my - ry) * 0.15;
            cRing.style.left = rx + 'px';
            cRing.style.top = ry + 'px';
            requestAnimationFrame(loop);
        };
        loop();

        // Efecto hover en enlaces
        document.querySelectorAll('a, button, .tilt-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cRing.style.width = '60px';
                cRing.style.height = '60px';
                cRing.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
                cDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cRing.style.width = '40px';
                cRing.style.height = '40px';
                cRing.style.backgroundColor = 'transparent';
                cDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    /* --- MAGNETIC BUTTONS --- */
    if(!isTouch) {
        document.querySelectorAll('.magnetic').forEach(elem => {
            elem.addEventListener('mousemove', e => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            elem.addEventListener('mouseleave', () => {
                elem.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    /* --- 3D TILT EFFECT --- */
    if(!isTouch) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10; // Invertir X
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Actualizar gradiente radial en skills
                if(card.classList.contains('skill-card')) {
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    /* --- COUNTER ANIMATION --- */
    const runCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const update = () => {
            current += step;
            if(current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                el.innerText = target;
            }
        };
        update();
    };

    /* --- SCROLL REVEAL & INTERSECTION OBSERVER --- */
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting) {
                e.target.classList.add('vis');
                
                // Llenar barras de progreso
                e.target.querySelectorAll('.sk-bar').forEach(b => {
                    b.style.width = b.getAttribute('data-w') + '%';
                });
                
                // Iniciar contadores
                e.target.querySelectorAll('.counter').forEach(c => {
                    if(!c.classList.contains('counted')) {
                        runCounter(c);
                        c.classList.add('counted');
                    }
                });
                
                obs.unobserve(e.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .stagger, .metric-item').forEach(el => obs.observe(el));

    /* --- SMOOTH SCROLL --- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = a.getAttribute('href');
            if(target === '#') return;
            e.preventDefault();
            const t = document.querySelector(target);
            if(t) {
                const headerOffset = 60;
                const elementPosition = t.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* --- HERO CANVAS PARTICLES --- */
    const canvas = document.getElementById('heroCanvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        
        window.addEventListener('resize', resize);
        resize();
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.baseOpacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > width) this.x = 0;
                else if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                else if (this.y < 0) this.y = height;
                
                // Interacción con ratón
                if(!isTouch) {
                    const dx = mx - this.x;
                    const dy = my - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        this.x -= dx * 0.01;
                        this.y -= dy * 0.01;
                    }
                }
            }
            draw() {
                ctx.fillStyle = `rgba(56, 189, 248, ${this.baseOpacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(Math.floor(width * height / 15000), 100);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        
        initParticles();
        
        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Dibujar líneas entre partículas cercanas
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - distance/120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateCanvas);
        };
        
        animateCanvas();
    }
});