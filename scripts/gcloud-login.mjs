import { spawn } from 'node:child_process';
import { watchFile, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const codePath = resolve('scripts/gcloud-auth-code.txt');
if (existsSync(codePath)) unlinkSync(codePath);

const child = spawn(
	'cmd.exe',
	[
		'/c',
		'C:\\Users\\mr_right\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd',
		'auth',
		'login',
		'rightpossible.com@gmail.com',
		'--no-launch-browser',
		'--force',
		'--update-adc',
	],
	{
		stdio: ['pipe', 'pipe', 'pipe'],
		windowsHide: true,
		env: process.env,
	},
);

function pipe(stream, label) {
	stream.on('data', (chunk) => {
		process.stdout.write(chunk);
	});
}

pipe(child.stdout, 'out');
pipe(child.stderr, 'err');

watchFile(codePath, { interval: 500 }, () => {
	if (!existsSync(codePath)) return;
	const code = readFileSync(codePath, 'utf8').trim();
	if (!code) return;
	console.log('Submitting verification code for rightpossible.com@gmail.com');
	child.stdin.write(`${code}\n`);
	child.stdin.end();
});

child.on('exit', (code) => {
	console.log(`gcloud login exited ${code}`);
	process.exit(code ?? 1);
});
