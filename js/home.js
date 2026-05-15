// THEME TOGGLE

function toggleTheme() {

    const body =
        document.body

    const toggleBtn =
        document.querySelector(
            '.theme-toggle'
        )

    if (
        body.classList.contains(
            'dark'
        )
    ) {

        body.classList.remove(
            'dark'
        )

        body.classList.add(
            'light'
        )

        if (toggleBtn)
            toggleBtn.textContent =
                '🌙'

    } else {

        body.classList.remove(
            'light'
        )

        body.classList.add(
            'dark'
        )

        if (toggleBtn)
            toggleBtn.textContent =
                '☀️'
    }
}

// =========================
// MOUSE + TOUCH TRAIL
// =========================

function initMouseTrail() {

    const canvas =
        document.getElementById(
            'mouse-trail'
        )

    if (!canvas) return

    const ctx =
        canvas.getContext('2d')

    let width = 0
    let height = 0

    let particles = []

    let pointer = {

        x: 0,
        y: 0,

        prevX: 0,
        prevY: 0
    }

    // =========================
    // PARTICLE CLASS
    // =========================

    class Particle {

        constructor(
            x,
            y,
            color
        ) {

            this.x = x
            this.y = y

            this.vx =
                (Math.random() - 0.5) * 3

            this.vy =
                (Math.random() - 0.5) * 3

            this.life =
                60 + Math.random() * 40

            this.color = color

            this.size =
                Math.random() * 4 + 2
        }

        update() {

            this.x += this.vx
            this.y += this.vy

            this.vx *= 0.98
            this.vy *= 0.98

            this.life--
        }

        draw() {

            const alpha =
                this.life / 100

            ctx.save()

            ctx.globalAlpha = alpha

            ctx.fillStyle =
                this.color

            ctx.shadowBlur = 15

            ctx.shadowColor =
                this.color

            ctx.beginPath()

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            )

            ctx.fill()

            ctx.restore()
        }
    }

    // =========================
    // RESIZE
    // =========================

    function resize() {

        width =
            canvas.width =
            window.innerWidth

        height =
            canvas.height =
            window.innerHeight
    }

    // =========================
    // CREATE PARTICLES
    // =========================

    function spawnParticles(
        x,
        y
    ) {

        const isDark =
            document.body
            .classList
            .contains('dark')

        const trailColor =
            isDark
            ? (
                Math.random() > 0.5
                ? '#00f5ff'
                : '#ff00ff'
            )
            : (
                Math.random() > 0.5
                ? '#0066ff'
                : '#8a2be2'
            )

        for (let i = 0; i < 4; i++) {

            particles.push(

                new Particle(
                    x,
                    y,
                    trailColor
                )
            )
        }
    }

    // =========================
    // ANIMATION
    // =========================

    function animate() {

        ctx.fillStyle =
            document.body
            .classList
            .contains('dark')
            ? 'rgba(10,10,15,0.15)'
            : 'rgba(240,244,255,0.15)'

        ctx.fillRect(
            0,
            0,
            width,
            height
        )

        for (
            let i = particles.length - 1;
            i >= 0;
            i--
        ) {

            particles[i].update()

            particles[i].draw()

            if (
                particles[i].life <= 0
            ) {

                particles.splice(i, 1)
            }
        }

        requestAnimationFrame(
            animate
        )
    }

    // =========================
    // DESKTOP MOUSE
    // =========================

    window.addEventListener(
        'mousemove',
        e => {

            pointer.x =
                e.clientX

            pointer.y =
                e.clientY

            if (

                Math.hypot(

                    pointer.x -
                    pointer.prevX,

                    pointer.y -
                    pointer.prevY

                ) > 8

            ) {

                spawnParticles(
                    pointer.x,
                    pointer.y
                )

                pointer.prevX =
                    pointer.x

                pointer.prevY =
                    pointer.y
            }
        }
    )

    // =========================
    // MOBILE TOUCH
    // =========================

    window.addEventListener(
        'touchmove',
        e => {

            const touch =
                e.touches[0]

            if (!touch) return

            pointer.x =
                touch.clientX

            pointer.y =
                touch.clientY

            if (

                Math.hypot(

                    pointer.x -
                    pointer.prevX,

                    pointer.y -
                    pointer.prevY

                ) > 8

            ) {

                spawnParticles(
                    pointer.x,
                    pointer.y
                )

                pointer.prevX =
                    pointer.x

                pointer.prevY =
                    pointer.y
            }
        },
        { passive: true }
    )

    // =========================
    // RESIZE EVENT
    // =========================

    window.addEventListener(
        'resize',
        resize
    )

    resize()

    animate()
}

// =========================
// INIT
// =========================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        initMouseTrail()

        document.addEventListener(
            'keydown',
            e => {

                if (
                    e.key.toLowerCase()
                    === 't'
                ) {

                    toggleTheme()
                }
            }
        )
    }
)
