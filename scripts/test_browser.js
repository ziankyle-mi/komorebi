const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function cdpRequest(path) {
  return new Promise(resolve => {
    http.get({ host: 'localhost', port: 9222, path }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
  });
}

async function main() {
  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--user-data-dir=C:/Users/ziank/AppData/Local/Temp/chrome_test_fresh99',
    'about:blank'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  const targets = await cdpRequest('/json');
  const pageTarget = targets.find(t => t.type === 'page');
  console.log('[*] Page target found:', pageTarget?.url);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let msgId = 1;

  const pending = {};
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending[msg.id]) {
      const cb = pending[msg.id];
      delete pending[msg.id];
      cb(msg);
    }
  };

  const send = (method, params = {}) => new Promise((resolve) => {
    const id = msgId++;
    pending[id] = resolve;
    ws.send(JSON.stringify({ id, method, params }));
  });

  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: false });
    return r?.result?.result?.value;
  };

  await new Promise(r => ws.onopen = r);
  await send('Runtime.enable');
  await send('Page.enable');

  // Navigate to app
  await send('Page.navigate', { url: 'http://localhost:8080' });
  await new Promise(r => setTimeout(r, 2500));

  const title = await evaluate('document.title');
  console.log('[*] Page title:', title);

  const hasLoginBtn = await evaluate('Boolean(document.querySelector("button[type=submit]"))');
  console.log('[*] Login button exists:', hasLoginBtn);

  if (!hasLoginBtn) {
    const html = await evaluate('document.body.innerHTML.slice(0, 500)');
    console.log('[*] Body snippet:', html);
    edgeProc.kill();
    process.exit(1);
  }

  // Login as Mikkie
  await evaluate(`
    const ni = document.querySelector('input[type=text]');
    const pi = document.querySelector('input[type=password]');
    const s = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    s.call(ni, 'Mikkie'); ni.dispatchEvent(new Event('input', {bubbles:true}));
    s.call(pi, '123456'); pi.dispatchEvent(new Event('input', {bubbles:true}));
    document.querySelector('button[type=submit]').click();
    'done'
  `);
  await new Promise(r => setTimeout(r, 2000));

  const navBtns = await evaluate('document.querySelectorAll(".bottom-nav-bar button").length');
  console.log('[*] Nav buttons visible:', navBtns);

  // Click Cycle tab
  await evaluate(`document.querySelectorAll('.bottom-nav-bar button')[1].click(); 'done'`);
  await new Promise(r => setTimeout(r, 1000));

  const gridExists = await evaluate('Boolean(document.querySelector(".flo-month-grid"))');
  const logBtnExists = await evaluate('Boolean(document.querySelector(".flo-edit-period-btn"))');
  console.log('[*] Cycle grid loaded:', gridExists);
  console.log('[*] Log Symptoms button exists:', logBtnExists);

  if (logBtnExists) {
    // Click Log Symptoms button
    await evaluate(`document.querySelector('.flo-edit-period-btn').click(); 'done'`);
    await new Promise(r => setTimeout(r, 1500));

    const sheetOpen = await evaluate('Boolean(document.querySelector(".flo-log-sheet-surface"))');
    const flowPills = await evaluate('document.querySelectorAll(".flo-flow-pill").length');
    const chips = await evaluate('document.querySelectorAll(".flo-chip-btn").length');
    console.log('[✓] CycleLogSheet opened:', sheetOpen);
    console.log('[✓] Flow pills:', flowPills, '| Feeling chips:', chips);
  }

  edgeProc.kill();
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
