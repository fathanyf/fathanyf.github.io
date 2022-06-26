import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
  getMetadata,
} from 'firebase/storage';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { storage } from '@/src/config/firebase';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import styled from 'styled-components';
import VideoUp from '@/src/components/media-components/VideoUp';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
`;

const Input = styled.input`
  background-color: whitesmoke;
  border: 1px solid black;
  padding: 7px;
  border-radius: 10px;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: #234f1e;
    color: white;
  }
`;

const UploadPercentage = styled.h4`
  margin-top: 20px;
`;

const UploadFiles = () => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState([]);

  const uploadHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);
    setFile(file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
        if (prog === 100 && !JSON.stringify(data).includes(file.name)) {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setData([...data, { url, name: file.name }]);
          });

          return;
        }
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url));
      }
    );
  };

  useEffect(() => {
    async function fetchData() {
      const res = await listAll(ref(storage, 'files/'));

      for (let i = 0; i < res.items.length; i++) {
        const { name } = res.items[i];
        const url = await getDownloadURL(res.items[i]);

        if (!JSON.stringify(data).includes(url)) {
          setData([...data, { url, name }]);
          break;
        }
      }
    }

    fetchData();
  }, [data]);

  return (
    <Container>
      <div>
        {/* <h3>tes</h3> */}
        < VideoUp />
      </div>
      <form onSubmit={uploadHandler}>
        <Input type='file' className='input' />
        <Button type='submit'>Upload File</Button>
      </form>

      <UploadPercentage>Uploaded {progress}%</UploadPercentage>
      {data === 0 ? (
        <h4>No Files Uploaded</h4>
      ) : (
        data.map((e) => {
          return (
            <div key={e + v4()}>
              <Link href={e.url}>
                <Button>{e.name}</Button>
              </Link>
            </div>
          );
        })
      )}
    </Container>
  );
};




export default UploadFiles;
