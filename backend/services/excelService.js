import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { FILE_PATHS, EVENT_TYPES, GFG_COLUMNS, HACKATHON_COLUMNS, MASTERCLASS_COLUMNS } from '../config/constants.js';
import { AppError } from '../utils/AppError.js';

const getColumns = (type) => {
    if (type === EVENT_TYPES.GFG) return GFG_COLUMNS;
    if (type === EVENT_TYPES.HACKATHON) return HACKATHON_COLUMNS;
    if (type === EVENT_TYPES.MASTERCLASS) return MASTERCLASS_COLUMNS;
    return [];
};

export const addRegistration = async (eventType, data) => {
    const rawPath = FILE_PATHS[eventType];
    if (!rawPath) throw new AppError('Invalid event type', 500);

    const filePath = path.resolve(rawPath);
    const dir = path.dirname(filePath);

    // Ensure Directory
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
        const workbook = new ExcelJS.Workbook();
        let sheet;

        const fileExists = fs.existsSync(filePath);
        const colDefinitions = getColumns(eventType);

        // Initialize file if new
        if (!fileExists) {
            console.log(`[Excel] Creating new file: ${path.basename(filePath)}`);
            sheet = workbook.addWorksheet('Registrations');
            sheet.columns = colDefinitions;
            await workbook.xlsx.writeFile(filePath);
        }

        await workbook.xlsx.readFile(filePath);

        sheet = workbook.getWorksheet(1);
        if (!sheet) {
            sheet = workbook.addWorksheet('Registrations');
        }

        // Essential: Re-bind columns to ensure object mapping works correctly
        sheet.columns = colDefinitions;

        // Append Data
        data.timestamp = new Date().toLocaleString();
        sheet.addRow(data);

        // Save
        await workbook.xlsx.writeFile(filePath);
        console.log(`[Excel] Row appended to ${path.basename(filePath)}`);

    } catch (err) {
        console.error(`[Excel Error] ${err.message}`);
        if (err.code === 'EBUSY') {
            throw new AppError(`System Error: File "${path.basename(filePath)}" is locked. Please close it.`, 500);
        }
        throw new AppError(`Failed to save data: ${err.message}`, 500);
    }
};
