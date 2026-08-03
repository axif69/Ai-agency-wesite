// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

// Search Bar
function setupSearch() {
  const searchBar = document.querySelector('.search-bar');
  searchBar.addEventListener('focus', () => {
    searchBar.style.borderColor = 'var(--accent)';
  });
  
  searchBar.addEventListener('blur', () => {
    searchBar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  });
  
  searchBar.addEventListener('input', (e) => {
    console.log('Search query:', e.target.value);
  });
}

// Target Pills
function setupTargetPills() {
  const pills = document.querySelectorAll('.pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Reset all pills
      pills.forEach(p => {
        p.style.backgroundColor = 'color-mix(in oklch, var(--surface) 50%, transparent)';
        p.style.color = 'var(--fg)';
      });
      // Highlight clicked pill
      pill.style.backgroundColor = 'var(--accent)';
      pill.style.color = 'white';
    });
  });
}

// Radar Pulse Animation
function setupRadarPulse() {
  const pulseDot = document.querySelector('.pulse-dot');
  setInterval(() => {
    pulseDot.style.animation = 'none';
    void pulseDot.offsetWidth;
    pulseDot.style.animation = 'pulse 2s infinite';
  }, 2000);
}

// Charts Setup
function setupCharts() {
  // Area Chart (Pipeline Lead Conversion)
  const areaChartCtx = document.createElement('canvas');
  areaChartCtx.id = 'areaChart';
  const areaChartPlaceholder = document.querySelector('.chart-card:first-child .chart-placeholder');
  areaChartPlaceholder.innerHTML = '';
  areaChartPlaceholder.appendChild(areaChartCtx);
  
  new Chart(areaChartCtx, {
    type: 'line',
    data: {
      labels: ['Discovered', 'Qualified', 'Decision Maker', 'Outreach'],
      datasets: [{
        label: 'Leads',
        data: [1917, 674, 350, 50],
        borderColor: 'var(--accent)',
        backgroundColor: 'color-mix(in oklch, var(--accent) 20%, transparent)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'var(--accent)',
        pointBorderColor: 'var(--bg)',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          beginAtZero: true
        }
      }
    }
  });
  
  // Bar Chart (Industry Sector Distribution)
  const barChartCtx = document.createElement('canvas');
  barChartCtx.id = 'barChart';
  const barChartPlaceholder = document.querySelector('.chart-card:last-child .chart-placeholder');
  barChartPlaceholder.innerHTML = '';
  barChartPlaceholder.appendChild(barChartCtx);
  
  new Chart(barChartCtx, {
    type: 'bar',
    data: {
      labels: ['MEP Contracting', 'Engineering Consultancies', 'Logistics', 'Real Estate'],
      datasets: [{
        label: 'Companies',
        data: [450, 320, 280, 150],
        backgroundColor: [
          'color-mix(in oklch, var(--accent) 70%, transparent)',
          'color-mix(in oklch, var(--accent-secondary) 70%, transparent)',
          'color-mix(in oklch, var(--success) 70%, transparent)',
          'color-mix(in oklch, var(--warning) 70%, transparent)'
        ],
        borderColor: [
          'var(--accent)',
          'var(--accent-secondary)',
          'var(--success)',
          'var(--warning)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          beginAtZero: true
        }
      }
    }
  });
}

// Button States
function setupButtonStates() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
      button.style.transform = 'scale(0.98)';
    });
    button.addEventListener('mouseup', () => {
      button.style.transform = 'scale(1)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  });
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const menuToggle = document.createElement('button');
  menuToggle.innerHTML = '☰';
  menuToggle.className = 'menu-toggle';
  menuToggle.style.position = 'fixed';
  menuToggle.style.top = '1rem';
  menuToggle.style.left = '1rem';
  menuToggle.style.zIndex = '1000';
  menuToggle.style.background = 'var(--surface)';
  menuToggle.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  menuToggle.style.borderRadius = '0.5rem';
  menuToggle.style.padding = '0.5rem';
  menuToggle.style.cursor = 'pointer';
  menuToggle.addEventListener('click', toggleSidebar);
  document.body.prepend(menuToggle);
}

// Initialize
function init() {
  setupSearch();
  setupTargetPills();
  setupRadarPulse();
  setupCharts();
  setupButtonStates();
  
  // Mobile setup
  if (window.innerWidth <= 768) {
    setupMobileMenu();
  }
  
  // Responsive adjustments
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      setupMobileMenu();
    }
  });
}

// Load Chart.js
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
chartScript.onload = init;
document.head.appendChild(chartScript);