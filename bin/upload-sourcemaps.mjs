#!/usr/bin/env zx

import 'zx/globals';

$.verbose = true;

// datadog-ci needs these env variables to be set.
// We have them namespaced under VITE_ in .env and in Netlify config,
// but that's not good enough
process.env.DATADOG_API_KEY = process.env.VITE_DATADOG_API_KEY;
process.env.DATADOG_SITE = process.env.VITE_DATADOG_SITE;

const gitRev = await $`git rev-parse HEAD`;

const uploadArgs = [
	// The location of the runtime JS assets
	'./dist/assets',
	// The path to the source maps
	`--minified-path-prefix=/assets/`,
	`--release-version=${gitRev}`,
	'--service=test',
];

try {
	await $`datadog-ci sourcemaps upload ${uploadArgs}`;
} catch (error) {
	console.error('Error uploading sourcemaps:', error);
	process.exit(1);
}
