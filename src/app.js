/* MicroLab Academy — UI/UX Prototype 1.0
   Client-side prototype only. Guided LED timing is functional; Free Lab is a basic
   interaction model and is not an electrical solver or a C++ compiler. */
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const app = document.getElementById('app');
  const icons = {
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8M8 10h8"/>',
    cpu:'<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4"/><path d="M10 10h4v4h-4z"/>',
    play:'<path d="m8 5 11 7-11 7z"/>',
    folder:'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    chart:'<path d="M4 19V5m0 14h17"/><path d="m7 15 4-4 3 2 6-7"/>',
    puzzle:'<path d="M8 3h3a2 2 0 1 1 4 0h3a2 2 0 0 1 2 2v3a2 2 0 1 0 0 4v3a2 2 0 0 1-2 2h-3a2 2 0 1 0-4 0H8a2 2 0 0 1-2-2v-3a2 2 0 1 0 0-4V5a2 2 0 0 1 2-2z"/>',
    search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    zap:'<path d="m13 2-3 8h7l-6 12 1-9H6z"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm10 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    plus:'<path d="M12 5v14m-7-7h14"/>',
    save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    rotate:'<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/>',
    stop:'<rect x="5" y="5" width="14" height="14" rx="2"/>',
    trash:'<path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/>',
    code:'<path d="m8 8-5 4 5 4m8-8 5 4-5 4m-3-11-2 14"/>',
    external:'<path d="M14 3h7v7m0-7-9 9"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    x:'<path d="m18 6-12 12M6 6l12 12"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  };
  const ico = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;

  const dictionaries = {
    th: {
      navOverview:'ภาพรวม', navLearn:'เรียนรู้', navHome:'หน้าหลัก', navCourses:'หลักสูตร', navLessons:'บทเรียน', navLab:'ห้องทดลองจำลอง', navBuild:'สร้างผลงาน', navProjects:'โปรเจกต์ของฉัน', navComponents:'คลังอุปกรณ์', navAccount:'บัญชีผู้ใช้', navProgress:'ความก้าวหน้า', navSettings:'ตั้งค่า',
      search:'ค้นหาบทเรียน อุปกรณ์ หรือโปรเจกต์', preview:'ต้นแบบรุ่น 1.0', home:'หน้าหลัก', welcome:'เรียนรู้ ทดลอง และสร้างสรรค์', heroTitle:'เปลี่ยนความรู้ทางวิศวกรรม\nให้เป็นประสบการณ์ลงมือทำ', heroDesc:'พื้นที่เรียนรู้ Electronics, Microcontroller, PLC, IoT และ SCADA พร้อมห้องทดลองจำลองที่ออกแบบเพื่อการเรียนการสอนวิศวกรรม', explore:'สำรวจหลักสูตร', openLab:'เปิดห้องทดลอง', domains:'หมวดวิศวกรรม', starterLessons:'บทเรียนเริ่มต้น', simModes:'โหมดจำลอง', savedProjects:'โปรเจกต์ที่บันทึก', continue:'เรียนรู้ต่อ', viewAll:'ดูทั้งหมด', recommended:'เส้นทางการเรียนรู้', recentActivity:'กิจกรรมล่าสุด', beginner:'พื้นฐาน', intermediate:'ระดับกลาง', advanced:'ขั้นสูง', lessons:'บทเรียน', start:'เริ่มเรียน', viewCourse:'ดูหลักสูตร',
      coursesTitle:'สำรวจหลักสูตร', coursesDesc:'เลือกเส้นทางการเรียนรู้ตามหัวข้อและระดับความรู้', courseOverview:'ภาพรวมหลักสูตร', lessonsOutline:'โครงสร้างบทเรียน', availableNow:'พร้อมใช้งาน', planned:'กำลังพัฒนา', openLesson:'เปิดบทเรียน', courseOutlineNote:'บทเรียนที่ระบุว่ากำลังพัฒนาเป็นโครงร่างสำหรับการเพิ่มเนื้อหาในระยะถัดไป', all:'ทั้งหมด', electronics:'อิเล็กทรอนิกส์', micro:'ไมโครคอนโทรลเลอร์', plc:'PLC และระบบอัตโนมัติ', iot:'Internet of Things', scada:'HMI และ SCADA',
      lessonTitle:'บทเรียน', objectives:'วัตถุประสงค์การเรียนรู้', theory:'แนวคิดพื้นฐาน', circuit:'วงจรตัวอย่าง', procedure:'ขั้นตอนการทดลอง', tryLab:'ทดลองในห้อง Lab', markComplete:'ทำเครื่องหมายว่าเรียนจบ', nextLesson:'บทเรียนถัดไป', previous:'ก่อนหน้า',
      labTitle:'Interactive Lab', labDesc:'ทดลองแนวคิดและพฤติกรรมของอุปกรณ์ในสภาพแวดล้อมจำลอง', guided:'Guided Simulation', free:'Free Simulation', guidedTitle:'LED Blinking — ทดลองแบบมีขั้นตอน', freeTitle:'Free Workbench — สร้างวงจรของคุณ', workbench:'พื้นที่ทดลอง', visualBoard:'บอร์ดจำลอง · มุมมองภาพประกอบ', stopped:'หยุดอยู่', running:'กำลังจำลอง', run:'เริ่มจำลอง', stop:'หยุด', reset:'รีเซ็ต', guideSteps:'ขั้นตอนการทดลอง', code:'โปรแกรมตัวอย่าง', output:'ผลลัพธ์', serial:'Serial Monitor', step:'ขั้นตอน', nextStep:'ขั้นตอนถัดไป', add:'เพิ่มอุปกรณ์', addLed:'LED', addButton:'Push Button', addPot:'Potentiometer', addResistor:'Resistor', components:'อุปกรณ์ในวงจร', properties:'คุณสมบัติอุปกรณ์', selectPart:'เลือกอุปกรณ์บน Workbench เพื่อแก้ไขคุณสมบัติ', pin:'ขา GPIO', color:'สี LED', remove:'ลบอุปกรณ์', saveProject:'บันทึกโปรเจกต์', projectName:'ชื่อโปรเจกต์', save:'บันทึก', noParts:'ยังไม่มีอุปกรณ์', addFirst:'เพิ่มอุปกรณ์จากแถบเครื่องมือเพื่อเริ่มต้น',
      projectsTitle:'โปรเจกต์ของฉัน', projectsDesc:'โปรเจกต์ที่บันทึกไว้ในเบราว์เซอร์นี้', noProjects:'ยังไม่มีโปรเจกต์ที่บันทึก', noProjectsDesc:'สร้างวงจรใน Free Workbench แล้วกดบันทึกโปรเจกต์', open:'เปิด', delete:'ลบ', progressTitle:'ความก้าวหน้าการเรียน', progressDesc:'ติดตามบทเรียนและทักษะที่คุณกำลังพัฒนา', overall:'ภาพรวมการเรียน', completed:'บทเรียนที่เรียนจบ', inProgress:'กำลังเรียน', domainsProgress:'ความก้าวหน้าตามหมวด',
      componentsTitle:'คลังอุปกรณ์', componentsDesc:'สำรวจอุปกรณ์พื้นฐานที่ใช้ในบทเรียนและห้องทดลอง', board:'บอร์ดควบคุม', sensor:'เซนเซอร์', actuator:'อุปกรณ์ขับเคลื่อน', passive:'อุปกรณ์พาสซีฟ',
      status:'สถานะระบบ', localOnly:'ข้อมูลต้นแบบจัดเก็บในเบราว์เซอร์นี้', prototypeNotice:'Prototype: ระบบจำลองพื้นฐานสำหรับตรวจสอบ UX ไม่ใช่เครื่องมือ Compile หรือ SPICE', footer:'MicroLab Academy · Interactive Engineering Learning Platform', toastSaved:'บันทึกโปรเจกต์แล้ว', toastDeleted:'ลบโปรเจกต์แล้ว', toastComplete:'บันทึกความก้าวหน้าแล้ว', toastRun:'เริ่มการจำลองแล้ว', toastStop:'หยุดการจำลองแล้ว', toastReset:'รีเซ็ตสถานะแล้ว', toastStep:'ไปยังขั้นตอนถัดไปแล้ว', toastAdded:'เพิ่มอุปกรณ์แล้ว', toastRemoved:'ลบอุปกรณ์แล้ว', confirmDelete:'ต้องการลบโปรเจกต์นี้หรือไม่?',
      courseArduino:'พื้นฐาน Arduino', courseArduinoDesc:'เริ่มต้นเขียนโปรแกรมและควบคุมวงจรด้วย Arduino Uno', courseElectronics:'พื้นฐานอิเล็กทรอนิกส์', courseElectronicsDesc:'แรงดัน กระแส ความต้านทาน และการต่อวงจรพื้นฐาน', courseEsp:'ESP32 และ IoT', courseEspDesc:'GPIO, Wi-Fi, Sensor และการเชื่อมต่ออินเทอร์เน็ต', coursePLC:'PLC และ Industrial Automation', coursePLCDesc:'Digital I/O, Ladder Logic, Timer และ Counter', courseScada:'HMI, SCADA และ Data Visualization', courseScadaDesc:'การสื่อสาร PLC, Dashboard, Alarm และ Trend', courseMotor:'Motor & Motion Control', courseMotorDesc:'PWM, Servo, Stepper และการควบคุมมอเตอร์', ledLesson:'ควบคุม LED ด้วย Digital Output', ledDesc:'เรียนรู้การกำหนดขาเอาต์พุตและควบคุมสถานะ LED',
      recent1:'เปิดบทเรียน LED Control', recent2:'ทดลอง Guided Simulation', recent3:'สำรวจคลังอุปกรณ์', today:'วันนี้', minutes:'นาที',
    },
    en: {
      navOverview:'OVERVIEW', navLearn:'LEARN', navHome:'Home', navCourses:'Courses', navLessons:'Lessons', navLab:'Interactive Lab', navBuild:'BUILD', navProjects:'My Projects', navComponents:'Components', navAccount:'ACCOUNT', navProgress:'My Progress', navSettings:'Settings',
      search:'Search lessons, components or projects', preview:'PROTOTYPE 1.0', home:'Home', welcome:'Learn, experiment and create', heroTitle:'Turn engineering knowledge\ninto hands-on experience', heroDesc:'Explore Electronics, Microcontrollers, PLC, IoT and SCADA with interactive learning and simulation built for engineering education.', explore:'Explore courses', openLab:'Open laboratory', domains:'Engineering domains', starterLessons:'Starter lessons', simModes:'Simulation modes', savedProjects:'Saved projects', continue:'Continue learning', viewAll:'View all', recommended:'Learning pathways', recentActivity:'Recent activity', beginner:'Beginner', intermediate:'Intermediate', advanced:'Advanced', lessons:'lessons', start:'Start learning', viewCourse:'View course',
      coursesTitle:'Explore courses', coursesDesc:'Choose a learning pathway by topic and experience level', courseOverview:'Course overview', lessonsOutline:'Lesson outline', availableNow:'Available now', planned:'Planned', openLesson:'Open lesson', courseOutlineNote:'Lessons marked as planned are an outline for a future content release.', all:'All', electronics:'Electronics', micro:'Microcontrollers', plc:'PLC & Automation', iot:'Internet of Things', scada:'HMI & SCADA',
      lessonTitle:'Lesson', objectives:'Learning objectives', theory:'Core concepts', circuit:'Example circuit', procedure:'Lab procedure', tryLab:'Try in Interactive Lab', markComplete:'Mark as complete', nextLesson:'Next lesson', previous:'Previous',
      labTitle:'Interactive Lab', labDesc:'Explore device behavior in a guided or open-ended simulation environment', guided:'Guided Simulation', free:'Free Simulation', guidedTitle:'LED Blinking — Guided experiment', freeTitle:'Free Workbench — Build your circuit', workbench:'Workbench', visualBoard:'Simulated board · visual preview', stopped:'Stopped', running:'Running', run:'Run simulation', stop:'Stop', reset:'Reset', guideSteps:'Experiment steps', code:'Example code', output:'Output', serial:'Serial Monitor', step:'Step', nextStep:'Next step', add:'Add component', addLed:'LED', addButton:'Push Button', addPot:'Potentiometer', addResistor:'Resistor', components:'Circuit components', properties:'Component properties', selectPart:'Select a component on the Workbench to edit its properties', pin:'GPIO pin', color:'LED color', remove:'Remove component', saveProject:'Save project', projectName:'Project name', save:'Save', noParts:'No components yet', addFirst:'Use the toolbar to add components to your workbench',
      projectsTitle:'My projects', projectsDesc:'Projects saved in this browser', noProjects:'No saved projects yet', noProjectsDesc:'Create a circuit in Free Workbench and save your project', open:'Open', delete:'Delete', progressTitle:'Learning progress', progressDesc:'Track the lessons and skills you are developing', overall:'Learning overview', completed:'Lessons completed', inProgress:'In progress', domainsProgress:'Progress by domain',
      componentsTitle:'Component library', componentsDesc:'Explore the core devices used throughout lessons and labs', board:'Controller boards', sensor:'Sensors', actuator:'Actuators', passive:'Passive components',
      status:'System status', localOnly:'Prototype data is stored in this browser', prototypeNotice:'Prototype: basic behavior model for UX evaluation; not a compiler or SPICE simulator', footer:'MicroLab Academy · Interactive Engineering Learning Platform', toastSaved:'Project saved', toastDeleted:'Project deleted', toastComplete:'Learning progress saved', toastRun:'Simulation started', toastStop:'Simulation stopped', toastReset:'Simulation reset', toastStep:'Moved to the next step', toastAdded:'Component added', toastRemoved:'Component removed', confirmDelete:'Delete this project?',
      courseArduino:'Arduino Fundamentals', courseArduinoDesc:'Start programming and controlling circuits with Arduino Uno', courseElectronics:'Electronics Fundamentals', courseElectronicsDesc:'Voltage, current, resistance and essential circuit concepts', courseEsp:'ESP32 & IoT', courseEspDesc:'GPIO, Wi-Fi, sensors and internet connectivity', coursePLC:'PLC & Industrial Automation', coursePLCDesc:'Digital I/O, ladder logic, timers and counters', courseScada:'HMI, SCADA & Data Visualization', courseScadaDesc:'PLC communication, dashboards, alarms and trends', courseMotor:'Motor & Motion Control', courseMotorDesc:'PWM, servo, stepper and motor control', ledLesson:'LED Control with Digital Output', ledDesc:'Learn to configure a digital output and control an LED',
      recent1:'Opened LED Control lesson', recent2:'Tried Guided Simulation', recent3:'Explored component library', today:'Today', minutes:'min',
    }
  };

  const t = (key) => dictionaries[state.lang][key] || dictionaries.en[key] || key;
  const courses = [
    {id:'electronics',key:'courseElectronics',desc:'courseElectronicsDesc',category:'electronics',level:'beginner',count:8,progress:15,emoji:'⚡',color:'#eaf2ff',tag:'FOUNDATION'},
    {id:'arduino',key:'courseArduino',desc:'courseArduinoDesc',category:'micro',level:'beginner',count:10,progress:35,emoji:'▣',color:'#e5f7f1',tag:'POPULAR'},
    {id:'esp32',key:'courseEsp',desc:'courseEspDesc',category:'iot',level:'intermediate',count:9,progress:0,emoji:'◉',color:'#f0eaff',tag:'IOT'},
    {id:'plc',key:'coursePLC',desc:'coursePLCDesc',category:'plc',level:'intermediate',count:12,progress:0,emoji:'▤',color:'#fff3df',tag:'INDUSTRIAL'},
    {id:'scada',key:'courseScada',desc:'courseScadaDesc',category:'scada',level:'advanced',count:8,progress:0,emoji:'▥',color:'#e7f4fa',tag:'ADVANCED'},
    {id:'motor',key:'courseMotor',desc:'courseMotorDesc',category:'plc',level:'intermediate',count:7,progress:0,emoji:'↻',color:'#ffecef',tag:'MOTION'},
  ];
  const guidedSteps = [
    {title:{th:'เลือกบอร์ด Arduino Uno',en:'Select the Arduino Uno board'},detail:{th:'กำหนดบอร์ดเป็น Arduino Uno R3 ในพื้นที่ทดลอง',en:'Set the target board to Arduino Uno R3 in the workbench.'}},
    {title:{th:'กำหนด LED ที่ขา Digital 13',en:'Assign the LED to digital pin 13'},detail:{th:'วงจรตัวอย่างใช้ LED ที่ต่อกับขา D13 และ GND ผ่านตัวต้านทาน',en:'The example uses an LED connected to D13 and GND through a current-limiting resistor.'}},
    {title:{th:'ตรวจสอบคำสั่ง pinMode()',en:'Review the pinMode() instruction'},detail:{th:'ตั้งค่าขา 13 เป็น OUTPUT ในฟังก์ชัน setup()',en:'Configure pin 13 as OUTPUT inside setup().'}},
    {title:{th:'กำหนดการเปิดและปิด LED',en:'Set the LED HIGH and LOW'},detail:{th:'ใช้ digitalWrite() สลับสถานะ HIGH และ LOW',en:'Use digitalWrite() to switch between HIGH and LOW.'}},
    {title:{th:'เริ่มจำลองและสังเกตผล',en:'Run the simulation and observe'},detail:{th:'กด Run แล้วตรวจสอบ LED และ Serial Monitor',en:'Press Run and observe the LED state and Serial Monitor.'}},
  ];
  const partsInfo = {
    led:{label:'LED',emoji:'🔴',pin:'13',desc:'Light-emitting diode'},
    button:{label:'Push Button',emoji:'🔘',pin:'2',desc:'Momentary digital input'},
    pot:{label:'Potentiometer',emoji:'🎚️',pin:'A0',desc:'Analog variable resistor'},
    resistor:{label:'Resistor',emoji:'〰️',pin:'—',desc:'Current-limiting resistor'},
  };
  const defaultCode = `const int LED_PIN = 13;\n\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_PIN, LOW);\n  delay(1000);\n}`;
  let timer = null;
  let toastTimer = null;
  const loadJSON = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const state = {
    lang: localStorage.getItem('mla-lang') || 'th', page:'home', mobileOpen:false, filter:'all', search:'',
    activeCourse:'arduino', lessonIndex:0, labMode:'guided', guidedStep:0, running:false, ledOn:false,
    parts:[], selectedPart:null, code:defaultCode, serial:['MicroLab Simulator ready.'],
    projects:loadJSON('mla-projects',[]), completed:loadJSON('mla-completed',[]),
  };

  const labelLevel = (level) => t(level);
  const navBtn = (page, iconName, labelKey) => `<button class="nav-btn ${state.page===page?'active':''}" data-page="${page}">${ico(iconName,17)}<span>${t(labelKey)}</span></button>`;
  const shell = (body) => `
    <div class="shell">
      <div class="overlay ${state.mobileOpen?'show':''}" data-action="close-menu"></div>
      <aside class="sidebar ${state.mobileOpen?'open':''}">
        <div class="brand"><div class="brand-mark">${ico('cpu',22)}</div><div><div class="brand-name">MicroLab Academy</div><div class="brand-sub">ENGINEERING LEARNING</div></div></div>
        <div class="nav-label">${t('navOverview')}</div>
        <nav class="nav">${navBtn('home','grid','navHome')}${navBtn('progress','chart','navProgress')}</nav>
        <div class="nav-label">${t('navLearn')}</div>
        <nav class="nav">${navBtn('courses','book','navCourses')}${navBtn('lab','play','navLab')}</nav>
        <div class="nav-divider"></div>
        <div class="nav-label">${t('navBuild')}</div>
        <nav class="nav">${navBtn('projects','folder','navProjects')}${navBtn('components','puzzle','navComponents')}</nav>
        <div class="sidebar-bottom">
          <div class="sidebar-note">${ico('zap',17)}<strong>${t('preview')}</strong><p>${t('localOnly')}</p></div>
          <div class="user-mini"><div class="avatar">P</div><div><strong>Engineering Learner</strong><span>Student Workspace</span></div></div>
        </div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="top-left"><button class="icon-btn mobile-menu" data-action="toggle-menu">${ico('menu',18)}</button><div class="crumb">MicroLab Academy&nbsp; / &nbsp;<b>${t(state.page==='home'?'home':state.page==='courses'?'coursesTitle':state.page==='course'?'courseOverview':state.page==='lesson'?'lessonTitle':state.page==='lab'?'labTitle':state.page==='projects'?'projectsTitle':state.page==='progress'?'progressTitle':'componentsTitle')}</b></div></div>
          <div class="top-actions"><label class="search">${ico('search',15)}<input id="globalSearch" value="${escapeHTML(state.search)}" placeholder="${t('search')}" autocomplete="off"></label><div class="lang-switch"><button data-lang="th" class="${state.lang==='th'?'active':''}">TH</button><button data-lang="en" class="${state.lang==='en'?'active':''}">EN</button></div><button class="icon-btn" aria-label="Notifications">${ico('bell',17)}</button></div>
        </header>
        <div class="content">${body}<div style="margin-top:35px;text-align:center;color:#9aa6b7;font-size:9px">${t('footer')} &nbsp;·&nbsp; ${t('preview')}</div></div>
      </main>
    </div>`;

  function homePage(){
    const saved = state.projects.length;
    return `
      <section class="hero"><div class="hero-content"><span class="hero-tag">✦ &nbsp; ${t('preview')} &nbsp;·&nbsp; TH / EN</span><h2>${t('heroTitle').replace('\n','<br>')}</h2><p>${t('heroDesc')}</p><div class="hero-actions"><button class="btn btn-primary" data-page="courses">${t('explore')} ${ico('arrow',15)}</button><button class="btn btn-ghost" data-page="lab">${ico('play',14)} ${t('openLab')}</button></div></div><div class="hero-art"><div class="board"><div class="chip"></div><div class="pin"></div><div class="led"></div><div class="resistor"></div></div></div></section>
      <section class="stats-grid">
        <div class="stat-card"><div class="stat-icon" style="background:#eaf1ff;color:#3978f6">${ico('cpu',20)}</div><div><div class="stat-number">05</div><div class="stat-label">${t('domains')}</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#e7f8f1;color:#18a878">${ico('book',20)}</div><div><div class="stat-number">10</div><div class="stat-label">${t('starterLessons')}</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#fff4e5;color:#d9912e">${ico('play',20)}</div><div><div class="stat-number">02</div><div class="stat-label">${t('simModes')}</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#f2ecff;color:#8662d6">${ico('folder',20)}</div><div><div class="stat-number">${String(saved).padStart(2,'0')}</div><div class="stat-label">${t('savedProjects')}</div></div></div>
      </section>
      <div class="section-head"><h2>${t('recommended')}</h2><button class="text-link" data-page="courses">${t('viewAll')} ${ico('arrow',12)}</button></div>
      <section class="course-grid">${courses.slice(0,3).map(courseCard).join('')}</section>
      <div class="section-head"><h2>${t('continue')}</h2><button class="text-link" data-page="progress">${t('viewAll')}</button></div>
      <section class="two-col"><div class="card continue-card"><div class="continue-art">💡</div><div class="continue-info"><div class="muted">ARDUINO FUNDAMENTALS · 02 / 10</div><h3>${t('ledLesson')}</h3><p>${t('ledDesc')}</p><div class="progress-track"><div class="progress-fill" style="width:35%"></div></div><div style="margin-top:12px"><button class="btn btn-primary btn-sm" data-action="open-lesson">${t('start')} ${ico('arrow',13)}</button></div></div></div>
      <div class="card activity-card"><div class="section-head" style="margin:0 0 6px"><h2>${t('recentActivity')}</h2><span class="tag">LIVE PREVIEW</span></div><div class="activity-row"><div class="activity-dot">${ico('book',15)}</div><div><strong>${t('recent1')}</strong><span>${t('today')} · 10 ${t('minutes')}</span></div></div><div class="activity-row"><div class="activity-dot">${ico('play',15)}</div><div><strong>${t('recent2')}</strong><span>${t('today')} · 5 ${t('minutes')}</span></div></div><div class="activity-row"><div class="activity-dot">${ico('puzzle',15)}</div><div><strong>${t('recent3')}</strong><span>${t('today')}</span></div></div></div></section>`;
  }
  function courseCard(c){return `<article class="card course-card" data-open-course="${c.id}"><div class="course-top"><div class="course-icon" style="background:${c.color}">${c.emoji}</div><span class="tag">${c.tag}</span></div><h3>${t(c.key)}</h3><p>${t(c.desc)}</p><div class="course-foot"><span>${c.count} ${t('lessons')}</span><span>${labelLevel(c.level)}</span></div><div class="progress-track"><div class="progress-fill" style="width:${c.progress}%"></div></div></article>`}
  function coursesPage(){
    const filtered = courses.filter(c=>(state.filter==='all'||c.category===state.filter)&&(`${t(c.key)} ${t(c.desc)}`).toLowerCase().includes(state.search.toLowerCase()));
    const filters = [['all','all'],['electronics','electronics'],['micro','micro'],['plc','plc'],['iot','iot'],['scada','scada']];
    return `<div class="page-heading"><div><div class="eyebrow">LEARNING PATHWAYS</div><h1>${t('coursesTitle')}</h1><p>${t('coursesDesc')}</p></div><button class="btn btn-primary" data-page="lab">${ico('play',14)} ${t('openLab')}</button></div><div class="filters">${filters.map(([k,l])=>`<button class="filter-chip ${state.filter===k?'active':''}" data-filter="${k}">${t(l)}</button>`).join('')}</div><section class="course-list-grid">${filtered.length?filtered.map(c=>`<article class="card course-detail-card" data-open-course="${c.id}"><div class="course-cover" style="background:${c.color}"><span class="big-emoji">${c.emoji}</span><span class="tag">${c.tag}</span></div><div class="course-card-body"><h3>${t(c.key)}</h3><p>${t(c.desc)}</p><div class="course-meta"><span>${c.count} ${t('lessons')}</span><span>${labelLevel(c.level)}</span></div><div class="progress-track"><div class="progress-fill" style="width:${c.progress}%"></div></div></div></article>`).join(''):`<div class="card empty-state" style="grid-column:1/-1">${ico('search',24)}<strong>No matching courses</strong></div>`}</section>`;
  }
  function courseOverviewPage(){
    const c=courses.find(x=>x.id===state.activeCourse)||courses[1];
    const outline={
      electronics:[['Voltage, Current and Resistance','แรงดัน กระแส และความต้านทาน'],["Ohm’s Law",'กฎของโอห์ม'],['Series and Parallel Circuits','วงจรอนุกรมและวงจรขนาน'],["Kirchhoff’s Laws",'กฎของเคอร์ชอฟฟ์'],['Electrical Power and Energy','กำลังไฟฟ้าและพลังงาน']],
      arduino:[['Introduction to Arduino','แนะนำ Arduino'],['LED Control with Digital Output','ควบคุม LED ด้วย Digital Output'],['Digital Input — Push Button','Digital Input ด้วย Push Button'],['Analog Input — Potentiometer','Analog Input ด้วย Potentiometer'],['PWM Output','การสร้างสัญญาณ PWM'],['Sensor Interface','การเชื่อมต่อเซนเซอร์'],['Serial Communication','การสื่อสาร Serial'],['Servo Motor Control','การควบคุม Servo Motor']],
      esp32:[['ESP32 Architecture','สถาปัตยกรรม ESP32'],['GPIO Configuration','การกำหนดค่า GPIO'],['ADC and PWM','ADC และ PWM'],['Wi-Fi Connectivity','การเชื่อมต่อ Wi-Fi'],['MQTT Communication','การสื่อสาร MQTT'],['IoT Dashboard','แดชบอร์ด IoT']],
      plc:[['PLC Architecture','สถาปัตยกรรม PLC'],['Digital Input and Output','Digital Input และ Output'],['Ladder Logic Fundamentals','พื้นฐาน Ladder Logic'],['Timer and Counter','Timer และ Counter'],['Analog I/O','Analog I/O'],['High-Speed Counter','High-Speed Counter']],
      scada:[['HMI Fundamentals','พื้นฐาน HMI'],['PLC Communication','การสื่อสารกับ PLC'],['Modbus RTU and TCP','Modbus RTU และ TCP'],['SCADA Tags and Alarms','Tags และ Alarms'],['Trends and Data Logging','Trend และ Data Logging']],
      motor:[['DC Motor Fundamentals','พื้นฐาน DC Motor'],['PWM Speed Control','การควบคุมความเร็วด้วย PWM'],['Servo Motor Control','การควบคุม Servo Motor'],['Stepper Motor Control','การควบคุม Stepper Motor'],['Closed-Loop Speed Control','การควบคุมความเร็วแบบป้อนกลับ']]
    };
    const entries=outline[c.id]||outline.arduino;
    return `<div class="page-heading"><div><div class="eyebrow">LEARNING PATHWAY / ${c.tag}</div><h1>${t(c.key)}</h1><p>${t(c.desc)}</p></div><button class="btn btn-outline" data-page="courses">${t('coursesTitle')}</button></div>
      <section class="card" style="padding:18px;margin-bottom:15px"><div style="display:flex;align-items:center;gap:14px"><div class="course-icon" style="background:${c.color};width:54px;height:54px;font-size:25px">${c.emoji}</div><div style="flex:1"><div class="tag" style="display:inline-block">${labelLevel(c.level)}</div><h3 style="margin:7px 0 3px;font-size:14px">${t('lessonsOutline')}</h3><div style="font-size:10px;color:#8795a8">${c.count} ${t('lessons')} · ${c.progress}%</div></div></div><div class="progress-track" style="margin-top:14px"><div class="progress-fill" style="width:${c.progress}%"></div></div></section>
      <section class="card"><div class="panel-head"><strong>${t('lessonsOutline')}</strong><span>${entries.length} ${t('lessons')}</span></div>${entries.map((entry,i)=>{const available=c.id==='arduino'&&i===1;return `<div class="saved-project" style="border-bottom:1px solid #f0f3f7"><div class="project-icon" style="font-size:12px;font-weight:800;color:${available?'#2d6bdc':'#93a0b2'};background:${available?'#edf3ff':'#f2f4f7'}">${String(i+1).padStart(2,'0')}</div><div class="project-info"><strong>${state.lang==='th'?entry[1]:entry[0]}</strong><span>${available?t('availableNow'):t('planned')}</span></div>${available?`<button class="btn btn-primary btn-sm" data-course-lesson="available">${t('openLesson')} ${ico('arrow',12)}</button>`:`<span class="tag" style="background:#f2f4f7;color:#8b98aa">${t('planned')}</span>`}</div>`;}).join('')}</section><div class="info-callout" style="margin-top:13px">${ico('info',14)} &nbsp;${t('courseOutlineNote')}</div>`;
  }
  function lessonPage(){
    const done=state.completed.includes('arduino-led');
    return `<div class="page-heading"><div><div class="eyebrow">ARDUINO FUNDAMENTALS / MODULE 02</div><h1>${t('lessonTitle')}</h1><p>${t('ledDesc')}</p></div><button class="btn btn-secondary" data-page="courses">${ico('book',14)} ${t('coursesTitle')}</button></div>
      <div class="lesson-layout"><aside class="card lesson-sidebar"><h3>Arduino Fundamentals</h3><button class="lesson-item"><span class="lesson-check">✓</span>Introduction to Arduino</button><button class="lesson-item active"><span class="lesson-check">02</span>${t('ledLesson')}</button><button class="lesson-item"><span class="lesson-check">03</span>Digital Input — Button</button><button class="lesson-item"><span class="lesson-check">04</span>Analog Input — POT</button><button class="lesson-item"><span class="lesson-check">05</span>PWM Control</button><button class="lesson-item"><span class="lesson-check">06</span>Sensor Interface</button></aside>
      <article class="card lesson-main"><div class="eyebrow">LESSON 02 · DIGITAL OUTPUT</div><h2>${t('ledLesson')}</h2><p>${t('ledDesc')}. ${state.lang==='th'?'บทเรียนนี้แนะนำการควบคุม Digital Output ด้วยบอร์ด Arduino Uno และสังเกตผลจากการเปลี่ยนสถานะของ LED':'This lesson introduces digital output control with an Arduino Uno and observes how an LED responds to logic state changes.'}</p><div class="lesson-badges"><span class="tag">${t('beginner')}</span><span class="tag">15 ${t('minutes')}</span><span class="tag">Arduino Uno R3</span></div>
        <section class="lesson-section"><h3>${t('objectives')}</h3><ul><li>${state.lang==='th'?'อธิบายความหมายของ Digital HIGH และ LOW ได้':'Explain digital HIGH and LOW states.'}</li><li>${state.lang==='th'?'กำหนดขา GPIO เป็น OUTPUT ด้วย pinMode() ได้':'Configure a GPIO as OUTPUT using pinMode().'}</li><li>${state.lang==='th'?'เขียนโปรแกรมควบคุม LED ให้เปิดและปิดได้':'Write a program that turns an LED on and off.'}</li></ul></section>
        <section class="lesson-section"><h3>${t('theory')}</h3><p>${state.lang==='th'?'Digital Output คือการกำหนดสถานะทางลอจิกที่ขาเอาต์พุตของไมโครคอนโทรลเลอร์ โดยทั่วไป HIGH และ LOW ใช้แทนระดับลอจิก 1 และ 0 ตามแรงดันอ้างอิงของบอร์ด การต่อ LED ต้องมีตัวต้านทานจำกัดกระแสให้เหมาะสม':'A digital output sets a logic state on a microcontroller pin. HIGH and LOW represent logic 1 and 0 relative to the board voltage. An LED circuit requires an appropriately sized current-limiting resistor.'}</p><div class="info-callout">${state.lang==='th'?'ข้อควรระวัง: ห้ามต่อ LED เข้ากับ GPIO โดยไม่มีตัวต้านทานจำกัดกระแส และต้องตรวจสอบกระแสสูงสุดของขา I/O ตาม Datasheet ของบอร์ด':'Safety note: Do not connect an LED directly to a GPIO without a current-limiting resistor. Check the board datasheet for GPIO current limits.'}</div></section>
        <section class="lesson-section"><h3>${t('circuit')}</h3><div style="border:1px solid var(--line);border-radius:12px;background:#f7faff;padding:14px;text-align:center"><div style="font-size:34px">▣ ─── 220 Ω ─── 🔴</div><div style="font-size:10px;color:#718096;margin-top:6px">Arduino D13 → Resistor → LED → GND (illustrative connection)</div></div></section>
        <section class="lesson-section"><h3>${t('code')}</h3><div class="code-block">${escapeHTML(defaultCode)}</div></section>
        <section class="lesson-section"><h3>${t('procedure')}</h3><ol><li>${state.lang==='th'?'เลือกบอร์ด Arduino Uno R3':'Select the Arduino Uno R3 board.'}</li><li>${state.lang==='th'?'ต่อ LED ผ่านตัวต้านทานเข้ากับขา D13 และ GND':'Connect the LED through a resistor to D13 and GND.'}</li><li>${state.lang==='th'?'กำหนดขา D13 เป็น OUTPUT':'Configure D13 as OUTPUT.'}</li><li>${state.lang==='th'?'สั่ง HIGH และ LOW สลับกันด้วย delay(1000)':'Toggle HIGH and LOW with delay(1000).'}</li></ol></section>
        <div class="lesson-bottom"><button class="btn btn-outline" data-page="courses">${t('previous')}</button><div style="display:flex;gap:8px"><button class="btn ${done?'btn-secondary':'btn-outline'}" data-action="mark-complete">${done?'✓ '+(state.lang==='th'?'เรียนจบแล้ว':'Completed'):t('markComplete')}</button><button class="btn btn-primary" data-action="open-guided">${t('tryLab')} ${ico('arrow',14)}</button></div></div>
      </article></div>`;
  }
  function ledBoard(){return `<div class="board-stage"><div class="sim-status"><span class="status-dot ${state.running?'running':''}"></span>${state.running?t('running'):t('stopped')}</div><div class="arduino-board"><div class="usb-port"></div><div class="dc-port"></div><div class="board-chip"></div><div class="board-port"></div><div class="board-led ${state.ledOn?'on':''}"></div><div class="breadboard"></div><div class="led-visual ${state.ledOn?'on':''}"></div><div class="resistor-visual"></div></div></div>`}
  function serialPanel(){return `<section class="card code-card"><div class="section-head" style="margin:0 0 9px"><h3>${t('serial')}</h3><span class="tag">115200 BAUD</span></div><div class="mini-code serial-output" style="min-height:66px;max-height:125px;overflow:auto">${escapeHTML(state.serial.slice(-6).join('\n'))}</div></section>`;}
  function guidedLab(){
    return `<div class="lab-grid"><section class="card workbench"><div class="panel-head"><strong>${t('workbench')}</strong><span>${t('visualBoard')} · Arduino Uno R3</span></div>${ledBoard()}<div class="lab-controls"><button class="btn btn-primary btn-sm" data-action="${state.running?'stop':'run'}">${ico(state.running?'stop':'play',13)} ${state.running?t('stop'):t('run')}</button><button class="btn btn-outline btn-sm" data-action="reset">${ico('rotate',13)} ${t('reset')}</button><span style="font-size:10px;color:#8996a8;margin-left:auto">D13: <b style="color:${state.ledOn?'#16a574':'#8795a9'}">${state.ledOn?'HIGH':'LOW'}</b></span></div></section>
      <div class="lab-side"><section class="card guide-card"><div class="section-head" style="margin:0 0 9px"><h3>${t('guideSteps')}</h3><span class="tag">${state.guidedStep+1} / ${guidedSteps.length}</span></div>${guidedSteps.map((s,i)=>`<div class="step-row ${i<state.guidedStep?'done':''}"><div class="step-num">${i<state.guidedStep?'✓':i+1}</div><div><strong>${s.title[state.lang]}</strong><span>${s.detail[state.lang]}</span></div></div>`).join('')}<button class="btn btn-secondary btn-sm" style="width:100%;margin-top:11px" data-action="next-step" ${state.guidedStep>=guidedSteps.length-1?'disabled':''}>${t('nextStep')} ${ico('arrow',12)}</button></section>
      <section class="card code-card"><h3>${t('code')}</h3><div class="mini-code">${escapeHTML(defaultCode)}</div><div style="font-size:9px;color:#8996a8;margin-top:8px">${t('prototypeNotice')}</div></section>${serialPanel()}</div></div>`;
  }
  function freeLab(){
    const selected=state.parts.find(p=>p.id===state.selectedPart);
    return `<div class="lab-grid"><section class="card workbench"><div class="panel-head"><strong>${t('workbench')}</strong><span>Free workspace · Arduino Uno R3</span></div><div class="free-canvas"><div class="free-board">ARDUINO UNO R3</div><div class="component-tray">${state.parts.length?state.parts.map(p=>`<button class="placed-component ${p.id===state.selectedPart?'selected':''}" data-select-part="${p.id}"><span class="comp-symbol">${partsInfo[p.type].emoji}</span><strong>${partsInfo[p.type].label}</strong><small>${p.pin==='—'?'Passive':`Pin ${p.pin}`}</small></button>`).join(''):`<div class="empty-state">${ico('plus',24)}<strong>${t('noParts')}</strong>${t('addFirst')}</div>`}</div></div><div class="lab-controls"><button class="btn btn-primary btn-sm" data-action="${state.running?'stop':'run'}">${ico(state.running?'stop':'play',13)} ${state.running?t('stop'):t('run')}</button><button class="btn btn-outline btn-sm" data-action="reset">${ico('rotate',13)} ${t('reset')}</button><button class="btn btn-outline btn-sm" data-action="save-project">${ico('save',13)} ${t('saveProject')}</button><span style="font-size:10px;color:#8996a8;margin-left:auto">${state.parts.length} ${t('components')}</span></div></section>
      <div class="lab-side"><section class="card guide-card"><h3>${t('add')} · ${t('components')}</h3><div class="free-toolbar"><button class="component-pill" data-add-part="led">🔴 ${t('addLed')}</button><button class="component-pill" data-add-part="button">🔘 ${t('addButton')}</button><button class="component-pill" data-add-part="pot">🎚️ ${t('addPot')}</button><button class="component-pill" data-add-part="resistor">〰️ ${t('addResistor')}</button></div>${selected?`<div class="free-properties"><h3>${t('properties')}: ${partsInfo[selected.type].label}</h3><div class="field"><label>${t('pin')}</label><select data-change-pin="${selected.id}">${(selected.type==='pot'?['A0','A1','A2','A3','A4','A5']:selected.type==='button'?['2','3','4','5','6','7','8']:selected.type==='led'?['3','4','5','6','7','8','9','10','11','12','13']:['—']).map(pin=>`<option ${selected.pin===pin?'selected':''}>${pin}</option>`).join('')}</select></div>${selected.type==='led'?`<div class="field"><label>${t('color')}</label><select data-change-color="${selected.id}"><option value="red" ${selected.color==='red'?'selected':''}>Red</option><option value="green" ${selected.color==='green'?'selected':''}>Green</option><option value="blue" ${selected.color==='blue'?'selected':''}>Blue</option></select></div>`:''}<button class="btn btn-danger btn-sm" data-action="remove-part">${ico('trash',12)} ${t('remove')}</button></div>`:`<div class="free-properties" style="font-size:10px;color:#8996a8">${t('selectPart')}</div>`}</section>
      <section class="card code-card"><div class="section-head" style="margin:0 0 10px"><h3>${t('code')}</h3><span class="tag">C++ PREVIEW</span></div><textarea id="freeCode" class="field" style="width:100%;height:172px;border:1px solid #243957;background:#101d32;color:#dce8fa;border-radius:9px;padding:12px;font:10px/1.7 Consolas,monospace;resize:vertical;outline:none">${escapeHTML(state.code)}</textarea><div style="font-size:9px;color:#8996a8;margin-top:7px">${t('prototypeNotice')}</div></section>${serialPanel()}</div></div>`;
  }
  function labPage(){return `<div class="page-heading"><div><div class="eyebrow">SIMULATION STUDIO</div><h1>${t('labTitle')}</h1><p>${t('labDesc')}</p></div><span class="tag">MVP PREVIEW</span></div><div class="lab-toolbar"><div class="segmented"><button data-mode="guided" class="${state.labMode==='guided'?'active':''}">${t('guided')}</button><button data-mode="free" class="${state.labMode==='free'?'active':''}">${t('free')}</button></div><div style="font-size:10px;color:#8a98aa">${state.labMode==='guided'?t('guidedTitle'):t('freeTitle')}</div></div>${state.labMode==='guided'?guidedLab():freeLab()}<div class="info-callout" style="margin-top:14px">${ico('info',14)} &nbsp;${t('prototypeNotice')}</div>`}
  function projectsPage(){
    return `<div class="page-heading"><div><div class="eyebrow">YOUR WORKSPACE</div><h1>${t('projectsTitle')}</h1><p>${t('projectsDesc')}</p></div><button class="btn btn-primary" data-page="lab" data-mode-after="free">${ico('plus',14)} ${t('free')}</button></div><section class="card">${state.projects.length?state.projects.map(p=>`<div class="saved-project"><div class="project-icon">${p.parts?.some(x=>x.type==='led')?'💡':'▣'}</div><div class="project-info"><strong>${escapeHTML(p.name)}</strong><span>${new Date(p.updatedAt).toLocaleString(state.lang==='th'?'th-TH':'en-US')} · ${p.parts?.length||0} ${t('components')}</span></div><div class="project-actions"><button class="btn btn-secondary btn-sm" data-load-project="${p.id}">${t('open')}</button><button class="btn btn-outline btn-sm" data-delete-project="${p.id}">${t('delete')}</button></div></div>`).join('<div style="height:1px;background:#eef2f6;margin:0 15px"></div>'):`<div class="empty-state" style="padding:58px 25px">${ico('folder',32)}<strong>${t('noProjects')}</strong>${t('noProjectsDesc')}<div style="margin-top:16px"><button class="btn btn-primary" data-page="lab" data-mode-after="free">${t('openLab')}</button></div></div>`}</section>`;
  }
  function progressPage(){
    const completed=state.completed.length;
    return `<div class="page-heading"><div><div class="eyebrow">LEARNING ANALYTICS</div><h1>${t('progressTitle')}</h1><p>${t('progressDesc')}</p></div></div><section class="progress-grid"><div class="card progress-card"><h3>${t('overall')}</h3><div class="big-progress"><div class="ring"><strong>${completed?Math.round(completed/10*100):0}%</strong></div><div><div style="font-size:13px;font-weight:800">${completed} / 10</div><p>${t('completed')}<br>${t('inProgress')}: ${completed?1:1}</p></div></div></div><div class="card progress-card"><h3>${t('domainsProgress')}</h3>${courses.slice(0,4).map(c=>`<div style="margin:12px 0"><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:6px"><strong>${t(c.key)}</strong><span style="color:#8896a8">${c.progress}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${c.progress}%"></div></div></div>`).join('')}</div></section><div class="section-head"><h2>${t('recommended')}</h2></div><section class="course-grid">${courses.slice(0,3).map(courseCard).join('')}</section>`;
  }
  function componentsPage(){
    const items=[['▣','Arduino Uno R3','Controller board','board'],['◉','ESP32 DevKit V1','Wi-Fi microcontroller','board'],['🔴','LED','Output indicator','actuator'],['🔘','Push Button','Digital input','sensor'],['🎚️','Potentiometer','Analog input','sensor'],['〰️','Resistor','Current limiting','passive'],['🌡️','TMP36','Temperature sensor','sensor'],['↻','Servo Motor','Position actuator','actuator']];
    const groups=['board','sensor','actuator','passive'];
    return `<div class="page-heading"><div><div class="eyebrow">DEVICE CATALOG</div><h1>${t('componentsTitle')}</h1><p>${t('componentsDesc')}</p></div></div>${groups.map(g=>`<div class="section-head"><h2>${t(g)}</h2></div><section class="component-grid">${items.filter(i=>i[3]===g).map(i=>`<article class="card component-card"><div class="component-emoji">${i[0]}</div><strong>${i[1]}</strong><span>${i[2]}</span></article>`).join('')}</section>`).join('')}`;
  }

  function render(){
    stopTimer(false);
    let body = state.page==='home'?homePage():state.page==='courses'?coursesPage():state.page==='course'?courseOverviewPage():state.page==='lesson'?lessonPage():state.page==='lab'?labPage():state.page==='projects'?projectsPage():state.page==='progress'?progressPage():componentsPage();
    app.innerHTML=shell(body);
  }
  function navigate(page){state.page=page;state.mobileOpen=false;render();window.scrollTo({top:0,behavior:'smooth'});}
  function toast(message,success=true){let old=$('.toast');if(old)old.remove();const el=document.createElement('div');el.className=`toast ${success?'success':''}`;el.textContent=message;document.body.appendChild(el);clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.remove(),2600);}
  function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function stopTimer(update=true){if(timer){clearInterval(timer);timer=null;}state.running=false;if(update&&state.page==='lab')render();}
  function runSimulation(){
    if(state.running)return;state.running=true;state.serial.push('Simulation started.');
    state.serial.push('Simulation started.');
    if(state.labMode==='guided'){
      state.ledOn=false;let tick=0;
      timer=setInterval(()=>{state.ledOn=!state.ledOn;tick++;state.serial.push(`D13 = ${state.ledOn?'HIGH':'LOW'}  |  t = ${tick*1000} ms`);if(state.serial.length>8)state.serial.shift();const serial=$('.serial-output');if(serial){serial.textContent=state.serial.slice(-6).join('\n');serial.scrollTop=serial.scrollHeight;}const stage=$('.board-stage');if(stage){const boardLed=$('.board-led',stage),led=$('.led-visual',stage),status=$('.sim-status',stage);boardLed?.classList.toggle('on',state.ledOn);led?.classList.toggle('on',state.ledOn);if(status)status.innerHTML=`<span class="status-dot running"></span>${t('running')}`;const stateLabel=$('.lab-controls span');if(stateLabel)stateLabel.innerHTML=`D13: <b style="color:${state.ledOn?'#16a574':'#8795a9'}">${state.ledOn?'HIGH':'LOW'}</b>`;}},1000);
    }else{
      const leds=state.parts.filter(p=>p.type==='led');
      if(leds.length){state.ledOn=true;const board=$('.free-canvas');if(board){board.querySelectorAll('[data-select-part]').forEach((el)=>{if(el.textContent.includes('LED'))el.style.boxShadow='0 0 0 3px #ff6a7033,0 0 20px #ff6a7044';});}}
      timer=setInterval(()=>{state.ledOn=!state.ledOn;state.serial.push(`Free output state: ${state.ledOn?'ON':'OFF'}`);if(state.serial.length>8)state.serial.shift();const serial=$('.serial-output');if(serial){serial.textContent=state.serial.slice(-6).join('\n');serial.scrollTop=serial.scrollHeight;}const els=$$('.placed-component');els.forEach(el=>{if(el.textContent.includes('LED'))el.style.background=state.ledOn?'#fff0f1':'#fff';});},1000);
    }
    toast(t('toastRun'));
    const runButton=$('[data-action="run"]');if(runButton){runButton.dataset.action='stop';runButton.innerHTML=`${ico('stop',13)} ${t('stop')}`;}
  }
  function $$(selector,root=document){return Array.from(root.querySelectorAll(selector));}
  function resetSimulation(){stopTimer(false);state.ledOn=false;state.serial=['MicroLab Simulator reset.'];if(state.page==='lab')render();toast(t('toastReset'));}
  function saveProject(){
    const name=prompt(t('projectName'),`MicroLab Project ${state.projects.length+1}`);if(name===null)return;
    const trimmed=name.trim();if(!trimmed){toast(state.lang==='th'?'กรุณาระบุชื่อโปรเจกต์':'Please enter a project name.',false);return;}
    const project={id:`p-${Date.now()}`,name:trimmed,parts:state.parts.map(p=>({...p})),code:state.code,updatedAt:new Date().toISOString(),board:'arduino-uno-r3'};
    state.projects.unshift(project);localStorage.setItem('mla-projects',JSON.stringify(state.projects));render();toast(t('toastSaved'));
  }
  function changeMode(mode){stopTimer(false);state.labMode=mode;if(mode==='guided')state.guidedStep=0;render();}

  app.addEventListener('click',(event)=>{
    const target=event.target.closest('button,[data-page],[data-open-course],[data-course-lesson],[data-action],[data-lang],[data-filter],[data-mode],[data-add-part],[data-select-part],[data-load-project],[data-delete-project]');if(!target)return;
    if(target.dataset.page){navigate(target.dataset.page);if(target.dataset.modeAfter==='free'){state.labMode='free';render();}return;}
    if(target.dataset.lang){state.lang=target.dataset.lang;localStorage.setItem('mla-lang',state.lang);render();return;}
    if(target.dataset.openCourse){state.activeCourse=target.dataset.openCourse;navigate('course');return;}
    if(target.dataset.courseLesson){navigate('lesson');return;}
    if(target.dataset.filter){state.filter=target.dataset.filter;render();return;}
    if(target.dataset.mode){changeMode(target.dataset.mode);return;}
    if(target.dataset.addPart){const id=`${target.dataset.addPart}-${Date.now()}-${Math.floor(Math.random()*999)}`;const type=target.dataset.addPart;const part={id,type,pin:partsInfo[type].pin,color:'red'};state.parts.push(part);state.selectedPart=id;render();toast(t('toastAdded'));return;}
    if(target.dataset.selectPart){state.selectedPart=target.dataset.selectPart;render();return;}
    if(target.dataset.loadProject){const p=state.projects.find(x=>x.id===target.dataset.loadProject);if(p){state.parts=(p.parts||[]).map(x=>({...x}));state.code=p.code||defaultCode;state.selectedPart=state.parts[0]?.id||null;state.labMode='free';navigate('lab');toast(t('open')+' · '+p.name);}return;}
    if(target.dataset.deleteProject){if(confirm(t('confirmDelete'))){state.projects=state.projects.filter(p=>p.id!==target.dataset.deleteProject);localStorage.setItem('mla-projects',JSON.stringify(state.projects));render();toast(t('toastDeleted'));}return;}
    const action=target.dataset.action;
    if(action==='toggle-menu'){state.mobileOpen=!state.mobileOpen;render();}
    if(action==='close-menu'){state.mobileOpen=false;render();}
    if(action==='open-lesson'){navigate('lesson');}
    if(action==='open-guided'){state.labMode='guided';navigate('lab');}
    if(action==='run')runSimulation();
    if(action==='stop'){stopTimer(false);state.serial.push('Simulation stopped.');render();toast(t('toastStop'));}
    if(action==='reset')resetSimulation();
    if(action==='next-step'){state.guidedStep=Math.min(state.guidedStep+1,guidedSteps.length-1);render();toast(t('toastStep'));}
    if(action==='save-project')saveProject();
    if(action==='remove-part'){state.parts=state.parts.filter(p=>p.id!==state.selectedPart);state.selectedPart=null;render();toast(t('toastRemoved'));}
    if(action==='mark-complete'){if(!state.completed.includes('arduino-led'))state.completed.push('arduino-led');localStorage.setItem('mla-completed',JSON.stringify(state.completed));render();toast(t('toastComplete'));}
  });
  app.addEventListener('change',(event)=>{
    const pin=event.target.closest('[data-change-pin]');if(pin){const p=state.parts.find(x=>x.id===pin.dataset.changePin);if(p)p.pin=pin.value;render();return;}
    const color=event.target.closest('[data-change-color]');if(color){const p=state.parts.find(x=>x.id===color.dataset.changeColor);if(p)p.color=color.value;}
  });
  app.addEventListener('input',(event)=>{
    if(event.target.id==='freeCode')state.code=event.target.value;
    if(event.target.id==='globalSearch')state.search=event.target.value;
  });
  app.addEventListener('keydown',(event)=>{
    if(event.target.id==='globalSearch'&&event.key==='Enter'){state.page='courses';state.filter='all';render();}
  });
  window.addEventListener('beforeunload',()=>stopTimer(false));
  render();
})();
