import { useState } from 'react';

const MediaList = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');

  const changeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className='container mt-4'>
      <h3 className='display-4 text-center mb-4'>Upload Files</h3>

      <form>
        <div className='input-group'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={changeFile}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {fileName}
          </label>
        </div>
        <input
          type='submit'
          value='Upload File'
          className='btn btn-danger btn-block mt-4'
        ></input>
      </form>
    </div>
  );
};

export default MediaList;
