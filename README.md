<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>NextInCare - README</title>
  <style>
    body {
      font-family: "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      margin: 2rem auto;
      max-width: 960px;
      padding: 0 1rem;
      background-color: #f9f9f9;
      color: #333;
    }
    h1, h2, h3 {
      color: #005b96;
    }
    code, pre {
      background: #eee;
      padding: 2px 6px;
      border-radius: 4px;
    }
    pre {
      overflow-x: auto;
      padding: 1em;
      background: #272822;
      color: #f8f8f2;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 1.5rem;
    }
    table, th, td {
      border: 1px solid #ccc;
    }
    th, td {
      padding: 0.5rem;
      text-align: left;
    }
    blockquote {
      border-left: 4px solid #ccc;
      padding-left: 1rem;
      color: #666;
      margin: 1rem 0;
    }
    .logo {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .logo img {
      height: 80px;
    }
    .center {
      text-align: center;
    }
    hr {
      margin: 2rem 0;
      border: none;
      border-top: 1px solid #ccc;
    }
  </style>
</head>
<body>

  <div class="logo">
    <img src="assets/logo.svg" alt="NextInCare Logo" />
    <h1>NextInCare 🏥</h1>
    <p><em>Smart Medical Appointment & Queue Management System</em></p>
  </div>

  <hr/>

  <h2>📌 Overview</h2>
  <p><strong>NextInCare</strong> is a web-based clinic assistant that allows patients to <strong>book appointments</strong>, <strong>receive a digital slip</strong>, and <strong>track their position in a real-time queue</strong> — all stored locally using <code>IndexedDB</code>.</p>

  <h2>🚀 Features</h2>
  <ul>
    <li>📅 Appointment Booking Form</li>
    <li>⏱️ Live Queue with Real-Time Display</li>
    <li>🧾 Auto-Generated Appointment Slip</li>
    <li>🧠 Smart Slot Scheduling Based on Queue Load</li>
    <li>⚙️ Fully Browser-Based (IndexedDB)</li>
    <li>🌙 Light & Dark Mode UI</li>
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
      <pre><code>git clone https://github.com/yourusername/NextInCare.git
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
  <a href="">GitHub</a> • <a href="">LinkedIn</a></p>

  <h2>📄 License</h2>
  <p>Licensed under <strong>MIT License</strong>. Use it freely, credit appreciated.</p>

</body>
</html>
 
