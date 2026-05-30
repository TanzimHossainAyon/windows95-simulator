// Windows 95 Simulator
// Author: Tanzim Hossain Ayon | BRAC University | IEEE Researcher

// ===== BOOT SEQUENCE =====
let bootProgress = 0;
const bootMessages = ['Starting Windows 95...','Loading system files...','Initializing drivers...','Loading user profile...','Welcome, Tanzim!'];
let msgIdx = 0;

function boot() {
  const fill = document.getElementById('boot-fill');
  const msg = document.getElementById('boot-msg');
  const interval = setInterval(() => {
    bootProgress += 2;
    fill.style.width = bootProgress + '%';
    if (bootProgress % 20 === 0 && msgIdx < bootMessages.length) {
      msg.textContent = bootMessages[msgIdx++];
    }
    if (bootProgress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        document.getElementById('boot-screen').style.display = 'none';
        document.getElementById('desktop').classList.remove('hidden');
        initWallpaper();
        startClock();
        setTimeout(() => openWindow('about'), 500);
      }, 600);
    }
  }, 40);
}
boot();

// ===== WALLPAPER CANVAS =====
function initWallpaper() {
  const canvas = document.getElementById('wallpaper');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Teal gradient background
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#007070'); grad.addColorStop(1, '#005050');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Grid pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
  for (let y = 0; y < canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
}
window.addEventListener('resize', initWallpaper);

// ===== CLOCK =====
function startClock() {
  function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent =
      now.toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit'});
  }
  updateClock();
  setInterval(updateClock, 1000);
}

// ===== WINDOW SYSTEM =====
let zCounter = 100;
let openWindows = {};

