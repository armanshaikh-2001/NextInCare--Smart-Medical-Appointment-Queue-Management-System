 // Initialize IndexedDB
let db;
const DB_NAME = 'HealthHavenDB';
const DB_VERSION = 1;
const APPOINTMENT_STORE = 'appointments';

const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject('Database error');
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Create appointments store if it doesn't exist
            if (!db.objectStoreNames.contains(APPOINTMENT_STORE)) {
                const store = db.createObjectStore(APPOINTMENT_STORE, { 
                    keyPath: 'id',
                    autoIncrement: true
                });
                
                // Create indexes for efficient querying
                store.createIndex('status', 'status', { unique: false });
                store.createIndex('datetime', 'datetime', { unique: false });
                store.createIndex('patientName', 'patientName', { unique: false });
            }
        };
        
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };
    });
};

// CRUD Operations
const addAppointment = (appointment) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([APPOINTMENT_STORE], 'readwrite');
        const store = transaction.objectStore(APPOINTMENT_STORE);
        
        const request = store.add(appointment);
        
        request.onerror = (event) => {
            reject('Error adding appointment');
        };
        
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
};

const updateAppointment = (id, updates) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([APPOINTMENT_STORE], 'readwrite');
        const store = transaction.objectStore(APPOINTMENT_STORE);
        
        const getRequest = store.get(id);
        
        getRequest.onerror = (event) => {
            reject('Error getting appointment');
        };
        
        getRequest.onsuccess = (event) => {
            const appointment = event.target.result;
            if (!appointment) {
                reject('Appointment not found');
                return;
            }
            
            const updatedAppointment = { ...appointment, ...updates };
            const putRequest = store.put(updatedAppointment);
            
            putRequest.onerror = (event) => {
                reject('Error updating appointment');
            };
            
            putRequest.onsuccess = (event) => {
                resolve(event.target.result);
            };
        };
    });
};

const deleteAppointment = (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([APPOINTMENT_STORE], 'readwrite');
        const store = transaction.objectStore(APPOINTMENT_STORE);
        
        const request = store.delete(id);
        
        request.onerror = (event) => {
            reject('Error deleting appointment');
        };
        
        request.onsuccess = (event) => {
            resolve(true);
        };
    });
};

const getAppointment = (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([APPOINTMENT_STORE], 'readonly');
        const store = transaction.objectStore(APPOINTMENT_STORE);
        
        const request = store.get(id);
        
        request.onerror = (event) => {
            reject('Error getting appointment');
        };
        
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
};

const getAllAppointments = () => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([APPOINTMENT_STORE], 'readonly');
        const store = transaction.objectStore(APPOINTMENT_STORE);
        
        const request = store.getAll();
        
        request.onerror = (event) => {
            reject('Error getting all appointments');
        };
        
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
};

const getAppointmentsByStatus = (status) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([APPOINTMENT_STORE], 'readonly');
        const store = transaction.objectStore(APPOINTMENT_STORE);
        const index = store.index('status');
        
        const request = index.getAll(status);
        
        request.onerror = (event) => {
            reject('Error getting appointments by status');
        };
        
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
};

const getUpcomingAppointments = (limit = 5) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([APPOINTMENT_STORE], 'readonly');
        const store = transaction.objectStore(APPOINTMENT_STORE);
        const index = store.index('datetime');
        
        const range = IDBKeyRange.lowerBound(new Date().toISOString());
        const request = index.openCursor(range);
        
        const results = [];
        
        request.onerror = (event) => {
            reject('Error getting upcoming appointments');
        };
        
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor && results.length < limit) {
                if (cursor.value.status === 'waiting') {
                    results.push(cursor.value);
                }
                cursor.continue();
            } else {
                resolve(results);
            }
        };
    });
};

const getCurrentAppointment = () => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([APPOINTMENT_STORE], 'readonly');
        const store = transaction.objectStore(APPOINTMENT_STORE);
        const index = store.index('status');
        
        const request = index.get('in-progress');
        
        request.onerror = (event) => {
            reject('Error getting current appointment');
        };
        
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
};

// Initialize the database when the script loads
const initializeDatabase = async () => {
    db = await initDB();
    console.log('Database initialized successfully');
};

export { 
    db,
    initializeDatabase,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointment,
    getAllAppointments,
    getAppointmentsByStatus,
    getUpcomingAppointments,
    getCurrentAppointment
};
