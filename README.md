<div>
    <h1>NextInCare 🏥</h1>
    <p><em>Smart Medical Appointment & Queue Management System</em></p>
  </div>

  <hr/>

  <h2>📌 Overview</h2>
  <p><strong>NextInCare</strong> is a web-based clinic assistant that allows patients to <strong>book appointments</strong>, <strong>receive a digital slip</strong>, and <strong>track their position in a real-time queue</strong> — all stored locally using <code>IndexedDB</code>.</p>

  <h2>🚀 Features</h2>
  <ul>
    📅 Appointment Booking Form<br><br>
    ⏱️ Live Queue with Real-Time Display<br><br>
    🧾 Auto-Generated Appointment Slip<br><br>
    🧠 Smart Slot Scheduling Based on Queue Load<br><br>
    ⚙️ Fully Browser-Based (IndexedDB)<br><br>
    🌙 Light & Dark Mode UI<br><br><br><br>
  </ul>

  <h2>🧑‍💻 Tech Stack</h2>
  <table>
    <tr><th>Layer</th><th>Technology</th></tr>
    <tr><td>Frontend</td><td>HTML, CSS, JavaScript (ES Modules)</td></tr>
    <tr><td>Database</td><td>IndexedDB</td></tr>
    <tr><td>Server</td><td>Static Server (Live Server, serve)</td></tr>
  </table>

  <h2>📂 Project Structure</h2>
  <pre><code>NextInCare/
├── index.html            # Homepage
├── booking.html          # Appointment form
├── queue.html            # Queue board
├── css/
│   ├── styles.css        # Core styles
│   └── themes.css        # Light/Dark theme
├── js/
│   ├── db.js             # IndexedDB logic
│   ├── booking.js        # Booking logic
│   ├── queue.js          # Queue display logic
│   └── ui.js             # UI/theme scripts
├── assets/
│   └── logo.svg          # Logo
└── README.html           # This file
</code></pre>

  <h2>🛠️ How to Run</h2>
  <ol>
    <li>Clone the repo:
      <pre><code>git clone https://github.com/armanshaikh-2001/NextInCare.git
cd NextInCare</code></pre>
    </li>
    <li>Run a local server:
      <pre><code>npx serve
# OR
npx live-server</code></pre>
    </li>
    <li>Open in browser:
      <pre><code>http://localhost:3000</code></pre>
    </li>
  </ol>

  <h2>📺 How It Works</h2>
  <ul>
    <li>Patient fills booking form</li>
    <li>Auto-assigned appointment ID and time</li>
    <li>Appointment saved to IndexedDB</li>
    <li>Slip shown with queue number</li>
    <li>Live Queue board shows current and upcoming</li>
  </ul>

  <h2>📈 Future Enhancements</h2>
  <ul>
    <li>Admin Dashboard to update status</li>
    <li>PDF/Print slip support</li>
    <li>SMS/email reminders</li>
    <li>Analytics and reporting</li>
    <li>PWA version for offline use</li>
  </ul>

  <h2>⚠️ Data Storage</h2>
  <blockquote>
    All data is stored in the browser using IndexedDB.<br/>
    To clear, go to DevTools → Application → IndexedDB → Delete "HealthHavenDB"
  </blockquote>

  <h2>🧑‍💻 Author</h2>
  <p><strong>Arman Shiakh R</strong><br/>
  Passionate about healthcare and accessible technology.<br/>
  <a href="https://github.com/armanshaikh-2001">GitHub</a> • <a href="https://www.linkedin.com/in/armanshaikh2001/">LinkedIn</a></p>

  <h2>📄 License</h2>
  <p>Licensed under <strong>MIT License</strong>. Use it freely, credit appreciated.</p>

 
