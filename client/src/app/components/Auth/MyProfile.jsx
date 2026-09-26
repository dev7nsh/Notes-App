import { AuthContext } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export const MyProfile = () => {
    const{AuthData,getprofile,deleteaccount,Authdispatch,profileupdate} = useContext(AuthContext)
    const [userProfile, setUserProfile] = useState({});
    const [ProfileModal, setProfileModal] = useState(false);
    const [Updatedprofile,Updateprofile] = useState({})
    const router = useRouter()
    const UserData = AuthData
    async function getUserprofile(authData) {
        try {
        const data = await getprofile(authData)
        setUserProfile({ ...data.myprofile})
        console.log(data);
        } catch (error) {
        console.log(error);
        }
        
    }


    async function handelupdateprofile(authdata,data) {
      try {
        const status =  await profileupdate(authdata,{
          username:data.username||userProfile.username,
          email:data.email||userProfile.email,
          ProfilePicture:data.ProfilePicture||userProfile.ProfilePicture
        })
        
         if(status==200){
          await getUserprofile(authdata)
          Authdispatch({
            type: "UPDATE_PROFILE",
            payload: data.ProfilePicture
          })
         }
        
      } catch (error) {
        console.log(error);
      }
    }

    async function handeldelete(authdata) {
      try {
        const status = await deleteaccount(authdata)
        if(status==200){
          dispatch({
            type:"SIGN_OUT"
          })
          router.push("/")
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
         getUserprofile(UserData)
    },[])
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="card-title">UserName:{userProfile.Name}</h3>
              <img
        src={`${AuthData?.profilepic || "https://via.placeholder.com/30"}`}
        alt="Profile"
        className="rounded-circle"
        width="200"
        height="200"
        style={{marginRight:"40px"}}
      />
              <p className="card-text mt-4">Email: {userProfile.email}</p>


<br />
<br />
<button className='btn btn-success' onClick={()=>{
  setProfileModal(true)
}}>Update Profile</button>
<button className='btn btn-danger ms-2' onClick={()=>{
  handeldelete(UserData)
}}>Delete Profile</button>
            </div>
          </div>
        </div>
      </div>

      

{ProfileModal && (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block', widows:"800px" }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" onClick={() => setProfileModal(false)}></button>
          </div>
          <div className="modal-body">
            {/* Your modal body content (form, etc.) goes here */}
            <p>update profile</p>
            <div className='d-flex justify-content-between'>
            <input type="text" placeholder='username' className='border-none' onChange={(e)=>{
                Updateprofile(prev=>{return{...prev,username:e.target.value}})
            }}/>
            <input type="text" placeholder='email' onChange={(e)=>{
                Updateprofile(prev=>{return{...prev,email:e.target.value}})
            }}/>
            </div>
            <label>Profile Picture</label>
    <input type="file" className="form-control mb-3" onChange={(e) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.addEventListener("load", (e) => {
        Updateprofile(prev => {return{ ...prev, ProfilePicture:e.currentTarget.result }});
      });
    }} />
    
<div className="text-center mb-3">
      <img src={Updatedprofile.ProfilePicture} className="rounded-circle" style={{width: "150px", height: "150px", objectfit: "cover"}} alt="Profile" />
    </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setProfileModal(false)} 
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={()=>{
              // console.log(UserAddress);
              handelupdateprofile(UserData,Updatedprofile)
              setProfileModal(false)
            }}>Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  )}
    </div>

    
  )
}
