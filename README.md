# EZA+
EZA+ web app

<<<<<<< HEAD
Tables:

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

=======
## Run Through Terminal By:
### - npm run dev
>>>>>>> 80671579af355e8ceb396ed43f97b4801a967103
