docReady(function () {
    const app = Vue.createApp({
        setup() {
            const leftDrawer = Vue.ref(false)
            const rightDrawer = Vue.ref(false)
            const darkMode = Vue.ref(Quasar.LocalStorage.getItem('darkMode') || false)
            Quasar.Dark.set(darkMode.value)
            return {
                leftDrawer, rightDrawer,
                toggleLeftDrawer() {
                    leftDrawer.value = !leftDrawer.value
                },
                toggleRightDrawer() {
                    rightDrawer.value = !rightDrawer.value
                },
                darkMode,
                toggleDark() {
                    darkMode.value = !darkMode.value
                    Quasar.Dark.set(darkMode.value)
                    Quasar.LocalStorage.set('darkMode', darkMode.value)
                },
                modeLight() {
                    darkMode.value = false
                    Quasar.Dark.set(false)
                    Quasar.LocalStorage.set('darkMode', false)
                },
                modeDark() {
                    darkMode.value = true
                    Quasar.Dark.set(true)
                    Quasar.LocalStorage.set('darkMode', true)
                }
            }
        },
        mounted() {
            document.getElementById("q-app").removeAttribute("data-loading");
            if (Quasar.Cookies.has('gdpr') !== true) {
                const policyUrl = '/cookie/'
                Quasar.Notify.create({
                    message: 'Our third-party tools use cookies, which are necessary for its functioning' +
                        ' and required to achieve the purposes illustrated in the cookie policy.',
                    multiline: true,
                    classes: 'gdpr',
                    timeout: 0,
                    position: 'bottom-right',
                    actions: [
                        {
                            label: 'Accept',
                            color: 'yellow',
                            handler() {
                                Quasar.Cookies.set('gdpr', true, { expires: 5 * 365 })
                            }
                        },
                        {
                            label: 'Learn more',
                            color: 'grey',
                            noDismiss: true,
                            handler() {
                                window.location.replace(policyUrl)
                            }
                        }
                    ]
                })
            }
            timeago.render(document.querySelectorAll('.timeago'));
        }
    })
    app.use(Quasar)
    app.mount('#q-app')
});