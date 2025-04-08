import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: import.meta.env.VITE_DATADOG_APPLICATION_ID,
    clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
    site: import.meta.env.VITE_DATADOG_SITE,
    service: import.meta.env.VITE_DATADOG_SERVICE,
    env: import.meta.env.MODE === 'development' ? 'local' : 'production',
    // Specify a version number to identify the deployed version of your application in Datadog
    version: import.meta.env.VITE_GIT_VERSION,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    defaultPrivacyLevel: 'mask-user-input',
		trackResources: true,

		beforeSend: (event) => {
			if (event.type === 'error' && event.error.type === 'AbortError') {
				console.log(event.source);
				return false
			}
			return true
		}
});


export { datadogRum as datadog }
