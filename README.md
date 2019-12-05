# EZA+
EZA+ web app

# APIs and Backing Service Used:
1) MongoDB
2) Cloudinary
3) NodeMailer
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

