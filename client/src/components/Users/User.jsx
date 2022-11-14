import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import route from '../../api/route';
import updateIcon from '../../assets/svg/pencil-square.svg';
import Button from 'react-bootstrap/Button';

const User = () => {
    const currentUser = JSON.parse(localStorage.getItem('autorized'));
    const navigate = useNavigate();

    const [login, setLogin] = useState();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [photo, setPhoto] = useState();
    const [roleId, setRoleId] = useState();
    const [role, setRole] = useState();
    const [selfProfile, setSelfProfile] = useState();
    const { search, pathname } = useLocation();
    const id = pathname.split('/');

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`/api/users/${id[2]}`);
            // console.log('user', response);
            setSelfProfile(currentUser.userId === +id[2] ? true : false)
            setLogin(response.data.values.result.login);
            setFullName(response.data.values.result.full_name);
            setEmail(response.data.values.result.email);
            setPhoto(response.data.values.result.photo);
            setRoleId(response.data.values.result.role_id);
            const role = await axios.get(`/api/roles/${response.data.values.result.role_id}`);
            setRole(role.data.values.result[0].title)
        }
        catch (e) {
            console.log(e)
            navigate('/500');
        }
    }
    useEffect(() => {
        if (currentUser.currentUser !== 'guest') {
            getUserInfo();
        }
    }, []);

    return (
        <>
            <div className="form-background p-5 d-flex justify-content-center">
                <section className='login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h2 className='m-2'>{login}</h2>
                        <p className='m-2 text-muted'>{role}</p>
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex flex-column align-items-center'>
                            <img src={photo && photo !== 'undefined' && photo !== undefined ? `${route.serverURL}/avatars/${photo}` : `${route.serverURL}/avatars/default_avatar.png`} className='link-header border border-secondary' height={100} width={100} alt='avatar' />
                            {selfProfile ? <Button variant='secondary w-50 m-2' onClick={() => navigate('/change-avatar')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></Button> : <></>}
                            
                        </div>
                        <div className='d-flex flex-column'>
                            <p>{fullName}</p>
                            <p>{email}</p>
                            {selfProfile ? <Button variant='secondary w-50 m-2' onClick={() => navigate('/change-profile')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></Button> : <></>}
                        </div>

                    </div>
                
                </section>
            </div>
        </>)
}

export default User;