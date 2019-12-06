# App Deployed On Heroku Follow The Link Below:
https://eza-plus.herokuapp.com

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# EZA+
EZA+ web app

# Tables:

User { id,first_name,last_name,email,password,deleted}

Role{id,name}

User_role{id,user_id,role_id}

Group{id,name,created_by}

Group_user{id,user_id,group_id,pending}

Post{id,user_id,group_id,message,(likes,dislike),created_at,deleted(bool),
read(bool)}

Reply{id,user_id,group_id,message,(likes,dislike),created_at,deleted(bool),post_id}

resource{id,user_id,group_id,data}

notification{id,user_id,group_id,post_id}

