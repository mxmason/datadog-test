#!/usr/bin/env zx

import 'zx/globals';

$.verbose = true;

process.env.DATADOG_API_KEY = process.env.VITE_DATADOG_API_KEY;
process.env.DATADOG_SITE = process.env.VITE_DATADOG_SITE;

const gitRev = await $`git rev-parse HEAD`;

const ddCIFlags = [
	`--minified-path-prefix=/assets/`,
	`--release-version=${gitRev}`,
	'--service=test',
];

try {
	await $`datadog-ci sourcemaps upload ./dist/assets ${ddCIFlags}`;
} catch (error) {
	console.error('Error uploading sourcemaps:', error);
	process.exit(1);
}
