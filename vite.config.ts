import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes('node_modules/@datadog')) {
							return 'datadog';
						}
						if (id.includes('node_modules')) {
							return 'vendor';
						}
					},
				},
			},
			sourcemap: true,
		},
	};
});
