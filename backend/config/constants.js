import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
export const BACKUP_DIR = path.join(__dirname, '../data/backups');

export const FILE_PATHS = {
    GFG: path.join(DATA_DIR, 'contest.xlsx'),
    HACKATHON: path.join(DATA_DIR, 'hackathon.xlsx'),
    MASTERCLASS: path.join(DATA_DIR, 'masterclass.xlsx')
};

export const EVENT_TYPES = {
    GFG: 'GFG',
    HACKATHON: 'HACKATHON',
    MASTERCLASS: 'MASTERCLASS'
};

export const GFG_COLUMNS = [
    { header: 'Full Name', key: 'name', width: 25 },
    { header: 'College', key: 'college', width: 25 },
    { header: 'Year', key: 'year', width: 10 },
    { header: 'Branch', key: 'branch', width: 15 },
    { header: 'Phone', key: 'phone', width: 15 },
    { header: 'Registered At', key: 'timestamp', width: 20 }
];

export const MASTERCLASS_COLUMNS = [
    { header: 'Full Name', key: 'name', width: 25 },
    { header: 'College', key: 'college', width: 25 },
    { header: 'Year', key: 'year', width: 10 },
    { header: 'Branch', key: 'branch', width: 15 },
    { header: 'Registered At', key: 'timestamp', width: 20 }
];

export const HACKATHON_COLUMNS = [
    { header: 'Team Name', key: 'teamName', width: 25 },
    { header: 'Team Size', key: 'teamSize', width: 10 },
    { header: 'Leader Name', key: 'leaderName', width: 20 },
    { header: 'Member 1 Name', key: 'm1_name', width: 20 },
    { header: 'Member 1 College', key: 'm1_college', width: 20 },
    { header: 'Member 1 Year', key: 'm1_year', width: 10 },
    { header: 'Member 1 Branch', key: 'm1_branch', width: 15 },

    { header: 'Member 2 Name', key: 'm2_name', width: 20 },
    { header: 'Member 2 College', key: 'm2_college', width: 20 },
    { header: 'Member 2 Year', key: 'm2_year', width: 10 },
    { header: 'Member 2 Branch', key: 'm2_branch', width: 15 },

    { header: 'Member 3 Name', key: 'm3_name', width: 20 },
    { header: 'Member 3 College', key: 'm3_college', width: 20 },
    { header: 'Member 3 Year', key: 'm3_year', width: 10 },
    { header: 'Member 3 Branch', key: 'm3_branch', width: 15 },

    { header: 'Member 4 Name', key: 'm4_name', width: 20 },
    { header: 'Member 4 College', key: 'm4_college', width: 20 },
    { header: 'Member 4 Year', key: 'm4_year', width: 10 },
    { header: 'Member 4 Branch', key: 'm4_branch', width: 15 },

    { header: 'Registered At', key: 'timestamp', width: 20 }
];
