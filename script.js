const db = {
    causes: [
        { id: 'track', title: 'Track Condition', icon: '🛤️', details: 'The physical state and geometry of the track. Includes periodic top settlement, rail defects, and ballast issues. Inconsistent inspection often leads to reactive TSRs.' },
        { id: 'weather', title: 'Weather Factors', icon: '🌦️', details: 'Environmental elements requiring rapid response. Includes high heat causing track buckles, extreme cold causing fractures, high winds, and flooding that destabilizes track beds.' },
        { id: 'maintenance', title: 'Maintenance Work', icon: '🏗️', details: 'Planned and unplanned work on the infrastructure. Includes track renewals, post-work ballast consolidation, and structure repairs, all requiring speed control for safety.' },
        { id: 'incidents', title: 'Incidents & Systems', icon: '🚨', details: 'Unforeseen operational events. Includes derailments, washouts, or system failures like Positive Train Control (PTC) which can trigger automatic fallback speed restrictions.' }
    ],
    roles: [
        { id: 'roadmaster', name: 'Roadmaster/Foreman', detail: 'The frontline engineering staff responsible for track condition. Initiates TSRs due to defects or maintenance and notifies the dispatcher.' },
        { id: 'dispatcher', name: 'Dispatcher/Controller', detail: 'Central traffic management. Authorizes track usage, officially communicates TSRs to trains via bulletins, and coordinates the lifecycle.' },
        { id: 'driver', name: 'Train Crew/Driver', detail: 'Ultimately responsible for the safe operation of the train. Must identify and adhere to all TSR advice received via signs or in-cab systems.' },
        { id: 'im', name: 'Infrastructure Manager', detail: 'Holds overall responsibility for the railway infrastructure. Is the ultimate authority for TSR implementation.' },
        { id: 'toc', name: 'Operating Company', detail: 'Ensures its drivers are aware of and adhere to all TSRs and that internal notification processes are robust.' },
    ],
    workflow: [
        { role: 'roadmaster', step: '1. Hazard Identified', description: 'Roadmaster finds a track defect or schedules maintenance.'},
        { role: 'roadmaster', step: '2. TSR Initiated', description: 'Roadmaster places the restriction and determines the required speed.'},
        { role: 'dispatcher', step: '3. Official Notification', description: 'Dispatcher receives the request, issues official bulletins/authorities, and notifies all parties.'},
        { role: 'driver', step: '4. Information Received', description: 'Train driver receives TSR information via in-cab systems or bulletins.'},
        { role: 'driver', step: '5. TSR Adherence', description: 'Driver operates the train at the restricted speed through the specified zone.'},
        { role: 'roadmaster', step: '6. Work/Inspection Complete', description: 'Roadmaster finishes repairs/work and certifies the track is safe.'},
        { role: 'dispatcher', step: '7. TSR Lifted', description: 'Dispatcher is notified, cancels bulletins, and the restriction is removed from systems.'}
    ],
    timeline: [
        { era: 'Traditional Era', icon: '📜', details: 'Physical signs at the trackside, paper notices, and verbal advice. Simple but poses safety risks to staff, is slow to deploy, and is prone to human error.', color: 'bg-amber-200'},
        { era: 'Transitional Era', icon: '📟', details: 'Early digital aids like Driver Information Systems (DIS) and AWS magnets provide in-cab warnings but still rely on physical infrastructure.', color: 'bg-sky-200'},
        { era: 'Modern Era', icon: '🛰️', details: 'Fully digital, automated systems like PTC, digital speed boards, and TSR servers. Allows remote control, real-time updates, and automatic speed enforcement, enhancing safety and efficiency.', color: 'bg-emerald-200'}
    ],
    dataElements: [
        { icon: '🆔', text: 'Unique Identifier' }, { icon: '📍', text: 'Location Data (Milepost, GPS)' },
        { icon: ' speedometer', text: 'Speed Value (mph/kph, differential)' }, { icon: '⏱️', text: 'Temporal Info (Start/End Time)' },
        { icon: '🏷️', text: 'Restriction Type (Planned, Emergency)' }, { icon: '❓', text: 'Reason for Restriction' },
        { icon: '👥', text: 'Responsible Party' }, { icon: '📊', text: 'Status & Progress' }
    ],
    integrations: [
        { icon: '📡', text: 'Signaling & Train Control (PTC/ERTMS)' }, { icon: '🚦', text: 'Traffic Management & Dispatch' },
        { icon: '🛠️', text: 'Maintenance & Asset Management' }, { icon: '☁️', text: 'Real-time Weather Data' },
        { icon: '📲', text: 'Driver Information Systems (DIS)' }, { icon: '🗺️', text: 'Geographic Information Systems (GIS)' }
    ],
    ui_ux: [
         { icon: '🧑‍💻', title: 'Role-Based Views', description: 'Tailored dashboards and workflows for different users like roadmasters, dispatchers, and drivers.'},
         { icon: '🖱️', title: 'Intuitive Data Entry', description: 'Simplified forms with dropdowns and visual aids to reduce errors and effort.'},
         { icon: '🔔', title: 'Real-Time Alerting', description: 'Clear visual cues (e.g., color-coding) and notifications for new or changed restrictions.'},
         { icon: '🌐', title: 'Geospatial Map View', description: 'An interactive map showing all TSR locations to enhance situational awareness.'},
         { icon: '📈', title: 'Analytics & History', description: 'Tools to analyze trends, review historical data, and generate compliance reports.'},
         { icon: '📱', title: 'Mobile Accessibility', description: 'Responsive design with potential for offline functionality for field staff.'}
    ]
};

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

