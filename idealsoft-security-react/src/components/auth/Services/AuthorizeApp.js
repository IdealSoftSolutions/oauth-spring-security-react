import { useNavigate } from "react-router-dom";
import { useState, useRef, intervalRef } from 'react';
import './Authorize.css';
import { useAuth } from '../auth';

export default function AuthorizeApp() {
    const POPUP_HEIGHT = 700;
    const POPUP_WIDTH = 600;
    const OAUTH_RESPONSE = 'react-use-oauth2-response';
    const CLIENT_ID = 'articles-client';
    const REDIRECT_URI = 'http://localhost:3000/callback'
    const navigate = useNavigate();
    const [{ loading, error }, setUI] = useState({ loading: false, error: null });
    const [data, setData] = useState('')

    const storedToken = localStorage.getItem('token');
    const storedData = localStorage.getItem('data');
    const storedExpire = localStorage.getItem('expire');
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    const storedIsAuthorised = localStorage.getItem('isAuthorised');

    const [token, setToken] = useState(storedToken || null);
    const [expire, setExpire] = useState(storedExpire || null);
    const [loggedInUser, setLoggedInUser] = useState(storedLoggedInUser || null)
    const [isAuthorised, setAuthorised] = useState(false)

    const popupRef = useRef();


    const validateToken = (payload) => {
        localStorage.setItem('token', payload.access_token);
        localStorage.setItem('expire', payload.expires_in);
        setToken(payload.access_token)
        setExpire(payload.expires_in)
        if (payload.access_token) {
            setAuthorised(false)
            localStorage.setItem('isAuthorised', true);
            navigate('/dashboard')
        }
        else {
            localStorage.setItem('isAuthorised', false);
            localStorage.setItem('loggedInUser', null);
            console.error('access_token is not generated');
            throw new Error('access_token is not generated')
        }

    }
    const objectToQuery = (object) => {
        return new URLSearchParams(object).toString();
    };
    const formatExchangeCodeForTokenServerURL = (
        serverUrl,
        clientId,
        code,
        redirectUri
    ) => {
        return `${serverUrl}?${objectToQuery({
            grant_type: 'authorization_code',
            client_id: clientId,
            code: code,
            redirect_uri: redirectUri,
            code_verifier: 'grF7hFRwh4XKba0DuzozQ4ZYyngrhOui7JuWIoFL7gVqyvpqelWf-MHSqnDwiMRytvqcNpS3dGp5_7x5qQpRZSuHK0Y67CA9dnOmlwPONC1tijRI8Gn8fISOI_t-tRCI'
        })}`;
    };

    const cleanup = (
        intervalRef,
        popupRef,
        handleMessageListener
    ) => {
        if (intervalRef && intervalRef.current) clearInterval(intervalRef.current);
        closePopup(popupRef);
        window.removeEventListener('message', handleMessageListener);

    };

    const closePopup = (popupRef) => {
        popupRef.current?.close();
    };

    const openPopup = (url) => {
        // To fix issues with window.screen in multi-monitor setups, the easier option is to
        // center the pop-up over the parent window.
        const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
        const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
        return window.open(
            url,
            'OAuth2 Popup',
            `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
        );
    };
    const handleClick = () => {
        // 1. Init
        setUI({
            loading: true,
            error: null,
        });



        const url = 'http://auth-server:9000/oauth2/authorize?response_type=code&client_id=articles-client&redirect_uri=http://localhost:3000/callback&scope=openid&code_challenge=9QhqHm-jSGVb3XiCS-pXxATzG5Hok-f_gXS9aLM8Rcg&code_challenge_method=S256'
        const callbackUrl = 'http://localhost:3000/callback';
        const client_id = "public-client-react-app";
        const targetUrl = `http://auth-server:9000/oauth2/authorize?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${client_id}&scope=openid%20profile`;
        popupRef.current = openPopup(
            url
        );
        async function handleMessageListener(message) {
            try {
                const type = message && message.data && message.data.type;
                if (type === OAUTH_RESPONSE) {
                    const errorMaybe = message && message.data && message.data.error;
                    if (errorMaybe) {
                        setUI({
                            loading: false,
                            error: errorMaybe || 'Unknown Error',
                        });
                    } else {
                        const code = message && message.data && message.data.payload && message.data.payload.code;
                        const tokenUrl = formatExchangeCodeForTokenServerURL(
                            'http://auth-server:9000/oauth2/token',
                            CLIENT_ID,
                            code,
                            REDIRECT_URI
                        )
                        const response = await fetch(
                            tokenUrl,
                            {
                                method: "POST",
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    "Access-Control-Allow-Origin": "*",
                                    'mode': 'cors',
                                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                                }
                            }
                        );
                        if (!response.ok) {
                            setUI({
                                loading: false,
                                error: "Failed to exchange code for token",
                            });
                        } else {
                            const payload = await response.json();
                            setUI({
                                loading: false,
                                error: null,
                            });
                            setData(payload);
                            localStorage.setItem('data', JSON.stringify(payload));
                            validateToken(payload)
                            // Lines above will cause 2 rerenders but it's fine for this tutorial :-)
                        }
                    }
                }
            } catch (genericError) {
                console.error(genericError);
                setUI({
                    loading: false,
                    error: genericError.toString(),
                });
            } finally {
                cleanup(intervalRef, popupRef, handleMessageListener);
            }
        }
        window.addEventListener('message', handleMessageListener);

        return () => {
            window.removeEventListener('message', handleMessageListener);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    };
    return (
        <div>
            <h1>Authorize the user below</h1>
            <div className="btn-container">
                <button type="submit" className="authorize" onClick={handleClick}>Click me</button>
            </div>
        </div>
    );
}