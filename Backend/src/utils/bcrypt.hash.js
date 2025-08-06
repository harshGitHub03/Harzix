const  bcrypt =require("bcrypt")

exports.hashPassword=async(password)=>{
    return  await bcrypt.hash(password,Number(process.env.BCRYPT_HASH_ROUNDS))
}