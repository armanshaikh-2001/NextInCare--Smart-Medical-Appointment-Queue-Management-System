import { 
    initializeDatabase,
    getCurrentAppointment, 
    getUpcomingAppointments, 
    getAllAppointments,
    getAppointmentsByStatus,
    updateAppointment
} from './db.js';


// Utility function to safely get elements
const getElement = (id) => {
    const el = document.getElementById(id);
    if (!el) console.error(`Element with ID '${id}' not found`);
    return el;
};

document.addEventListener('DOMContentLoaded', async () => {
    console.log('[Queue] Initializing DB...');
    await initializeDatabase();
    console.log('[Queue] DB initialized!');
    // Safely get all required elements
    const elements = {
        currentPatient: getElement('current-patient'),
        upcomingPatients: getElement('upcoming-patients'),
        refreshQueueBtn: getElement('refresh-queue'),
        lastUpdated: getElement('last-updated'),
        onMyWayBtn: getElement('on-my-way'),
        viewAllBtn: getElement('view-all'),
        allAppointmentsModal: getElement('all-appointments-modal'),
        closeAppointmentsBtn: getElement('close-appointments'),
        filterStatus: getElement('filter-status'),
        searchPatient: getElement('search-patient')
    };

    // Safely get tbody if the table exists
    const appointmentsTable = getElement('appointments-list');
    const appointmentsList = appointmentsTable?.querySelector('tbody');

    // Exit if critical elements are missing
    if (!elements.currentPatient || !elements.upcomingPatients || !appointmentsList) {
        console.error('Critical elements missing - cannot initialize queue');
        return;
    }

    // Format time
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Update the queue display
    const updateQueueDisplay = async () => {
        try {
            const current = await getCurrentAppointment();
            const upcoming = await getUpcomingAppointments(5);
            
            // Update current patient
            elements.currentPatient.innerHTML = current ? `
                <div class="patient-info">
                    <span class="patient-name">${current.patientName}</span>
                    <span class="patient-service">${current.service}</span>
                </div>
                <div class="patient-time">
                    <span>Started at ${formatTime(current.datetime)}</span>
                </div>
            ` : `
                <div class="patient-info">
                    <span class="patient-name">No current appointment</span>
                </div>
            `;
            
            // Update upcoming patients
            elements.upcomingPatients.innerHTML = upcoming.length > 0 ? upcoming.map(appointment => `
                <div class="upcoming-patient">
                    <div class="patient-info">
                        <div class="patient-priority priority-${appointment.priority}"></div>
                        <span class="patient-name">${appointment.patientName}</span>
                        <span class="patient-service">${appointment.service}</span>
                    </div>
                    <div class="patient-time">
                        <span>${formatTime(appointment.datetime)}</span>
                    </div>
                </div>
            `).join('') : `
                <div class="empty-queue">
                    <i class="fas fa-procedures"></i>
                    <p>No upcoming appointments</p>
                </div>
            `;
            
            // Update last updated time
            if (elements.lastUpdated) {
                elements.lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
            }
        } catch (error) {
            console.error('Error updating queue:', error);
        }
    };

    // Load all appointments for the modal
    const loadAllAppointments = async (filter = 'all', search = '') => {
        try {
            let appointments = filter === 'all' 
                ? await getAllAppointments() 
                : await getAppointmentsByStatus(filter);
            
            // Filter by search term
            if (search) {
                const term = search.toLowerCase();
                appointments = appointments.filter(appt => 
                    appt.patientName.toLowerCase().includes(term) ||
                    appt.id.toLowerCase().includes(term)
                );
            }
            
            // Sort and display
            appointments.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
            appointmentsList.innerHTML = appointments.map(appointment => `
                <tr>
                    <td>${appointment.id}</td>
                    <td>${appointment.patientName}</td>
                    <td>${appointment.service}</td>
                    <td>
                        <span class="status-badge status-${appointment.status}">
                            ${appointment.status.replace('-', ' ')}
                        </span>
                    </td>
                    <td>${new Date(appointment.datetime).toLocaleString()}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error loading appointments:', error);
        }
    };

    // Event listeners with null checks
    if (elements.refreshQueueBtn) {
        elements.refreshQueueBtn.addEventListener('click', updateQueueDisplay);
    }

    if (elements.onMyWayBtn) {
        elements.onMyWayBtn.addEventListener('click', () => {
            alert('In a full implementation, this would notify the clinic of your ETA.');
        });
    }

    if (elements.viewAllBtn && elements.allAppointmentsModal) {
        elements.viewAllBtn.addEventListener('click', () => {
            elements.allAppointmentsModal.classList.add('show');
            loadAllAppointments();
        });
    }

    if (elements.closeAppointmentsBtn && elements.allAppointmentsModal) {
        elements.closeAppointmentsBtn.addEventListener('click', () => {
            elements.allAppointmentsModal.classList.remove('show');
        });
    }

    if (elements.filterStatus && elements.searchPatient) {
        elements.filterStatus.addEventListener('change', () => {
            loadAllAppointments(elements.filterStatus.value, elements.searchPatient.value);
        });
        
        elements.searchPatient.addEventListener('input', () => {
            loadAllAppointments(elements.filterStatus.value, elements.searchPatient.value);
        });
    }

    // Initialize
    updateQueueDisplay();
    setInterval(updateQueueDisplay, 30000);
});