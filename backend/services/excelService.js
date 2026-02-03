import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import lockfile from 'proper-lockfile';
import { FILE_PATHS, BACKUP_DIR, EVENT_TYPES, GFG_COLUMNS, HACKATHON_COLUMNS, MASTERCLASS_COLUMNS } from '../config/constants.js';
import { AppError } from '../utils/AppError.js';

// ---- Column Definitions ----
const getColumns = (type) => {
    if (type === EVENT_TYPES.GFG) return GFG_COLUMNS;
    if (type === EVENT_TYPES.HACKATHON) return HACKATHON_COLUMNS;
    if (type === EVENT_TYPES.MASTERCLASS) return MASTERCLASS_COLUMNS;
    return [];
};

// ---- Backup Utility ----
// Creates a timestamped copy of the Excel file for safety
const createBackup = async (filePath) => {
    try {
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
        }
        const fileName = path.basename(filePath, '.xlsx');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(BACKUP_DIR, `${fileName}_${timestamp}.xlsx`);

        await fs.promises.copyFile(filePath, backupPath);
    } catch (error) {
        console.error(`⚠️ Backup Warning: Failed to backup ${path.basename(filePath)}`, error.message);
        // We log but do not throw, so user registration isn't blocked by backup failure
    }
};

/**
 * Appends a new registration row to the specified event's Excel file.
 * Handles file creation, directory structure, locking, and backups.
 * 
 * @param {string} eventType - The type of event (GFG, HACKATHON, MASTERCLASS)
 * @param {object} data - The row data to append
 */
export const addRegistration = async (eventType, data) => {
    const filePath = FILE_PATHS[eventType];

    if (!filePath) {
        throw new AppError('Configuration Error: Invalid event type provided', 500);
    }

    // 1. Ensure Directory Exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let releaseLock;

    try {
        // 2. Initialize File if Missing
        if (!fs.existsSync(filePath)) {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Registrations');
            sheet.columns = getColumns(eventType);
            await workbook.xlsx.writeFile(filePath);
        }

        // 3. Acquire File Lock (Concurrency Safety)
        try {
            releaseLock = await lockfile.lock(filePath, {
                retries: { retries: 5, factor: 2, minTimeout: 100, maxTimeout: 1000 },
                stale: 10000 // Treat lock as stale after 10s
            });
        } catch (lockError) {
            console.error(`Lock Error on ${filePath}:`, lockError.message);
            throw new AppError('System Busy: Could not acquire file access. Please try again momentarily.', 503);
        }

        // 4. Read & Write Operation
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        let sheet = workbook.getWorksheet(1);

        // Failsafe: Re-create sheet if corrupted/missing
        if (!sheet) {
            sheet = workbook.addWorksheet('Registrations');
            sheet.columns = getColumns(eventType);
        }

        // Append Data
        data.timestamp = new Date().toLocaleString();
        sheet.addRow(data);

        // Commit to Disk
        await workbook.xlsx.writeFile(filePath);

        // 5. Create Backup
        await createBackup(filePath);

        console.log(`✅ [${eventType}] Registration saved successfully.`);

    } catch (err) {
        // Explicit EBUSY Handling
        if (err.code === 'EBUSY') {
            throw new AppError(`System Error: The file "${path.basename(filePath)}" is open in another program. Please close it and retry.`, 500);
        }
        // General Error Bubble-up
        throw err instanceof AppError ? err : new AppError(`Failed to save registration: ${err.message}`, 500);
    } finally {
        // 6. Release Lock
        if (releaseLock) {
            try {
                await releaseLock();
            } catch (e) {
                console.error('Warning: Failed to release file lock', e.message);
            }
        }
    }
};
