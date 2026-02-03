import { addRegistration } from '../services/excelService.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import { EVENT_TYPES } from '../config/constants.js';

export const registerGFG = catchAsync(async (req, res, next) => {
    const { name, college, year, branch, phone } = req.body;

    if (!name || !college || !year || !branch || !phone) {
        return next(new AppError('Missing required fields', 400));
    }

    await addRegistration(EVENT_TYPES.GFG, { name, college, year, branch, phone });

    res.status(201).json({ status: 'success', message: 'Registered for GFG Contest' });
});

export const registerMasterclass = catchAsync(async (req, res, next) => {
    const { name, college, year, branch } = req.body;

    if (!name || !college || !year || !branch) {
        return next(new AppError('Missing required fields', 400));
    }

    await addRegistration(EVENT_TYPES.MASTERCLASS, { name, college, year, branch });

    res.status(201).json({ status: 'success', message: 'Registered for Masterclass' });
});

export const registerHackathon = catchAsync(async (req, res, next) => {
    const { teamName, teamSize, members } = req.body;

    if (!teamName || !teamSize || !members || !Array.isArray(members)) {
        return next(new AppError('Invalid team data', 400));
    }

    // Flatten logic: Maps team members to wide columns
    const rowData = {
        teamName,
        teamSize,
        leaderName: members[0]?.name || '',
    };

    members.forEach((m, idx) => {
        const i = idx + 1;
        if (i > 4) return; // DB schema limits to 4 members
        rowData[`m${i}_name`] = m.name;
        rowData[`m${i}_college`] = m.college;
        rowData[`m${i}_year`] = m.year;
        rowData[`m${i}_branch`] = m.branch;
    });

    await addRegistration(EVENT_TYPES.HACKATHON, rowData);

    res.status(201).json({ status: 'success', message: 'Registered for Hackathon' });
});
