
const OAUTH_RESPONSE = 'react-use-oauth2-response';
const queryToObject = (query) => {
    const parameters = new URLSearchParams(query);
    return Object.fromEntries(parameters.entries());
};


const useEffect = () => {
    const payload = queryToObject(window.location.search.split('?')[1]);
    const error = payload && payload.error;
    if (!window.opener) {
        throw new Error('No window opener');
    }
    if (error) {
        window.opener.postMessage({
            type: OAUTH_RESPONSE,
            error: decodeURI(error) || 'OAuth error: An error has occured.',
        });
    } else {
        window.opener.postMessage({
            type: OAUTH_RESPONSE,
            payload,
        });
    }
};

const OAuthPopup = (props) => {
    const {
        Component = (
            <div style={{ margin: '12px' }} data-testid="popup-loading">
                Loading...
            </div>
        ),
    } = props;
    // On mount
    useEffect()
    return Component;
}

export default OAuthPopup;