function showSection(sectionId, isMobile = false) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Update desktop nav
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });
    const desktopButton = document.querySelector(`.nav-button[onclick="showSection('${sectionId}')"]`);
    if(desktopButton) desktopButton.classList.add('active');
    
    // Update mobile nav
    document.querySelectorAll('.nav-button-mobile').forEach(button => {
        button.classList.remove('active');
    });
    const mobileButton = document.querySelector(`.nav-button-mobile[onclick="showSection('${sectionId}', true)"]`);
    if(mobileButton) mobileButton.classList.add('active');

    if (isMobile) {
        mobileMenu.classList.add('hidden');
    }
}

function showTSRType(type) {
    document.querySelectorAll('.tsr-type-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`content-${type}`).classList.remove('hidden');

    const buttons = document.querySelectorAll('.tab-button');
    const activeClasses = ['bg-white', 'text-stone-900', 'font-semibold', 'shadow'];
    const inactiveClasses = ['text-stone-500', 'hover:bg-stone-300'];

    buttons.forEach(button => {
        button.classList.remove(...activeClasses);
        button.classList.add(...inactiveClasses);
    });

    const activeBtn = document.getElementById(`btn-${type}`);
    activeBtn.classList.remove(...inactiveClasses);
    activeBtn.classList.add(...activeClasses);
}

function highlightRole(selectedRole) {
    document.querySelectorAll('.role').forEach(roleEl => roleEl.classList.remove('active'));
    if (selectedRole) {
        document.querySelector(`.role[data-role='${selectedRole.id}']`).classList.add('active');
    }

    const roleDetailDisplay = document.getElementById('role-detail-display');
    if (roleDetailDisplay && selectedRole) {
        roleDetailDisplay.innerHTML = `
            <div class="text-left w-full">
                <h4 class="font-bold text-stone-800 text-lg">${selectedRole.name}</h4>
                <p class="text-stone-700 mt-1">${selectedRole.detail}</p>
            </div>
        `;
    } else {
         roleDetailDisplay.innerHTML = `<p class="text-stone-500">Click a role above to see its detailed responsibilities.</p>`;
    }

    document.querySelectorAll('.process-step').forEach(stepEl => {
        stepEl.classList.remove('active', 'bg-stone-100');
        if (selectedRole && stepEl.getAttribute('data-role') === selectedRole.id) {
            stepEl.classList.add('active', 'bg-stone-100');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Set initial active tab
    showTSRType('planned');
    
    const causesGrid = document.getElementById('causes-grid');
    db.causes.forEach(cause => {
        const causeEl = document.createElement('div');
        causeEl.className = 'p-4 rounded-lg border bg-stone-50 cursor-pointer hover:shadow-lg hover:border-stone-400 transition-all';
        causeEl.innerHTML = `
            <div class="text-center">
                <div class="text-4xl mb-2">${cause.icon}</div>
                <h4 class="font-semibold text-lg">${cause.title}</h4>
            </div>
            <p class="text-sm text-stone-600 hidden mt-2 text-left leading-relaxed">${cause.details}</p>
        `;
        causeEl.addEventListener('click', (e) => {
            e.currentTarget.querySelector('p').classList.toggle('hidden');
        });
        causesGrid.appendChild(causeEl);
    });

    const rolesContainer = document.getElementById('roles-container');
    db.roles.forEach(role => {
        const roleEl = document.createElement('button');
        roleEl.className = 'role py-3 px-5 rounded-full border-2 border-stone-300 bg-white hover:bg-stone-100 transition-colors text-sm sm:text-base';
        roleEl.textContent = role.name;
        roleEl.dataset.role = role.id;
        roleEl.onclick = () => highlightRole(role);
        rolesContainer.appendChild(roleEl);
    });
    
    const workflowContainer = document.getElementById('workflow-container');
    db.workflow.forEach(item => {
        const stepEl = document.createElement('div');
        stepEl.className = 'process-step p-4 rounded-r-lg transition-all duration-300';
        stepEl.dataset.role = item.role;
        stepEl.innerHTML = `
            <h4 class="font-bold text-stone-800">${item.step}</h4>
            <p class="text-stone-600 text-sm">${item.description}</p>
        `;
        workflowContainer.appendChild(stepEl);
    });

    const timelineContainer = document.getElementById('timeline-container');
    db.timeline.forEach((item, index) => {
        const timelineEl = document.createElement('div');
        timelineEl.className = 'relative pl-8 pb-8 group';
        timelineEl.innerHTML = `
            <div class="absolute top-1 left-0 w-4 h-4 rounded-full ${item.color} border-4 border-white z-10"></div>
            ${index < db.timeline.length - 1 ? '<div class="absolute top-1 left-2 h-full w-0.5 bg-stone-200"></div>' : ''}
            <div class="p-4 rounded-lg bg-stone-50 border border-stone-200 ml-4 group-hover:bg-white group-hover:shadow-md transition-all">
                <h4 class="font-bold text-lg flex items-center"><span class="text-2xl mr-2">${item.icon}</span>${item.era}</h4>
                <p class="text-stone-600 leading-relaxed">${item.details}</p>
            </div>
        `;
        timelineContainer.appendChild(timelineEl);
    });
    
    const dataElementsList = document.getElementById('data-elements-list');
    db.dataElements.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="mr-2">${item.icon}</span>${item.text}`;
        dataElementsList.appendChild(li);
    });

    const integrationsList = document.getElementById('integrations-list');
    db.integrations.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="mr-2">${item.icon}</span>${item.text}`;
        integrationsList.appendChild(li);
    });
    
    const uiUxList = document.getElementById('ui-ux-list');
    db.ui_ux.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-stone-50 p-4 rounded-lg border';
        card.innerHTML = `
            <h4 class="font-semibold text-md flex items-center mb-1"><span class="text-xl mr-2">${item.icon}</span>${item.title}</h4>
            <p class="text-sm text-stone-600 leading-relaxed">${item.description}</p>
        `;
        uiUxList.appendChild(card);
    });

    const ctx = document.getElementById('regionalStandardsChart').getContext('2d');
    const regionalStandardsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'],
            datasets: [
            {
                label: 'Max Freight Speed (mph)',
                data: [10, 25, 40, 60, 80, 110],
                backgroundColor: 'rgba(68, 64, 60, 0.7)',
                borderColor: 'rgba(68, 64, 60, 1)',
                borderWidth: 1
            },
            {
                label: 'Max Passenger Speed (mph)',
                data: [15, 30, 60, 80, 90, 110],
                backgroundColor: 'rgba(168, 162, 158, 0.7)',
                borderColor: 'rgba(168, 162, 158, 1)',
                borderWidth: 1
            }
        ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, title: { display: true, text: 'Speed (mph)' } },
                y: { title: { display: true, text: 'FRA Track Class' } }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false },
                title: { display: true, text: 'FRA Maximum Allowable Operating Speeds' }
            }
        }
    });
});
