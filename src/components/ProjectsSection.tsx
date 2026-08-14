import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SlowMo } from 'gsap/EasePack'
import { Link } from 'react-router-dom'
import './work-section.css'

gsap.registerPlugin(ScrollTrigger, SlowMo)

type Work = {
  caption: string
  site: string
  src: string
}

const images = import.meta.glob('../assets/projects/*.{png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const imageMap: Record<string, string> = {}
for (const [path, url] of Object.entries(images)) {
  const name = path.split('/').pop() as string
  imageMap[name] = url
}

const works: Work[] = [
  { caption: 'Nova Dashboard', site: 'https://github.com/sewinx07', src: imageMap['1.png'] },
  { caption: 'Bloom Brand Identity', site: 'https://github.com/sewinx07', src: imageMap['2.png'] },
  { caption: 'Vertex Media Reel', site: 'https://github.com/sewinx07', src: imageMap['3.png'] },
  { caption: 'Flux E-Commerce', site: 'https://github.com/sewinx07', src: imageMap['4.png'] },
  { caption: 'Prism Visual Kit', site: 'https://github.com/sewinx07', src: imageMap['5.png'] },
  { caption: 'Pulse Promo', site: 'https://github.com/sewinx07', src: imageMap['6.png'] },
  { caption: 'Neon Brand System', site: 'https://github.com/sewinx07', src: imageMap['7.png'] },
  { caption: 'Orbit App Design', site: 'https://github.com/sewinx07', src: imageMap['8.png'] },
  { caption: 'Drift Motion Reel', site: 'https://github.com/sewinx07', src: imageMap['9.png'] },
  { caption: 'Echo Web Platform', site: 'https://github.com/sewinx07', src: imageMap['10.png'] },
  { caption: 'Vibe Social Campaign', site: 'https://github.com/sewinx07', src: imageMap['11.png'] },
]

function workKey(index: number, total: number) {
  const key = Math.random().toString(36).slice(2, 6)
  return `${key}-${String(index).padStart(4, '0')}/${String(total).padStart(2, '0')}`
}

type Mask = {
  width: number
  height: number
  maxScale: number
  lines: Array<{ p1: { x: number; y: number }; p2: { x: number; y: number } }>
  el: HTMLElement
  svg: SVGSVGElement
  pathOuter: SVGPathElement
  pathInner: SVGPathElement
  pathLines: SVGPathElement
}

type Ghost = {
  el: HTMLElement
  x: number
  y: number
  z: number
  i: number
  p: number
  ap: number
  mx: number
  my: number
}

type Letter = {
  el: HTMLElement
  ghosts: Ghost[]
  width: number
  height: number
  top: number
  left: number
  freq: number
  total: number
}

type Point = { x: number; y: number; dx: number; dy: number; m: number; flowX: number }

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [err, setErr] = useState<string | null>(null)
  const [status, setStatus] = useState('mounting')

  useEffect(() => {
    try {
      const el = sectionRef.current
      if (!el) return

    const container = el.querySelector<HTMLElement>('.js-container') as HTMLElement
    const ruler = el.querySelector<HTMLElement>('.js-ruler') as HTMLElement
    const scene = el.querySelector<HTMLElement>('.js-scene') as HTMLElement
    const canvas = el.querySelector<HTMLCanvasElement>('.js-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const title = el.querySelector<HTMLElement>('.js-title') as HTMLElement
    const viewAll = el.querySelector<HTMLElement>('.js-viewall') as HTMLElement

    const mask: Mask = {
      width: 0,
      height: 0,
      maxScale: 1,
      lines: [],
      el: el.querySelector('.js-mask') as HTMLElement,
      svg: el.querySelector('.js-mask-svg') as SVGSVGElement,
      pathOuter: el.querySelector('.js-mask-path-outer') as SVGPathElement,
      pathInner: el.querySelector('.js-mask-path-inner') as SVGPathElement,
      pathLines: el.querySelector('.js-mask-path-lines') as SVGPathElement,
    }

    const letters: Letter[] = []
    title.querySelectorAll<HTMLElement>('.js-letter').forEach((_letter) => {
      letters.push({
        el: _letter,
        ghosts: [],
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        freq: 1,
        total: 0,
      })
    })

    const worksEl: HTMLElement[] = []
    container.querySelectorAll<HTMLElement>('.js-work').forEach((_work) => {
      worksEl.push(_work)
    })

    let points: Point[] = []
    let bounding = {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    }
    let scrollProgress = 0
    let smoothScrollProgress = 0
    let speed = 0
    const progressState = { animationProgress: 0, pointsProgress: 0, state: 0 }
    const last = { animationProgress: 0, pointsProgress: 0 }

    let tl: gsap.core.Timeline | null = null
    let rafId = 0
    let isPaused = true
    let io: IntersectionObserver | null = null
    let resizeHandler: (() => void) | null = null
    const attrObservers: MutationObserver[] = []

    const setCtxStyle = () => {
      const color = getComputedStyle(el).getPropertyValue('--color-primary')
      requestAnimationFrame(() => {
        ctx.strokeStyle = color
      })
    }

    const setSize = () => {
      el.style.setProperty('--height', worksEl.length * 50 + 'lvh')

      const containerRect = container.getBoundingClientRect()

      bounding = {
        left: containerRect.left,
        top: containerRect.top,
        width: window.innerWidth,
        height: window.innerHeight,
      }

      canvas.width = bounding.width
      canvas.height = bounding.height

      speed = Math.hypot(bounding.width, bounding.height) * 4
    }

    const setMask = () => {
      const width = mask.el.clientWidth
      const height = mask.el.clientHeight

      mask.width = width
      mask.height = height

      mask.svg.style.width = width + 'px'
      mask.svg.style.height = height + 'px'

      const elBounding = el.getBoundingClientRect()
      const rulerBounding = ruler.getBoundingClientRect()
      const rulerWidth = rulerBounding.width
      const rulerHeight = rulerBounding.height
      const offsetX = rulerBounding.left - elBounding.left
      const offsetY = rulerBounding.top - elBounding.top

      // Shape
      const dOuter = `M -1 0 L ${width + 2} 0 L ${width + 2} ${height} L -1 ${height} Z`

      // Mask outer
      const corners = {
        tl: { x: offsetX, y: offsetY },
        tr: { x: offsetX + rulerWidth, y: offsetY },
        br: { x: offsetX + rulerWidth, y: offsetY + rulerHeight },
        bl: { x: offsetX, y: offsetY + rulerHeight },
      }

      let size = (corners.tr.x - corners.tl.x) / 2

      mask.maxScale = window.innerWidth / size

      let dInner = `M ${corners.tl.x} ${corners.tl.y + size} A ${size} ${size} 0 0 1 ${corners.tr.x} ${corners.tr.y + size} L ${corners.br.x} ${corners.br.y - size} A ${size} ${size} 0 0 1 ${corners.bl.x} ${corners.bl.y - size} Z`
      const linesClip = `${dOuter} ${dInner}`

      mask.pathOuter.setAttribute('d', `${dOuter} ${dInner}`)

      // Mask inner
      const thickness = window.innerWidth > 767 ? 16 : 8
      corners.tl.x += thickness
      corners.tl.y += thickness

      corners.tr.x -= thickness
      corners.tr.y += thickness

      corners.br.x -= thickness
      corners.br.y -= thickness

      corners.bl.x += thickness
      corners.bl.y -= thickness

      size = (corners.tr.x - corners.tl.x) / 2

      dInner = `M ${corners.tl.x} ${corners.tl.y + size} A ${size} ${size} 0 0 1 ${corners.tr.x} ${corners.tr.y + size} L ${corners.br.x} ${corners.br.y - size} A ${size} ${size} 0 0 1 ${corners.bl.x} ${corners.bl.y - size} Z`

      mask.pathInner.setAttribute('d', `${dOuter} ${dInner}`)

      // Lines
      mask.lines = []

      const vLines = window.innerWidth > 767 ? 12 : 8
      const gapX = width / vLines
      const gapY = height * 0.1
      const hLines = Math.ceil(height / gapY)

      for (let i = 1; i < vLines; i++) {
        const x = gapX * i
        mask.lines.push({
          p1: { x, y: 0 },
          p2: { x, y: height },
        })
      }

      for (let i = 0; i < hLines; i++) {
        const y = gapY * i
        mask.lines.push({
          p1: { x: 0, y },
          p2: { x: width, y },
        })
      }

      let dLines = ''
      mask.lines.forEach((line) => {
        dLines += `M ${line.p1.x} ${line.p1.y} L ${line.p2.x} ${line.p2.y} `
      })

      mask.pathLines.setAttribute('d', dLines)
      mask.pathLines.style.clipPath = `path(evenodd, '${linesClip}')`
    }

    const setLetters = () => {
      letters.forEach((letter, j) => {
        letter.ghosts.forEach((ghost) => {
          ghost.el.remove()
        })
        letter.ghosts = []

        const boundingRect = letter.el.getBoundingClientRect()

        letter.width = boundingRect.width
        letter.height = boundingRect.height
        letter.top = boundingRect.top - bounding.top
        letter.left = boundingRect.left

        letter.freq = 1 + Math.random()

        const multiplier = window.innerWidth > 767 ? 0.75 : 0.5

        letter.total =
          Math.round((bounding.width / letter.width) * multiplier) + 2

        for (let i = 0; i < letter.total; i++) {
          const elGhost = document.createElement('span')
          elGhost.classList.add('s__scene__letter')
          elGhost.classList.add('js-letter')

          elGhost.innerText = letter.el.innerText
          elGhost.dataset.letter = letter.el.innerText

          scene.appendChild(elGhost)

          const ghost: Ghost = {
            el: elGhost,
            x: letter.left,
            y: letter.top,
            z: Math.random() * 100,
            i: i - letter.total * 0.5,
            p: (i / letter.total - 0.5) * 2,
            ap: Math.abs(i / letter.total - 0.5) * 2,
            mx: 0,
            my: 0,
          }

          elGhost.style.top = ghost.y + 'px'
          elGhost.style.left = ghost.x + 'px'

          elGhost.style.zIndex = String(
            j !== 1 && j !== 2 && (j + letters.length + i) % 5 === 0 ? 3 : 1
          )

          elGhost.style.setProperty('--ix', String(ghost.i))
          elGhost.style.setProperty(
            '--iy',
            String(((j + 1) / (letters.length + 1) - 0.5) * 2)
          )
          elGhost.style.setProperty('--ap', String(ghost.ap))
          elGhost.style.setProperty('--p', String(ghost.p))

          letter.ghosts.push(ghost)
        }
      })
    }

    const setWorks = () => {
      worksEl.forEach((elWork, i) => {
        elWork.style.setProperty('--size', String(0.5 + Math.random() * 0.5))
        elWork.style.setProperty(
          '--y',
          String((0.5 + Math.random() * 0.5) * (i % 2 ? -1 : 1))
        )
      })
    }

    const setTimeline = () => {
      if (tl) {
        tl.kill()
      }

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 25%',
          end: 'bottom 75%',
          scrub: 1,
        },
        onUpdate: () => {
          scene.style.setProperty('--state', String(progressState.state))
        },
      })

      tl.fromTo(
        mask.el,
        { scale: 1 },
        { scale: mask.maxScale, duration: 0.75, ease: 'power4.in' },
        0
      )

      tl.fromTo(
        scene,
        { scale: 0.75 },
        { scale: 1, duration: 0.75, ease: 'power3.in' },
        0
      )

      tl.fromTo(
        container,
        { clipPath: 'inset(0 1rem)' },
        { clipPath: 'inset(0 0rem)', duration: 0.75, ease: 'power3.in' },
        0
      )

      tl.fromTo(
        progressState,
        { pointsProgress: 0 },
        { pointsProgress: 1, duration: 1, ease: 'power4.inOut' },
        0
      )

      tl.fromTo(
        progressState,
        { state: 0 },
        { state: 1, duration: 0.75, ease: 'power4.in' },
        0
      )

      tl.fromTo(
        worksEl,
        { attr: { progress: 1 } },
        {
          attr: { progress: -1 },
          ease: 'slow(0.15, 0.6)',
          stagger: 0.25,
        },
        0.75
      )

      tl.fromTo(
        progressState,
        { animationProgress: 0 },
        {
          animationProgress: 10000,
          duration: tl.totalDuration(),
          ease: 'power1.out',
        },
        0.75
      )

      tl.fromTo(
        progressState,
        { state: 1 },
        {
          state: 0,
          duration: 0.75,
          ease: 'power4.inOut',
          immediateRender: false,
        },
        '-=1'
      )

      tl.fromTo(
        mask.el,
        { scale: mask.maxScale },
        {
          scale: 1,
          duration: 0.75,
          ease: 'power4.inOut',
          immediateRender: false,
        },
        '-=1'
      )

      tl.fromTo(
        scene,
        { scale: 1 },
        {
          scale: 0.75,
          duration: 0.75,
          ease: 'power3.inOut',
          immediateRender: false,
        },
        '-=1'
      )

      tl.fromTo(
        container,
        { clipPath: 'inset(0 0rem)' },
        {
          clipPath: 'inset(0 1rem)',
          duration: 0.75,
          ease: 'power3.inOut',
          immediateRender: false,
        },
        '-=1'
      )

      tl.fromTo(
        progressState,
        { pointsProgress: 1 },
        { pointsProgress: 0, duration: 1, ease: 'power4.inOut' },
        '-=1'
      )
    }

    // Observe progress attribute on each work -> --progress + is-inview
    worksEl.forEach((workEl) => {
      const mo = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.type === 'attributes' && m.attributeName === 'progress') {
            const val = (m.target as HTMLElement).getAttribute('progress')
            workEl.style.setProperty('--progress', val ?? '0.5')
            if (val === '1' || val === '-1') {
              workEl.classList.remove('is-inview')
            } else {
              workEl.classList.add('is-inview')
            }
          }
        })
      })
      mo.observe(workEl, { attributes: true, attributeFilter: ['progress'] })
      attrObservers.push(mo)
    })

    const setPoints = () => {
      points = []

      const gap = 24
      const cols = Math.ceil((bounding.width * 1.2) / gap)
      const rows = Math.ceil((bounding.height * 1.2) / gap)

      const offsetX = (bounding.width - cols * gap) * 0.5
      const offsetY = (bounding.height - rows * gap) * 0.5

      const hWidth = bounding.width * 0.5
      const hHeight = bounding.height * 0.5

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap + offsetX
          const y = j * gap + offsetY

          const dx = hWidth - x
          const dy = hHeight - y

          points.push({
            x,
            y,
            dx,
            dy,
            m: Math.random(),
            flowX: 0,
          })
        }
      }
    }

    const moveLetters = () => {
      letters.forEach((letter) => {
        const letterSpeed = speed * letter.freq
        letter.ghosts.forEach((ghost, index) => {
          let progress =
            (((progressState.animationProgress % letterSpeed) / letterSpeed +
              index / letter.total) %
              1) /
              0.7 -
            0.15

          ghost.el.style.setProperty('--progress', String(progress))
        })
      })
    }

    const movePoints = () => {
      points.forEach((p) => {
        p.flowX = (progressState.animationProgress * -0.05) % 24
      })
    }

    const drawPoints = () => {
      const rAnimationProgress = Math.round(progressState.animationProgress * 100) / 100
      const rPointsProgress = Math.round(progressState.pointsProgress * 100) / 100

      if (
        rPointsProgress === last.pointsProgress &&
        rAnimationProgress === last.animationProgress
      )
        return

      ctx.clearRect(0, 0, bounding.width, bounding.height)

      ctx.beginPath()

      points.forEach((point) => {
        const x = point.x + point.dx * (1 - progressState.pointsProgress) * 0.2 + point.flowX
        const y = point.y + point.dy * (1 - progressState.pointsProgress) * 0.2

        ctx.rect(x, y, 0.5, 0.5)
      })

      ctx.stroke()

      last.pointsProgress = rPointsProgress
      last.animationProgress = rAnimationProgress
    }

    const tick = () => {
      scrollProgress =
        Math.max(
          Math.min(1, ScrollTrigger.positionInViewport(el, 'top')),
          0
        ) *
          -1 +
        (1 -
          Math.max(
            Math.min(1, ScrollTrigger.positionInViewport(el, 'bottom')),
            0
          ))
      smoothScrollProgress += (scrollProgress - smoothScrollProgress) * 0.1

      el.style.setProperty('--scroll-progress', String(smoothScrollProgress))

      viewAll.classList.toggle('is-visible', smoothScrollProgress > 0.85)

      movePoints()
      moveLetters()
      drawPoints()
    }

    const loop = () => {
      if (!isPaused) {
        tick()
      }
      rafId = requestAnimationFrame(loop)
    }

    const onResize = () => {
      setCtxStyle()
      setSize()
      setMask()
      setPoints()
      setLetters()
      setWorks()
      setTimeline()
    }

    // Init
    setCtxStyle()
    setSize()
    setMask()
    setPoints()
    setLetters()
    setWorks()
    setTimeline()
    io = new IntersectionObserver(
      (entries) => {
        isPaused = !entries[0].isIntersecting
        if (!entries[0].isIntersecting) {
          viewAll.classList.remove('is-visible')
        }
      },
      { threshold: 0 }
    )
    io.observe(el)

    rafId = requestAnimationFrame(loop)

    resizeHandler = onResize
    window.addEventListener('resize', onResize)

    setStatus(
      `ok | works=${worksEl.length} letters=${letters.length} maskD=${mask.pathOuter
        .getAttribute('d')
        ?.slice(0, 40)} maskW=${mask.width}x${mask.height} vh=${window.innerHeight}`
    )

    return () => {
      isPaused = true
      cancelAnimationFrame(rafId)
      if (io) io.disconnect()
      attrObservers.forEach((o) => o.disconnect())
      if (resizeHandler) window.removeEventListener('resize', resizeHandler)
      if (tl) {
        if (tl.scrollTrigger) tl.scrollTrigger.kill()
        tl.kill()
      }
      letters.forEach((letter) => {
        letter.ghosts.forEach((ghost) => ghost.el.remove())
      })
      el.style.removeProperty('--height')
      el.style.removeProperty('--scroll-progress')
      viewAll.classList.remove('is-visible')
    }
    } catch (e) {
      setErr(String(e))
      setStatus('error')
    }
  }, [])
  return (
    <section id="work" className="s-work" ref={sectionRef}>
      <div className="s__outer">
        <div className="s__viewport">
          <div className="s__inner js-container">
          <h2 className="s__title">
            <span className="s__title__inner js-title">
              <span className="s__title__letter js-letter">W</span>
              <span className="s__title__letter js-letter">O</span>
              <span className="s__title__letter js-letter">R</span>
              <span className="s__title__letter js-letter">K</span>
            </span>
          </h2>

          <div className="s__scene js-scene">
            {works.map((work, index) => (
              <div
                key={index}
                className="s__scene__work s__scene__work--video js-work"
              >
                <div className="a__inner">
                  <a href={work.site} target="_blank" rel="noopener noreferrer">
                    <img
                      className="a__video js-video"
                      src={work.src}
                      alt={work.caption}
                      loading="lazy"
                      width="1082"
                      height="636"
                    />
                    <div className="a__caption">
                      <div className="a__caption__text">{work.caption}</div>
                      <div className="a__caption__key">
                        #{workKey(index, works.length)}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <canvas className="s__canvas js-canvas"></canvas>
          </div>

          <div className="s__mask-outer">
            <div className="s__mask js-mask">
              <svg className="s__mask__svg js-mask-svg">
                <path className="s__mask__path-outer js-mask-path-outer" d="" />
                <path className="s__mask__path-inner js-mask-path-inner" d="" />
                <path className="s__mask__path-lines js-mask-path-lines" d="" />
              </svg>
            </div>
          </div>

          <div className="s__ruler js-ruler"></div>
        </div>
      </div>

      <div className="s__viewall js-viewall">
        <Link to="/projects">View All Projects</Link>
      </div>

      {(status.startsWith('error') || status === 'mounting') && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            background: status.startsWith('error')
              ? 'rgba(255,0,0,0.9)'
              : 'rgba(0,0,0,0.8)',
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: 12,
            padding: 12,
            maxWidth: '80vw',
            maxHeight: 200,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'mounting' ? 'WORK INIT...' : `WORK INIT ERROR:\n${err}`}
        </div>
      )}

      {status.startsWith('ok') && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: 12,
            padding: 8,
            maxWidth: '90vw',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status}
        </div>
      )}
    </section>
  )
}
