import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { randomizeNumber } from '../../store/point/PointSlicer';
import { fetchUserGamePoint } from '../../store/users/UserSlice';
import { getGameList, quitAndSaveDummy } from '../../store/games/GamesSlice';
import { toast } from 'react-toastify';

const Game = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
`;

const PlayButton = styled.button`
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const ResultLine = styled.h3`
  margin-top: 20px;
`;

const Submit = styled.button`
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const waiting = async (t) => new Promise((r) => setTimeout(r, t));

const Dummy = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const point = useSelector((state) => state.pointReducer);

  const auth = useSelector((state) => state.user);

  const [loading, setLoading] = useState('Quit and Save');

  useEffect(() => {
    if (auth.user?.uid) {
      dispatch(fetchUserGamePoint(auth.user?.uid));
      // dispatch(fetchUserGame(auth.user?.uid))
      // dispatch(fetchUserById(user.uid))
      // dispatch(fetchUserGame())
    }
  }, [auth.user?.uid, dispatch]);

  const handleClick = () => {
    dispatch(randomizeNumber());
  };

  const handleSaveGame = async () => {
    const href = location.href.split('/');
    const qstring = href[href.length - 1];

    const { name, playerId } = auth.data2;

    console.log(auth.data2);

    const data = {
      playerId,
      point: point.score,
      name,
      router,
      qstring,
    };

    setLoading('Processing...');
    await waiting(3000);

    try {
      dispatch(quitAndSaveDummy(data));
      dispatch(getGameList(playerId));
      toast.success('Saved Game!');
      setLoading('Redirecting');
      await waiting(1000);
      router.push('/games');
    } catch (err) {
      console.log(err);
    }

    // const { name } = auth.data.name
    // let playerId = auth.user.uid
    // dispatch(add_dummy_games({ playerId, point: point.score, name }))

    // router.push('/home')
  };

  return (
    <Game>
      <div className='col-md-3 col-sm-6 col-12'>
        <div className='info-box'>
          <span className='info-box-icon bg-danger'>
            <i className='fas fa-chalkboard-teacher'></i>
          </span>
          <div className='info-box-content'>
            <span className='info-box-text'>Score</span>
            <span className='info-box-number'>{point.score}</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      <PlayButton onClick={handleClick}>Randomize Number</PlayButton>
      <ResultLine>{point.score}</ResultLine>
      <Submit onClick={handleSaveGame}>{loading}</Submit>
    </Game>
  );
};

export default Dummy;
