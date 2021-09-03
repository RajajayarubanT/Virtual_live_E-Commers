INSTA TREKKNIG:

    Description:
        * a instagram which have same functions like adding like, commends.
        *Language used in these APIs are JavaScript(JS),
            NodeJS(Framework), ExpressJS(Framework), ReactJS(Frontend), MongoDB(DataBase).

    Installation:
        *Nodejs  ( https://nodejs.org/en/download/ )
        *MongoDB ( https://www.mongodb.com/try/download/community )


    CLOUDINARY DataBase:
        *In this I have use this method in Frontend in REACTJS*
        Method: POST,
        Parameters: input photo to upload in CLOUDINARY,

        *For more DOCS of CLOUDINARY*
            Uploading a file:
                ( https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)



    USER SCHEMA:
        *It contains name, email, password, pic, resetToken, expireToken.*
        *All items types are  STRING except expireToken: Date *
        *In pic if user dosen't upload profile then default will be upload to CLOUDINARY DataBase(for all media files)*
        *These schemas are exported in "users" = collection in DataBase *

    POST SCHEMA:
        *It contains location, body, photo, likes, comments, postedBy.*
        *All items types are  STRING except likes and postedBy *
        *like and postedBy types are ObjectId*
        *In comments item it also contains postedBy*
        * These schemas are exported in "posts" = collection in DataBase *


    User Auth APIs:

        /signup:

            Method: POST,
            Parameters: name, email, password, profile(pic),
            *After getting thes Parameters from users this API will give a JSON response("user successfully saved")*

            Password Hashing:
                *bcrypt is used to hash password*
                => "bcrypt.hash(password, 12)"
                    password: hashedPass (save password string as hashed string)
                    user.save() = will save those details in DataBase


        /signin:

            Method: POST,
            Parameters: email, password.
            *After getting thes Parameters from users this API will give a JSON response("user successfully saved")*

            Password Hashing:
                *bcrypt is used to hash password*
                => "bcrypt.compare(password,savedUser.password)"

                *And create TOKEN for an User*
                => "const token = jwt.sign({_id: savedUser._id},JWT_SECRET)"

                *And store the users details in savedUser*
                => "const {_id,name,email,pic} = savedUser"

                *After getting thes Parameters and function Done it give a JSON response of user's TOKEN, UserDetails*
                => "res.json({token,user:{_id,name,email,pic}})"

                if these above process dosen't Done then it will throught error in console

        /reset-password:

            Method: POST,
            Parameters: token, email,
            TOKEN:
                *In this token this API will create random string with 32 bites*
                =>"crypto.randomBytes(32,(err,buffer)=>{ function }"

                *And store random string in token const variable*
                =>"const token = buffer.toString("hex")"
                
                *And store this above token in resetToken*
                =>"user.resetToken = token"

                *For expire the above Token*
                =>"user.expireToken = Date.now() + 3600000"

                *And it will sent E-MAIL to this user with that token linked url to change Password*
                =>"mg.messages().send(data, function (error, body) { function }"

            *After getting thes Parameters from users this API will give a JSON response("check your email")*
            =>"res.json({message:"check your email"})"

            *To change password use that url*
            =>"http://localhost:3000/reset/${token}" 

        /new-password:

            Method: POST,
            Parameters: sentToken, newPassword,

            sentToken:
                *this sent token is to be compare to resetToken in DataBase and after compared it will expired*
                =>"User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})"

            newPassword:
                *this will get the new password from user and to be hashed and saved in DataBase*
                =>"bcrypt.hash(newPassword,12).then(hashedpassword=>{ user.password = hashedpassword }"

                *After the above process Done it will sent JSON response*
                =>"res.json({message:"password updated successfully"})"

        requireLogin:

            //This API is a module to verify user Logedin//
            *It will check in header though he has jwt token*
            =>"jwt.verify(token,JWT_SECRET,(err,payload)=>{ function }"

            *And it will check the user _id in localStorage*
            =>"User.findById(_id).then(userdata=>{ req.user = userdata }"

        /users/:id:
            *To run this API user need to be Logedin*
            =>"router.get('/users/:id',requireLogin,(req,res)=>{ function }"

            Method: GET,
            Parameters: _id(automatically taken from params object)
            =>"req.params.id"

            _id:
                *It will check the _id from the url to DataBase*
                =>"User.findOne({_id:req.params.id})"

                *Fect the User of the Post from DataBase with Post Schema*
                =>"Post.find({postedBy:req.params.id})"

                *After all process done it will sent JSON response of the user and view thier post*
                =>" res.json({user,posts})"

                              POST DOCS


    Post Features APIs:

    To VIEW ALL THE POST 
        /allpost:
            Method: GET,
            *requireLogin*,

            *To view all post*
            =>{Post.find()}

            *And it will sent JSON response*
            =>{res.json({posts})}

    To Create POST:
        *photo will uploaded in CLOUDINARY DataBase to speedup server*
        /createpost:
            Method: POST,
            Parameters: location, body, pic,
            =>"const {location,body,pic} = req.body"

            *And save the details get from user to be saved in DataBase as Array(post)*
            =>"post.save().then(result=>{}"

            *And sent a JSON response*
            =>"res.json({post:result})"

    To VIEW Logedin user's post:
        /mypost:
            *requireLogin*,
            Method: GET,
            Parameters: user._id,

            *To find the Logedin user's post*
            =>"Post.find({postedBy:req.user._id})"

            *JSON response*
            =>"res.json({mypost})"

    To ADD LIKE to any post:
        /like:
            *requireLogin*,
            Method: PUT,
            Parameters: Just call it to add a like to post,

            *method to add a like to a post using $PUSH*
            =>"Post.findByIdAndUpdate(req.body.postId,{$push:{likes:req.user._id}}"

            *if above functions has done then it gives JSON response*
            =>"res.json(result)"
    
    To Remove LIKE to any post:
        /unlike:
            *requireLogin*,
            Method: PUT,
            Parameters: Just call this API to add a like to post,

            *method to add a like to a post using $PULL*
            =>"Post.findByIdAndUpdate(req.body.postId,{$pull:{likes:req.user._id}}"

            *if above functions has done then it gives JSON response*
            =>"res.json(result)"

    To ADD COMMENT to any post:
        /comment:
            *requireLogin*,
            Method: PUT,
            Parameters: text(req.body.text),postedBy(req.user._id),

            *method to add a comment to a post using $PULL*
            =>"Post.findByIdAndUpdate(req.body.postId,{$push:{comments:comment}}"

            *if above functions has done then it gives JSON response*
            =>"res.json(result)"


    To DELETE Post of Logedin User:
        /deletepost/:postId:
            *requireLogin*
            Method: DELETE,
            Parameters: postId(req.params.postId) ,

            *To find the post of the post*
            =>"Post.findOne({_id:req.params.postId})"

            *Verify the user of seleted post to be deleted*
            =>"if(post.postedBy._id.toString() === req.user._id.toString()){ functions }"

            *To delete the finded post*
            =>"post.remove()"

            *JSON response*
            =>"res.json(result)"

    To SEARCH the post by location(keyword):
        /searchString:
            Method: POST,
            Parameters: searching location( RegExp(req.body.query) ),

            *To find the keyword in post details in DataBase*
            =>"Post.find({location:{$regex:searchPattern}})"

            *JSON response*
            =>"res.json({result})"

    