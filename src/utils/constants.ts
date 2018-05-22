export class Constants {
    public static URL: string = 'https://avisemecar.herokuapp.com';
    // public static URL: string = 'http://localhost:5000';
    public static VERSION: string = 'v1';
    public static user = {
        update: '/user',
        getInformation: '/user/{0}',
        register: '/user',
        changePassword: '/user/changePassword'
    };
    public static vehicle = {
        delete: '/vehicle/{0}',
        getAll: '/vehicle/{0}',
        update: '/vehicle',
        register: '/vehicle',
        get: '/vehicle/board/{0}/{1}'
    };
    public static score = {
        getAll: '/score/{0}',
        register: '/score'
    };
    public static auth = {
        login: '/auth',
        resetPassword:'/auth/resetPassword'
    }
    public static notification = {
        register: '/notification',
        getSend: '/notification/send/{0}',
        getReceive: '/notification/receive/{0}'
    }
}
