import { initializeDatabase, addAppointment, getUpcomingAppointments } from './db.js';

document.addEventListener('DOMContentLoaded', async() => {
    console.log('[Booking] Initializing DB...');
    await initializeDatabase();
    console.log('[Booking] DB initialized!');

    const bookingForm = document.getElementById('booking-form');
    const bookingSlipModal = document.getElementById('booking-slip-modal');
    const closeSlipBtn = document.getElementById('close-slip');
    const downloadSlipBtn = document.getElementById('download-slip');
    const printSlipBtn = document.getElementById('print-slip');
    const cancelBookingBtn = document.getElementById('cancel-booking');

    // Generate HH-XXXX ID
    const generateAppointmentId = () => {
        return `HH-${Math.floor(1000 + Math.random() * 9000)}`;
    };

    // Calculate appointment time based on queue
    const calculateAppointmentTime = async () => {
        const upcoming = await getUpcomingAppointments();
        const now = new Date();
        
        if (upcoming.length === 0) {
            // If no appointments, schedule in 15 minutes
            now.setMinutes(now.getMinutes() + 15);
            return now;
        } else {
            // Get the last appointment time and add 20 minutes
            const lastAppointmentTime = new Date(upcoming[upcoming.length - 1].datetime);
            lastAppointmentTime.setMinutes(lastAppointmentTime.getMinutes() + 20);
            return lastAppointmentTime;
        }
    };

    // Generate the booking slip
    const generateBookingSlip = (appointment) => {
        document.getElementById('slip-id').textContent = appointment.id;
        document.getElementById('slip-name').textContent = appointment.patientName;
        document.getElementById('slip-age-blood').textContent = `${appointment.patientAge} / ${appointment.patientBloodGroup}`;
        document.getElementById('slip-service').textContent = appointment.service;
        
        const appointmentTime = new Date(appointment.datetime);
        document.getElementById('slip-datetime').textContent = 
            `${appointmentTime.toLocaleDateString()} at ${appointmentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
        document.getElementById('slip-queue').textContent = `#${appointment.queuePosition}`;
        document.getElementById('slip-amount').textContent = `$${appointment.paymentAmount.toFixed(2)}`;
    };

    // Handle form submission
    console.log('[Booking] Form submitted!');
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const patientName = document.getElementById('patient-name').value;
        const patientAge = document.getElementById('patient-age').value;
        const patientBloodGroup = document.getElementById('patient-blood-group').value;
        const patientPhone = document.getElementById('patient-phone').value;
        const appointmentType = document.getElementById('appointment-type').value;
        const bookingType = document.querySelector('input[name="booking-type"]:checked').value;
        const paymentAmount = parseFloat(document.getElementById('payment-amount').value) || 0;
        
        // Generate appointment data
        const appointmentId = generateAppointmentId();
        const appointmentTime = await calculateAppointmentTime();
        const upcoming = await getUpcomingAppointments();
        const queuePosition = upcoming.length + 1;
        
        const appointment = {
            id: appointmentId,
            patientName,
            patientAge,
            patientBloodGroup,
            patientPhone,
            service: appointmentType,
            bookingType,
            paymentAmount,
            datetime: appointmentTime.toISOString(),
            queuePosition,
            status: 'waiting',
            priority: bookingType === 'walk-in' ? 'routine' : 
                    appointmentType === 'Urgent Care' ? 'urgent' : 
                    appointmentType === 'Follow-Up' ? 'followup' : 'routine',
            createdAt: new Date().toISOString()
        };
        
        try {
            // Add to database
            await addAppointment(appointment);
            console.log('[Booking] Adding appointment:', appointment);

            // Generate and show slip
            generateBookingSlip(appointment);
            bookingSlipModal.classList.add('show');
            
            // Reset form
            bookingForm.reset();
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment. Please try again.');
        }
    });

    // Close slip modal
    closeSlipBtn.addEventListener('click', () => {
        bookingSlipModal.classList.remove('show');
        window.location.href = 'queue.html';
    });

    // Download slip
    downloadSlipBtn.addEventListener('click', () => {
        // In a real implementation, use html2canvas or jsPDF
        alert('In a full implementation, this would download the slip as a PDF or image.');
    });

    // Print slip
    printSlipBtn.addEventListener('click', () => {
        window.print();
    });

    // Cancel booking
    cancelBookingBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            window.location.href = 'index.html';
        }
    });
});
