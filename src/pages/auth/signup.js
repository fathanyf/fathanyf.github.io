import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { auth, db, storage } from '../../config/firebase';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (avatar == null) return;
      const imageRef = ref(storage, `images/${avatar.name}`);
      uploadBytes(imageRef, avatar).then((snapshot) => {
        let inputImage = '';
        getDownloadURL(snapshot.ref).then((url) => {
          inputImage = url;
          setDoc(doc(db, 'users', user.uid), {
            name,
            address: '',
            phone: '',
            avatar: inputImage,
            bio: '',
            playerId: user.uid,
            createdAt: serverTimestamp(),
          });
          setDoc(doc(db, 'gamepoint', user.uid), {
            totalpoint: 0,
            name,
            avatar: inputImage,
            playerId: user.uid,
            updatetAt: serverTimestamp(),
          });
        });
      });
      router.push('/auth/signin');
      toast.success('Sign Up successfully , please Sign in now !');
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <Head>
        <title>Chapter 10 | Sign Up </title>
      </Head>
      <section className='auth'>
        <div className='d-flex justify-content-center'>
          <div className='login-box mt-3 dark-mode'>
            <div className='card card-outline card-danger bg-transparent'>
              <div className='card-header text-center'>
                <Link href='/'>
                  <a className='h1'>
                    <b>
                      Chapter&nbsp;<span className='text-danger'>10</span>
                    </b>
                  </a>
                </Link>
              </div>
              <div className='card-body'>
                <p className='login-box-msg'>Sign up for free</p>
                <form onSubmit={handleSubmit}>
                  <div className='input-group mb-3'>
                    <input
                      type='text'
                      name='displayName'
                      onChange={(e) => setName(e.target.value)}
                      className='form-control'
                      placeholder='your name...'
                    />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <span className='fas fa-user' />
                      </div>
                    </div>
                  </div>
                  <div className='input-group mb-3'>
                    <input
                      type='email'
                      name='email'
                      onChange={(e) => setEmail(e.target.value)}
                      className='form-control'
                      placeholder='your email...'
                    />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <span className='fas fa-envelope' />
                      </div>
                    </div>
                  </div>
                  <div className='input-group mb-3'>
                    <input
                      type='password'
                      name='password'
                      onChange={(e) => setPassword(e.target.value)}
                      className='form-control'
                      placeholder='make your password...'
                    />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <span className='fas fa-lock' />
                      </div>
                    </div>
                  </div>
                  <div className='input-group mb-3'>
                    {/* <input type="text" name="avatar" onChange={(e) => setAvatar(e.target.value)} className="form-control" placeholder='your avatar image...' /> */}
                    <input
                      type='file'
                      className='form-control'
                      onChange={(e) => {
                        setAvatar(e.target.files[0]);
                      }}
                    />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <span className='fas fa-user' />
                      </div>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-danger btn-block'>
                    Sign Up
                  </button>
                </form>
                <div className='social-auth-links text-center mt-2 mb-3'>
                  <a href='#' className='btn btn-block btn-primary'>
                    <i className='fab fa-facebook mr-2' /> Sign up using
                    Facebook
                  </a>
                  <a href='#' className='btn btn-block btn-danger'>
                    <i className='fab fa-google-plus mr-2' /> Sign up using
                    Google+
                  </a>
                </div>
                <p className='mb-0'>
                  <Link href='/auth/signin'>
                    <a className='text-center'>I Already have membership</a>
                  </Link>
                </p>
                <Link href='/'>
                  <a>
                    back <i className='fas fa-arrow-circle-right mt-1'></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
