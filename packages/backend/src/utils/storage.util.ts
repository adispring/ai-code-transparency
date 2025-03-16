import * as fs from 'fs/promises';
import * as path from 'path';

const DATABASE_DIR = path.join(__dirname, '../../database');
const FORM_DATA_FILE = path.join(DATABASE_DIR, 'form-data.json');

export async function ensureDirectory() {
  try {
    await fs.access(DATABASE_DIR);
  } catch {
    await fs.mkdir(DATABASE_DIR, { recursive: true });
  }
}

export async function saveFormData(data: any) {
  await ensureDirectory();
  await fs.writeFile(FORM_DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getFormData() {
  try {
    await ensureDirectory();
    const data = await fs.readFile(FORM_DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}
