import { readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const env = {};
for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
	const index = line.indexOf('=');
	if (index > 0) env[line.slice(0, index)] = line.slice(index + 1);
}

const args = [
	'--prod',
	'--yes',
	'-e',
	`KTRAIL_GCP_PROJECT=${env.KTRAIL_GCP_PROJECT}`,
	'-e',
	`KTRAIL_WEB_API_KEY=${env.KTRAIL_WEB_API_KEY}`,
	'-e',
	`KTRAIL_SESSION_SECRET=${env.KTRAIL_SESSION_SECRET}`,
	'-e',
	`KTRAIL_SERVICE_ACCOUNT=${env.KTRAIL_SERVICE_ACCOUNT}`,
];

const child = spawn('vercel', args, { stdio: 'inherit', shell: true });
child.on('exit', (code) => process.exit(code ?? 1));
