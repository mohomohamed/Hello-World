const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');
const gate = document.getElementById('gate');
const run = document.getElementById('run');

const binA = document.getElementById('binA');
const binB = document.getElementById('binB');
const binR = document.getElementById('binR');
const decR = document.getElementById('decR');
const gateNode = document.getElementById('gateNode');
const visual = document.getElementById('visual');
const stageLabel = document.getElementById('stageLabel');
const bitRows = document.getElementById('bitRows');

const to8Bit = (n) => (n & 0xff).toString(2).padStart(8, '0');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function applyGate(a, b, op) {
  switch (op) {
    case 'AND': return a & b;
    case 'OR': return a | b;
    case 'XOR': return a ^ b;
    case 'NAND': return ~(a & b) & 0xff;
    case 'NOR': return ~(a | b) & 0xff;
    case 'XNOR': return ~(a ^ b) & 0xff;
    default: return a ^ b;
  }
}

function clampInput(value) {
  return Math.max(0, Math.min(255, Number(value) || 0));
}

function renderBitTable(aBits, bBits, outBits, op) {
  bitRows.innerHTML = '';
  for (let i = 0; i < 8; i += 1) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${7 - i}</td><td>${aBits[i]}</td><td>${bBits[i]}</td><td>${op}</td><td>${outBits[i]}</td>`;
    bitRows.appendChild(tr);
  }
}

function render() {
  const a = clampInput(inputA.value);
  const b = clampInput(inputB.value);
  inputA.value = a;
  inputB.value = b;

  const op = gate.value;
  const result = applyGate(a, b, op);
  const aBits = to8Bit(a);
  const bBits = to8Bit(b);
  const rBits = to8Bit(result);

  gateNode.textContent = op;
  binA.textContent = aBits;
  binB.textContent = bBits;
  binR.textContent = rBits;
  decR.textContent = String(result);
  renderBitTable(aBits, bBits, rBits, op);
}

async function animateAndRender() {
  run.disabled = true;
  visual.classList.remove('animate-convert', 'animate-gate', 'animate-output');
  render();

  stageLabel.textContent = 'Stage: Convert decimal → binary';
  visual.classList.add('animate-convert');
  await delay(700);

  stageLabel.textContent = 'Stage: Process through gate';
  visual.classList.remove('animate-convert');
  void visual.offsetWidth;
  visual.classList.add('animate-gate');
  await delay(850);

  stageLabel.textContent = 'Stage: Convert binary → decimal result';
  visual.classList.remove('animate-gate');
  void visual.offsetWidth;
  visual.classList.add('animate-output');
  await delay(650);

  stageLabel.textContent = 'Stage: Done';
  run.disabled = false;
}

[inputA, inputB, gate].forEach((el) => el.addEventListener('input', render));
run.addEventListener('click', animateAndRender);
render();
