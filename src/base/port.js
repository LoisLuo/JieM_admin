export default {
   
    server: "http://39.105.130.90:80",
    // server: "http://127.0.0.1:3001",
    base: {
        login: "/admin/login",
        get_manager_of_token:"/admin/manager/get_manager_of_token",
        edit_id_and_password:"/admin/manager/edit_id_and_password",
        upload: "/admin/upload",
        setConfig: "/admin/config",
        getConfig: "/admin/config",
        checkLogin:"/admin/checkLogin",
        navList:"/admin/navList"
    },
    content: {
        content_sort: {
            list: "/admin/content_sort/sortList",
            create: "/admin/content_sort/createSort",
            remove: "/admin/content_sort/removeSort",
            update: "/admin/content_sort/updateSort",
            order: "/admin/content_sort/orderSort"

        },
        create: "/admin/content/create",
        update: "/admin/content/update",
        remove: "/admin/content/remove",
        show: "/admin/content/show",
        comment: "/admin/content/comment",
        list: "/admin/content/admin_list",
        getOne: "/admin/content/getone"
    },
    video: {
        list: "/admin/video/admin_list",
        create: "/admin/video/create",
        remove: "/admin/video/remove",
        update: "/admin/video/update",
    },
    emergencies: {
        list: "/admin/isEmergencies/admin_list",
        create: "/admin/isEmergencies/create",
        remove: "/admin/isEmergencies/remove",
        update: "/admin/isEmergencies/update",
    },
    simple_page: {
        list: "/admin/simple_page/list",
        create: "/admin/simple_page/create",
        remove: "/admin/simple_page/remove",
        update: "/admin/simple_page/update"
    },
    channel: {
        conList:"/admin/channel/admin_con_list",
        list: "/admin/channel/list",
        create: "/admin/channel/create",
        remove: "/admin/channel/remove",
        update: "/admin/channel/update",
        order: "/admin/channel/order",
        getModuleTree: "/admin/channel/get_module_tree"
    },
    ad: {
        list: "/admin/ad/list",
        create: "/admin/ad/create",
        remove: "/admin/ad/remove",
        update: "/admin/ad/update"
    },
    manager:{
        list: "/admin/manager/list",
        create: "/admin/manager/create",
        remove: "/admin/manager/remove",
        update: "/admin/manager/update"
    },
    user:{
        list: "/admin/user/list",
        create: "/admin/user/create",
        remove: "/admin/user/remove",
        update: "/admin/user/update"
    },
    charts:{
        content_sort_count:"/admin/chart/pic_content_sort_count",
        content_sort_hits:"/admin/chart/pic_sort_hits"
    },
    Book:{
        addBook:'/admin/book/addbook'
    },
    sort:{
        create:'/admin/sort/create',
        list:'/admin/sort/list',
        conList:'/admin/sort/admin_con_list',
        remove:'/admin/sort/remove',
        update:'/admin/sort/update'
    }
}