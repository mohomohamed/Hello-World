const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');
const gate = document.getElementById('gate');
const run = document.getElementById('run');

const binA = document.getElementById('binA');
const binB = document.getElementById('binB');
const binR = document.getElementById('binR');
const decR = document.getElementById('decR');
const gateNode = document.getElementById('gateNode');
const visual = document.querySelector('.visual');

const to8Bit = (n) => (n & 0xff).toString(2).padStart(8, '0');

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

function render() {
  const a = Math.max(0, Math.min(255, Number(inputA.value) || 0));
  const b = Math.max(0, Math.min(255, Number(inputB.value) || 0));
  inputA.value = a;
  inputB.value = b;

  const op = gate.value;
  const result = applyGate(a, b, op);

  gateNode.textContent = op;
  binA.textContent = to8Bit(a);
  binB.textContent = to8Bit(b);
  binR.textContent = to8Bit(result);
  decR.textContent = String(result);
}

function animateAndRender() {
  visual.classList.remove('animate');
  void visual.offsetWidth;
  visual.classList.add('animate');
  render();
}

[inputA, inputB, gate].forEach(el => el.addEventListener('input', render));
run.addEventListener('click', animateAndRender);
render();