const windowConfigs = {
  mycomputer: {
    title: 'My Computer', icon: '🖥️', w: 400, h: 320,
    menu: ['File','Edit','View','Help'],
    content: () => `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:8px;">
        ${[['💾','3½ Floppy (A:)'],['💿','(C:) Local Disk'],['📀','(D:) CD-ROM'],['🖨️','Printers'],['🔧','Control Panel'],['📡','Network']].map(([i,n])=>`
        <div class="file-item" style="flex-direction:column;text-align:center;padding:8px;">
          <span style="font-size:2rem;">${i}</span>
          <span class="fi-name" style="font-size:0.78rem;">${n}</span>
        </div>`).join('')}
      </div>`,
    status: '6 object(s)'
  },
  about: {
    title: 'About Me — Tanzim Hossain Ayon', icon: '👤', w: 440, h: 380,
    menu: ['File','Edit','Help'],
    content: () => `
      <div class="w-section">
        <span class="w-label">👤 Personal Information</span>
        <div class="w-val">Name: Tanzim Hossain Ayon</div>
        <div class="w-val">University: BRAC University, Dhaka</div>
        <div class="w-val">Degree: B.Sc. in Computer Science & Engineering</div>
        <div class="w-val">Date of Birth: 24 December 2001</div>
        <div class="w-val">Nationality: Bangladeshi</div>
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">🎯 Career Objective</span>
        <div class="w-val">I am a CSE graduate with a solid foundation in machine learning, deep learning, and AI. Passionate about solving complex real-world problems through intelligent systems.</div>
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">🏆 Achievement</span>
        <div class="w-val">✅ IEEE-Published Researcher (STI 2025)</div>
        <div class="w-val">✅ Thesis: Deep Learning for Diabetic Retinopathy</div>
        <div class="w-val">✅ IELTS Overall Band: 6.0</div>
      </div>`,
    status: 'Tanzim Hossain Ayon — CSE Graduate'
  },
  skills: {
    title: 'My Skills — Properties', icon: '💻', w: 380, h: 400,
    menu: ['File','View'],
    content: () => `
      <div class="w-section">
        <span class="w-label">Programming Languages</span>
        ${[['Python',90],['C/C++',75],['Java',70],['SQL',65]].map(([n,v])=>`
        <div class="skill-bar-wrap">
          <div class="skill-name">${n}</div>
          <div class="skill-bar"><div class="skill-fill" style="width:${v}%"></div></div>
        </div>`).join('')}
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">AI & Deep Learning</span>
        ${[['PyTorch',85],['TensorFlow',80],['Keras',75],['Scikit-learn',70]].map(([n,v])=>`
        <div class="skill-bar-wrap">
          <div class="skill-name">${n}</div>
          <div class="skill-bar"><div class="skill-fill" style="width:${v}%"></div></div>
        </div>`).join('')}
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">Tools</span>
        ${[['Git & GitHub',80],['Jupyter Notebook',85],['Google Colab',90],['Linux',65]].map(([n,v])=>`
        <div class="skill-bar-wrap">
          <div class="skill-name">${n}</div>
          <div class="skill-bar"><div class="skill-fill" style="width:${v}%"></div></div>
        </div>`).join('')}
      </div>`,
    status: 'Skills loaded'
  },
  notepad: {
    title: 'Notepad — Untitled', icon: '📝', w: 420, h: 340,
    menu: ['File','Edit','Format','Help'],
    content: () => `<textarea class="notepad-area" placeholder="Type something here...
    
Tips:
- Double-click desktop icons to open windows
- Drag windows by their title bars
- Click X to close, _ to minimize
- Try the Start menu!"></textarea>`,
    status: 'Ln 1, Col 1'
  },
  research: {
    title: 'Research — IEEE Publication', icon: '🔬', w: 460, h: 400,
    menu: ['File','Edit','Help'],
    content: () => `
      <div class="w-section">
        <span class="w-label">📄 Publication Title</span>
        <div class="w-val" style="color:#000080;font-weight:bold;">An Efficient Deep Learning Framework for Diabetic Retinopathy Classification using Generative Data Augmentation and Knowledge Distillation</div>
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">📋 Details</span>
        <div class="w-val">Conference: IEEE STI 2025</div>
        <div class="w-val">Date: 11-12 December 2025, Dhaka</div>
        <div class="w-val">Publisher: IEEE</div>
        <div class="w-val">DOI: 10.1109/STI69347.2025.11367503</div>
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">📊 Key Results</span>
        ${[['Accuracy','95.8%'],['QWK Score','0.975'],['GAN FID Score','23.4'],['Parameter Reduction','96.8%'],['Model Size','14 MB']].map(([k,v])=>`
        <div style="display:flex;justify-content:space-between;border-bottom:1px dotted #ccc;padding:2px 0;">
          <span class="w-val">${k}</span><span class="w-val" style="color:#000080;font-weight:bold;">${v}</span>
        </div>`).join('')}
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">🔗 Links</span>
        <div><button class="link-btn" onclick="window.open('https://ieeexplore.ieee.org/abstract/document/11367503','_blank')">🌐 View on IEEE Xplore</button></div>
        <div><button class="link-btn" onclick="window.open('https://tanzimhossainayon.vercel.app','_blank')">🌐 Portfolio Website</button></div>
      </div>`,
    status: 'IEEE Published — 2025'
  },
  contact: {
    title: 'Contact Information', icon: '📧', w: 360, h: 320,
    menu: ['File','Help'],
    content: () => `
      <div class="w-section">
        <span class="w-label">📧 Email</span>
        <div class="w-val">tanzimhossainayon90@gmail.com</div>
        <div class="w-val">tanzim.hossain.ayon@g.bracu.ac.bd</div>
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">🌐 Online Profiles</span>
        <div><button class="link-btn" onclick="window.open('https://tanzimhossainayon.vercel.app','_blank')">🌐 Portfolio Website</button></div>
        <div><button class="link-btn" onclick="window.open('https://www.linkedin.com/in/tanzim-hossain-ayon-a69431410','_blank')">💼 LinkedIn</button></div>
        <div><button class="link-btn" onclick="window.open('https://orcid.org/0009-0001-0920-7150','_blank')">🔬 ORCID</button></div>
        <div><button class="link-btn" onclick="window.open('https://scholar.google.com/citations?user=noSFVIwAAAAJ','_blank')">🎓 Google Scholar</button></div>
        <div><button class="link-btn" onclick="window.open('https://github.com/TanzimHossainAyon','_blank')">🐙 GitHub</button></div>
      </div>
      <hr class="w-divider">
      <div class="w-section">
        <span class="w-label">📍 Location</span>
        <div class="w-val">South Banasree, Dhaka, Bangladesh</div>
      </div>`,
    status: 'Ready'
  },
  recycle: {
    title: 'Recycle Bin', icon: '🗑️', w: 300, h: 220,
    menu: ['File','Edit','View'],
    content: () => `<div class="recycle-empty">🗑️<br><br>Recycle Bin is empty.<br><br>Delete files to move them here.</div>`,
    status: '0 object(s)'
  },
  ie: {
    title: 'Internet Explorer — Tanzim\'s Portfolio', icon: '🌐', w: 500, h: 400,
    menu: ['File','Edit','View','Favorites','Help'],
    hasAddress: true,
    content: () => `
      <div class="ie-content">
        <h1>🌐 Welcome to Tanzim's World Wide Web Page!</h1>
        <p><b>Name:</b> Tanzim Hossain Ayon</p>
        <p><b>Location:</b> Dhaka, Bangladesh</p>
        <p><b>University:</b> BRAC University</p>
        <hr>
        <p><b>🔬 Research Interest:</b> Deep Learning, Generative AI, Knowledge Distillation</p>
        <p><b>📄 Publication:</b> IEEE STI 2025</p>
        <hr>
        <p>🌐 Visit my website: <a href="https://tanzimhossainayon.vercel.app" target="_blank">tanzimhossainayon.vercel.app</a></p>
        <p>Best viewed in Internet Explorer 4.0 at 800x600 resolution</p>
        <hr>
        <p style="color:#808080;font-size:0.75rem;">© 1995 Tanzim Hossain Ayon. All rights reserved.</p>
      </div>`,
    status: 'Done'
  }
};

