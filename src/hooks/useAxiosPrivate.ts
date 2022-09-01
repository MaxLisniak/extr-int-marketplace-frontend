import { axiosPrivate } from "../axios/axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { refreshAccessToken } from "../features/user/thunks";

// used to send a request with cookies inside and refresh access token when it expires
const useAxiosPrivate = () => {
    // const refresh = useRefreshToken();
    // const { auth } = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(state => state.user.accessToken);
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (config.headers) {
                    if (!config.headers['Authorization']) {
                        config.headers['Authorization'] = `Bearer ${accessToken}`
                    }
                    return config;
                }
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const thunkResponse = await dispatch(refreshAccessToken());
                    prevRequest.headers['Authorization'] = `Bearer ${thunkResponse.payload.accessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken])

    return axiosPrivate;
}

export default useAxiosPrivate;