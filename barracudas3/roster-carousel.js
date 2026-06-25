/* ============================================================
   ROSTER CAROUSEL — GSAP seamless infinite loop
   buildSeamlessLoop + Draggable (drag to scrub) + ScrollTrigger
   (scroll velocity nudges the loop) + a slow idle auto-drift.

   Cards are built from PLAYER_REGISTRY (real roster data already
   populated by the IIFE at the top of app.js from #roster-data),
   not hardcoded images.
============================================================ */

// ── Classic GSAP "seamless loop" recipe ─────────────────────
// items: array of DOM elements: spacing: time (s) between each
// item's animation start; animateFunc: (item) => gsap.timeline
function buildSeamlessLoop(items, spacing, animateFunc) {
  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      // eslint-disable-next-line no-underscore-dangle
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    },
  });
  const cycleDuration = spacing * items.length;
  let dur;

  items.concat(items).concat(items).forEach((item, i) => {
    const anim = animateFunc(items[i % items.length]);
    rawSequence.add(anim, i * spacing);
    if (!dur) dur = anim.duration();
  });

  seamlessLoop
    .fromTo(rawSequence, { time: cycleDuration + dur / 2 }, {
      time: `+=${cycleDuration}`, duration: cycleDuration, ease: 'none',
    }, 0)
    .fromTo(rawSequence, { time: dur / 2 }, {
      time: cycleDuration + dur / 2, duration: cycleDuration, ease: 'none',
    }, '<');

  return seamlessLoop.totalDuration(cycleDuration);
}

function initRosterCarousel() {
  const list = document.getElementById('rosterCarouselCards');
  const section = document.getElementById('rosterCarouselSection');
  if (!list || !section) return;
  if (typeof gsap === 'undefined') return;
  if (typeof PLAYER_REGISTRY === 'undefined' || !PLAYER_REGISTRY.size) return;

  gsap.registerPlugin(ScrollTrigger, Draggable);

  // ── Connect real roster data: build <li> cards from PLAYER_REGISTRY ──
  const players = Array.from(PLAYER_REGISTRY.values());
  list.innerHTML = players.map((p) => `
    <li class="rc-card" data-num="${p.num}">
      <div class="rc-card-img" style="background-image:url('${p.img}')"></div>
      <div class="rc-card-overlay">
        <span class="rc-card-name">#${p.num} ${p.first} ${p.last}</span>
        <span class="rc-card-pos">${p.pos}</span>
      </div>
    </li>
  `).join('');

  const cards = gsap.utils.toArray(list.children);
  if (cards.length < 2) return;

  const spacing = 0.13; // seconds between each card's animation start in the sequence

  gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

  function animateFn(card) {
    const tl = gsap.timeline();
    tl.fromTo(card, { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1,
      ease: 'power1.in', immediateRender: false,
    }).fromTo(card, { xPercent: 400 }, {
      xPercent: -400, duration: 1, ease: 'none', immediateRender: false,
    }, 0);
    return tl;
  }

  const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFn);

  // ── Draggable scrubber — drag the list to scrub through the loop ──
  const playhead = { offset: 0 };
  const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

  const scrub = gsap.to(playhead, {
    offset: 0,
    onUpdate() { seamlessLoop.time(wrapTime(playhead.offset)); },
    paused: true,
    duration: 0.5,
    ease: 'power3',
  });

  function scrubTo(totalTime) {
    scrub.vars.offset = totalTime;
    scrub.invalidate().restart();
  }

  Draggable.create(list, {
    type: 'x',
    trigger: list,
    onPress() { this.startOffset = playhead.offset; gsap.killTweensOf(playhead); },
    onDrag() {
      const delta = (this.startX - this.x) * 0.01;
      playhead.offset = this.startOffset + delta;
      seamlessLoop.time(wrapTime(playhead.offset));
    },
    onDragEnd() { scrubTo(playhead.offset); },
  });

  // ── ScrollTrigger — scroll velocity nudges the loop as the section passes ──
  ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate(self) {
      scrubTo(playhead.offset + self.getVelocity() / -300);
    },
  });

  // ── Idle auto-drift so the carousel feels alive even without interaction ──
  const idleDrift = gsap.to(playhead, {
    offset: `+=${seamlessLoop.duration()}`,
    duration: seamlessLoop.duration() * 10,
    repeat: -1,
    ease: 'none',
    onUpdate() { seamlessLoop.time(wrapTime(playhead.offset)); },
  });

  // Pause idle drift while the user is dragging or right after, resume later
  list.addEventListener('pointerdown', () => idleDrift.pause());
  list.addEventListener('pointerup', () => idleDrift.resume());

  // ── Tap a card → open the existing player modal ──
  list.querySelectorAll('[data-num]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const reg = PLAYER_REGISTRY.get(card.dataset.num);
      if (reg && typeof openPlayerModal === 'function') openPlayerModal(reg);
    });
  });
}

document.addEventListener('DOMContentLoaded', initRosterCarousel);
