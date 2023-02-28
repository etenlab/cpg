export default class AppRoutes {
    static get home() {
        return '/home'
    }
    static get notifications() {
        return '/notifications'
    }
    static get discussionDetail() {
        return '/notifications/:id'
    }
    static get discussions() {
        return '/discussions'
    }
}