function openWindow(id) {
  if (openWindows[id]) {
    bringToFront(id);
    return;
  }
  const config = windowConfigs[id];
  if (!config) return;

  const win = document.createElement('div');
  win.className = 'win95-window active';
  win.id = 'win-' + id;
  win.style.width = config.w + 'px';
  win.style.left = (100 + Math.random() * 200) + 'px';
  win.style.top = (60 + Math.random() * 120) + 'px';
  win.style.zIndex = ++zCounter;

  // Address bar for IE
  const addressBar = config.hasAddress ? `
    <div class="ie-address">
      <span class="ie-address-label">Address:</span>
      <input class="ie-address-bar" value="http://www.tanzimhossainayon.vercel.app" readonly>
      <button class="btn95" style="padding:1px 8px;font-size:0.85rem;">Go</button>
    </div>` : '';

  win.innerHTML = `
    <div class="win-titlebar" onmousedown="startDrag(event,'${id}')">
      <span class="win-title-icon">${config.icon}</span>
      <span class="win-title-text">${config.title}</span>
      <div class="win-controls">
        <button class="win-ctrl-btn" onclick="minimizeWindow('${id}')" title="Minimize">_</button>
        <button class="win-ctrl-btn" onclick="maximizeWindow('${id}')" title="Maximize">□</button>
        <button class="win-ctrl-btn" style="font-weight:bold;" onclick="closeWindow('${id}')" title="Close">✕</button>
      </div>
    </div>
    <div class="win-menubar">
      ${config.menu.map(m=>`<span class="win-menu-item">${m}</span>`).join('')}
    </div>
    ${addressBar}
    <div class="win-content" id="content-${id}" style="height:${config.h - (config.hasAddress?110:90)}px;">
      ${config.content()}
    </div>
    <div class="win-statusbar">${config.status || 'Ready'}</div>`;

  document.getElementById('windows-container').appendChild(win);
  openWindows[id] = {minimized: false, config};

  // Taskbar button
  const tbBtn = document.createElement('button');
  tbBtn.className = 'taskbar-btn active-task';
  tbBtn.id = 'tb-' + id;
  tbBtn.innerHTML = `${config.icon} ${config.title.split('—')[0].trim()}`;
  tbBtn.onclick = () => {
    if (openWindows[id]?.minimized) restoreWindow(id);
    else bringToFront(id);
  };
  document.getElementById('taskbar-items').appendChild(tbBtn);

  win.addEventListener('mousedown', () => bringToFront(id));
}

function closeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win) win.remove();
  const tb = document.getElementById('tb-' + id);
  if (tb) tb.remove();
  delete openWindows[id];
}

function minimizeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win) win.style.display = 'none';
  if (openWindows[id]) openWindows[id].minimized = true;
  const tb = document.getElementById('tb-' + id);
  if (tb) tb.classList.remove('active-task');
}

function restoreWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win) win.style.display = 'block';
  if (openWindows[id]) openWindows[id].minimized = false;
  bringToFront(id);
}

let maximized = {};
function maximizeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;
  if (maximized[id]) {
    Object.assign(win.style, maximized[id]);
    delete maximized[id];
  } else {
    maximized[id] = {width:win.style.width,height:win.style.height,left:win.style.left,top:win.style.top};
    Object.assign(win.style, {width:'100%',height:'calc(100% - 32px)',left:'0',top:'0'});
  }
}

function bringToFront(id) {
  document.querySelectorAll('.win95-window').forEach(w => w.classList.remove('active'));
  document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active-task'));
  const win = document.getElementById('win-' + id);
  const tb = document.getElementById('tb-' + id);
  if (win) { win.classList.add('active'); win.style.zIndex = ++zCounter; }
  if (tb) tb.classList.add('active-task');
}

// ===== DRAG =====
let dragging = null, dragOffX = 0, dragOffY = 0;
function startDrag(e, id) {
  dragging = id;
  const win = document.getElementById('win-' + id);
  const rect = win.getBoundingClientRect();
  dragOffX = e.clientX - rect.left;
  dragOffY = e.clientY - rect.top;
  bringToFront(id);
  e.preventDefault();
}
document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const win = document.getElementById('win-' + dragging);
  if (!win) return;
  win.style.left = (e.clientX - dragOffX) + 'px';
  win.style.top = Math.max(0, e.clientY - dragOffY) + 'px';
});
document.addEventListener('mouseup', () => dragging = null);

// ===== START MENU =====
function toggleStart() {
  document.getElementById('start-menu').classList.toggle('hidden');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.start-menu') && !e.target.closest('.start-btn')) {
    document.getElementById('start-menu').classList.add('hidden');
  }
});

// ===== SHUTDOWN =====
function shutdown() {
  document.getElementById('start-menu').classList.add('hidden');
  document.getElementById('desktop').style.opacity = '0';
  document.getElementById('desktop').style.transition = 'opacity 1s';
  setTimeout(() => {
    document.getElementById('desktop').classList.add('hidden');
    document.getElementById('shutdown-screen').classList.remove('hidden');
  }, 1000);
}

// ===== DESKTOP ICON SELECTION =====
document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    document.querySelectorAll('.icon').forEach(i => i.classList.remove('selected'));
    icon.classList.add('selected');
  });
});
document.getElementById('desktop').addEventListener('click', e => {
  if (!e.target.closest('.icon')) {
    document.querySelectorAll('.icon').forEach(i => i.classList.remove('selected'));
  }
});

// ===== KEYBOARD SHORTCUT =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('start-menu').classList.add('hidden');
  }
});

// Save/Load window positions via LocalStorage
window.addEventListener('beforeunload', () => {
  const positions = {};
  Object.keys(openWindows).forEach(id => {
    const win = document.getElementById('win-' + id);
    if (win) positions[id] = {left: win.style.left, top: win.style.top};
  });
  localStorage.setItem('win95_positions', JSON.stringify(positions));
});
