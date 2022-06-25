import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { get_game_board } from '../../store/games/GamesSlice';
import moment from 'moment';
import { selectUser } from '../../store/users/UserSlice';
import Image from 'next/image';

const GameBoard = () => {
  const user = useSelector(selectUser);

  const gamesBoard = useSelector((state) => state.games.gamesBoard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_game_board());
  }, [dispatch]);

  return (
    <div className='card-body'>
      {gamesBoard.map((e, index) => {
        return (
          <div className='direct-chat-msg' key={index}>
            <div className='direct-chat-infos clearfix'>
              <span className='direct-chat-name float-left'>{e.name}</span>
              <span className='direct-chat-timestamp float-right'>
                {moment(e.createdAt.toDate()).fromNow()}
              </span>
            </div>
            {!e.avatar ? (
              <Image
                className='direct-chat-img'
                width='50%'
                height='50%'
                src='/blank-avatar.svg'
                alt='message user image'
              />
            ) : (
              <Image
                className='direct-chat-img'
                width='50%'
                height='50%'
                src={e.avatar}
                alt='message user image'
              />
            )}
            <div className='direct-chat-text'>
              <p className='text-center'>
                <i className='fas fa-gamepad'></i>:{' '}
                <span className='badge badge-secondary'> {e.playCount}</span>
                <i className='fas fa-thumbs-up ml-4'></i> :{' '}
                <span className='badge badge-success'>{e.userWin}</span>{' '}
                <i className='fas fa-handshake ml-4'></i> :{' '}
                <span className='badge badge-info'>{e.userDraw}</span>{' '}
                <i className='fas fa-thumbs-down ml-4'></i> :{' '}
                <span className='badge badge-danger'>{e.userLoss}</span>{' '}
                <i className='fas fa-award ml-4'></i> :{' '}
                <span className='badge badge-primary'>{e.point}</span>
              </p>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
