// app.js
// PWA Backgammon minimal: déplacement libre + lancer de dés

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('currentPlayer');
const msgEl = document.getElementById('message');
const rollBtn = document.getElementById('rollBtn');
const die1El = document.getElementById('die1');
const die2El = document.getElementById('die2');
const resetBtn = document.getElementById('resetBtn');
const switchBtn = document.getElementById('switchBtn');
const installBtn = document.getElementById('installBtn');

const PLAYERS = { W: 'Blanc', B: 'Noir' };

let state = {
  points: Array.from({ length: 24 }, () => ({ owner: null, count: 0 })),
  current: 'W',
  selected: null // { index, owner }
};

function showMessage(text, type='') {
  msgEl.textContent = text || '';
  msgEl.className = 'message' + (type ? ' ' + type : '');
  if (text) setTimeout(() => { msgEl.textContent = ''; msgEl.className = 'message'; }, 3000);
}

function initPositions() {
  state.points = Array.from({ length: 24 }, () => ({ owner: null, count: 0 }));

  // Mapping indices:
  // 0..11 = bas (points 1..12), 12..23 = haut (points 13..24), gauche → droite.
  // Noir: 2@1, 5@12, 3@17, 5@19
  setPoint(0, 'B', 2);
  setPoint(11, 'B', 5);
  setPoint(12 + (17 - 13), 'B', 3); // index 16
  setPoint(12 + (19 - 13), 'B', 5); // index 18

  // Blanc: 2@24, 5@13, 3@8, 5@6
  setPoint(12 + (24 - 13), 'W', 2); // index 23
  setPoint(12 + (13 - 13), 'W', 5); // index 12
  setPoint((8 - 1), 'W', 3);        // index 7
  setPoint((6 - 1), 'W', 5);        // index 5
}

function setPoint(index, owner, count) {
  state.points[index].owner = owner;
  state.points[index].count = count;
}

function buildBoard() {
  boardEl.innerHTML = '';
  const topRow = document.createElement('div');
  topRow.className = 'row top';
  const bottomRow = document.createElement('div');
  bottomRow.className = 'row bottom';

  // Top: indices 12..23
  for (let i = 12; i < 24; i++) topRow.appendChild(createPointEl(i, true));
  // Bottom: indices 0..11
  for (let i = 0; i < 12; i++) bottomRow.appendChild(createPointEl(i, false));

  boardEl.append(topRow, bottomRow);
}

function createPointEl(index, top) {
  const p = document.createElement('div');
  p.className = 'point' + (top ? ' top' : '');
  p.dataset.index = index;

  const idxLabel = document.createElement('div');
  idxLabel.className = 'point-index';
  const displayNum = top ? (13 + (index - 12)) : (1 + index);
  idxLabel.textContent = displayNum;
  p.appendChild(idxLabel);

  const count = document.createElement('div');
  count.className = 'count';
  count.textContent = '';
  p.appendChild(count);

  const stack = document.createElement('div');
  stack.className = 'stack';
  p.appendChild(stack);

  p.addEventListener('click', onPointClick);
  p.addEventListener('dragover', (e) => e.preventDefault());
  p.addEventListener('drop', (e) => {
    e.preventDefault();
    const from = +e.dataTransfer.getData('text/plain');
    moveChecker(from, index);
  });

  return p;
}

function render() {
  // Update stacks
  const pointEls = boardEl.querySelectorAll('.point');
  pointEls.forEach(p => {
    const i = +p.dataset.index;
    const stack = p.querySelector('.stack');
    const count = p.querySelector('.count');
    stack.innerHTML = '';
    const { owner, count: n } = state.points[i];
    count.textContent = n ? n : '';

    if (!n) return;
    for (let k = 0; k < n; k++) {
      const c = document.createElement('div');
      c.className = `checker ${owner}`;
      c.draggable = true;
      c.dataset.index = i;
      c.title = `${PLAYERS[owner]} — point ${p.querySelector('.point-index').textContent}`;

      c.addEventListener('click', onCheckerClick);
      c.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', i.toString());
        setSelected({ index: i, owner });
      });

      stack.appendChild(c);
    }
  });

  // Re-highlight selection if still valid
  highlightSelection();
  statusEl.textContent = PLAYERS[state.current];
}

function onCheckerClick(e) {
  const idx = +e.currentTarget.dataset.index;
  const { owner } = state.points[idx];
  // Option: limiter au joueur courant
  if (owner !== state.current) {
    setSelected(null);
    showMessage("Sélection limitée au joueur courant.", 'warn');
    return;
  }
  if (state.selected && state.selected.index === idx) {
    setSelected(null);
  } else {
    setSelected({ index: idx, owner });
  }
}

function onPointClick(e) {
  const targetIndex = +e.currentTarget.dataset.index;
  if (!state.selected) return;
  moveChecker(state.selected.index, targetIndex);
}

function setSelected(sel) {
  state.selected = sel;
  highlightSelection();
}

function highlightSelection() {
  document.querySelectorAll('.checker').forEach(el => el.classList.remove('selected'));
  if (!state.selected) return;
  // Highlight top checker only on that point
  const point = state.selected.index;
  const stack = [...boardEl.querySelectorAll(`.point[data-index="${point}"] .checker`)];
  if (stack.length) stack[stack.length - 1].classList.add('selected');
}

function moveChecker(from, to) {
  if (from === to) return;
  const src = state.points[from];
  const dst = state.points[to];
  if (!src.count) return;

  // Règle minimale: pas de mélange d'owner sur une case
  if (dst.owner && dst.owner !== src.owner) {
    showMessage("Destination occupée par l’adversaire (déplacement non autorisé dans cette version).", 'warn');
    return;
  }

  // Décrément source
  src.count -= 1;
  if (src.count === 0) src.owner = null;

  // Incrément destination
  if (!dst.owner) dst.owner = src.owner || state.selected?.owner || 'W';
  dst.count += 1;

  setSelected(null);
  render();
}

function rollDice() {
  animateDice(true);
  setTimeout(() => {
    const d1 = 1 + Math.floor(Math.random() * 6);
    const d2 = 1 + Math.floor(Math.random() * 6);
    die1El.textContent = d1;
    die2El.textContent = d2;
    animateDice(false);
  }, 450);
}
function animateDice(active) {
  die1El.classList.toggle('rolling', active);
  die2El.classList.toggle('rolling', active);
}

function switchPlayer() {
  state.current = state.current === 'W' ? 'B' : 'W';
  setSelected(null);
  render();
}

function resetGame() {
  setSelected(null);
  initPositions();
  render();
  die1El.textContent = '-';
  die2El.textContent = '-';
  showMessage("Plateau réinitialisé.");
}

// Build UI
initPositions();
buildBoard();
render();

// Controls
rollBtn.addEventListener('click', rollDice);
resetBtn.addEventListener('click', resetGame);
switchBtn.addEventListener('click', switchPlayer);

// Install prompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}

