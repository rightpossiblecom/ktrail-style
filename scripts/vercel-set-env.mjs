import { readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const env = {};
for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
	const index = line.indexOf('=');
	if (index > 0) env[line.slice(0, index)] = line.slice(index + 1);
}

const keys = ['KTRAIL_GCP_PROJECT', 'KTRAIL_WEB_API_KEY', 'KTRAIL_SESSION_SECRET', 'KTRAIL_SERVICE_ACCOUNT'];

function run(args, input) {
	return new Promise((resolve, reject) => {
		const child = spawn('vercel', args, { shell: true, stdio: ['pipe', 'inherit', 'inherit'] });
		if (input) child.stdin.end(input);
		else child.stdin.end();
		child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(args.join(' ')))));
	});
}

for (const key of keys) {
	for (const target of ['production', 'preview', 'development']) {
		console.log('set', key, target);
		try {
			await run(['env', 'add', key, target, '--yes'], env[key]);
		} catch {
			console.log('skip or exists', key, target);
		}
	}
}
