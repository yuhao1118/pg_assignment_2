const fake_users = {
    public : [
        {   
            username : 'DemoUser1',
            userId : 'demo_user_1',
            avatar : './images/avatar_1.jfif',
            about : 'I am demo user 1',
            publishes : []
        },
        {
            username : 'DemoUser2',
            userId : 'demo_user_2',
            avatar : './images/avatar_2.jfif',
            about : 'I am demo user 2',
            publishes : []
        }
    ],
    private : [
        {
            username : 'DemoUser1',
            userId : 'demo_user_1',
            password : '123456',
            email : 'test@durham.ac.uk'
        },
        {
            username : 'DemoUser2',
            userId : 'demo_user_2',
            password : '123456',
            email : 'test@durham.ac.uk'
        }
    ]
}

module.exports = fake_users;