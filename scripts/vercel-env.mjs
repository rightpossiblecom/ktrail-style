import { readFileSync } from 'node:fs';

const auth = JSON.parse(
	readFileSync('C:/Users/mr_right/AppData/Roaming/com.vercel.cli/Data/auth.json', 'utf8'),
);
const token = auth.token || auth.accessToken || auth.authToken;
if (!token) {
	console.log('no vercel token keys', Object.keys(auth));
	process.exit(1);
}

async function api(path) {
	const res = await fetch(`https://api.vercel.com${path}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	const json = await res.json();
	return { status: res.status, json };
}

const user = await api('/v2/user');
console.log('user', user.status, user.json.user?.username || user.json.error?.code);
const teams = await api('/v2/teams');
console.log(
	'teams',
	(teams.json.teams || []).map((team) => team.slug),
);
for (const team of teams.json.teams || []) {
	const projects = await api(`/v9/projects?teamId=${team.id}&search=ktrail`);
	const names = (projects.json.projects || []).map((project) => project.name);
	if (names.length) console.log(team.slug, names);
}
const personal = await api('/v9/projects?search=ktrail');
console.log(
	'personal ktrail',
	(personal.json.projects || []).map((project) => project.name),
);
