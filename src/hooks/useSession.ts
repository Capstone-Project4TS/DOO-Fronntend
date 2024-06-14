import useAuthStore from '../services/store/userStore';

export const useSession = () => {
    // session is the current and up to date session object i.e if you set a new session object using setSession, session will be updated to the new session object
    const session = useAuthStore(state => state.session);
    // getSession is a function that returns the current session object from localStorage i.e it get the session object from localStorage
    const getSession = useAuthStore(state => state.getSession);
    const setSession = useAuthStore(state => state.setSession);
    const deleteSession = useAuthStore(state => state.deleteSession);

    return { session, getSession, setSession, deleteSession };
};
