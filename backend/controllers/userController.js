const User = require ('../models/user.js')

const getAllUsers=async()=>{
    try{
        let allUsers= await User.find()
        if(allUsers){
            // console.log(allUsers);
            return allUsers
        }
    }catch(e){
  console.log(e);
    }
}

const getUserById = async(Id)=>{
    try{
        let user= await User.find({_id:Id})
        if(user){
            console.log(user);
            return user
        }else{
          console.log("user not exists")
        }
    }catch(e){
  console.log(e);
    }
}
const DeleteUser=async(_userId)=>{
  try{
    let Id=await User.findOne({_id:_userId})
    if(Id){
      let deleteUser= await User.deleteOne({_id:Id})
      if (deleteUser) {
        console.log('was deleted successfully');
      }else{
        console.log("this user does'nt exist");
      }
    }
  }catch(e){
     console.log(e);
  }
}
const updateUser= async(userId, _name , _email , _password , _isAdmin)=>{
 try{
    console.log(userId,_name,_email,_password);
    let data = await User.updateOne(
                { _id: userId },
                {
                  $set: {
                    name: _name,
                    email: _email,
                    password: _password,
                    isAdmin: _isAdmin
                  },
                }
              );
              console.log(data);
              return data;
 }catch(e){
    console.log(e);
 }
}
module.exports={getAllUsers ,getUserById ,DeleteUser ,updateUser}
