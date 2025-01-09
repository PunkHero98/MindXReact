import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {useState} from 'react';
function LoginForm ({handleLogin}) {
    const [usernameValue , setUsernameValue] = useState('');
    const [emailValue , setEmailValue] = useState('');
    const [passwordValue , setPasswordValue] = useState('');

    const users = [
        { username:'lam.huy', email:'lam.huy@gmail.com' , password: 'Pa55w0rd@' },
        { username:'le.anh', email: 'le.anh@gmail.com' , password: 'Pa55w0rd@' },
        { username:'nguyen.tran', email: 'nguyen.tran@gmail.com' , password: 'Pa55w0rd@' }
      ];
    const checkLogin = () =>{
        
        const newUser = users.filter( item => item.username === usernameValue)[0];
        if(newUser.password === passwordValue && emailValue === newUser.email ){
            handleLogin();
        return;
        }
    }

   
    const className = 'h-10 text-base mt-2 merriweather'
    return(
        <div className='flex justify-center items-center h-screen bg-stone-300 '>
            <div className="main py-6 bg-white h-2/3 w-1/3 border-2 rounded-xl border-stone-300 flex flex-col items-center justify-between">
                <div className="head mb-4 flex flex-col text-center gap-6 ">
                    <h1 className='text-4xl mt-10 pacifico text-[#1677ff]'>Work Management System</h1>
                </div>
                <form action="" className='w-full flex flex-col items-center mt-4 '>
                    <div className="w-full px-10">
                        <label htmlFor='usernameInput' className='text-base merriweather-bolder '>Username</label>
                        <Input id='usernameInput' value={usernameValue} onChange={(e)=>setUsernameValue(e.target.value)} className={className} />
                        <div className="notification mb-2"><span>---</span></div>
                    </div>
                    <div className="w-full px-10">
                        <label htmlFor='emailInput' className='text-base merriweather-bolder '>Email</label>
                        <Input id='emailInput' value={emailValue} onChange={(e)=>setEmailValue(e.target.value)} className={className} />
                        <div className="notification mb-2"><span>---</span></div>
                    </div>
                    <div className="w-full px-10">
                        <label htmlFor='passwordInput' className='text-base merriweather-bolder '>Password</label>
                        <Input.Password id='passwordInput' value={passwordValue} onChange={(e)=>setPasswordValue(e.target.value)} className={className} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                        <div className="notification mb-2"><span>---</span></div>
                    </div> 
                </form>
                <div className=" btn_container flex justify-between w-full px-10 mt-7">
                        <Button className='w-[43%] pacifico h-14 text-2xl' variant='outlined' color='primary' >Register</Button>
                        <Button className='w-[43%] h-14 pacifico text-2xl'variant='solid' color='purple' onClick={checkLogin} >Login</Button>
                    </div>
            </div>
        </div>
    )
}

export default LoginForm;