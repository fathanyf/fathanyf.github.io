import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getGameList } from '../../store/games/GamesSlice';
import Link from 'next/link';
import { totalReset } from '../../store/point/PointSlicer';
import Image from 'next/image';

const GameList = () => {
  const data = useSelector((state) => state.games.games);
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [playedGames, setPlayedGames] = useState(false);

  useEffect(() => {
    dispatch(getGameList(auth.user?.uid));
  }, [auth.user?.uid, dispatch]);

  return (
    <>
      <section className='feature-section spad'>
        <div className='container'>
          <div className='row'>
            {data.map((e) => {
              return (
                <div className='col-sm-4' key={e.id}>
                  <div
                    className='position-relative mb-5'
                    style={{ maxHeight: '250px', opacity: '0.8' }}
                  >
                    <Image
                      width='100%'
                      height='100%'
                      layout='responsive'
                      objectFit='contain'
                      src={e.imageUrl}
                      alt='Photo 3'
                      className='img-fluid img-games'
                    />
                  </div>
                  <div
                    className='text-block bg-dark p-2'
                    style={{ opacity: '0.7' }}
                  >
                    <h6 className='text-uppercase'>
                      {e.title} <small>({e.release})</small>
                    </h6>
                    <p>
                      {e.developer} | {e.genre}{' '}
                    </p>
                    <p>
                      <small>{e.description}</small>
                    </p>
                    {e.isPlayed ? (
                      <center>
                        <label>Played!</label>
                      </center>
                    ) : (
                      <center>
                        <label>Not Played!</label>
                      </center>
                    )}
                    <Link href={`/games/${e.link}`}>
                      <button
                        type='submit'
                        className='btn btn-danger btn-flat btn-block'
                        onClick={() => dispatch(totalReset())}
                      >
                        play now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
            {/* <div className="col-lg-3 col-md-6 p-0">
                            <div className="feature-item set-bg" data-setbg="/3.jpg" style={{ backgroundImage: 'url("/3.jpg")' }}>
                                <span className="cata new">strategy</span>
                                <div className="fi-content text-white">
                                    <h5><a href="#">Justo tempor, rutrum erat id, molestie</a></h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                    <a href="#" className="fi-comment">3 Comments</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 p-0">
                            <div className="feature-item set-bg" data-setbg="/3.jpg" style={{ backgroundImage: 'url("/3.jpg")' }}>
                                <span className="cata new">strategy</span>
                                <div className="fi-content text-white">
                                    <h5><a href="#">Justo tempor, rutrum erat id, molestie</a></h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                    <a href="#" className="fi-comment">3 Comments</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 p-0">
                            <div className="feature-item set-bg" data-setbg="/3.jpg" style={{ backgroundImage: 'url("/3.jpg")' }}>
                                <span className="cata new">strategy</span>
                                <div className="fi-content text-white">
                                    <h5><a href="#">Justo tempor, rutrum erat id, molestie</a></h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                    <a href="#" className="fi-comment">3 Comments</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 p-0">
                            <div className="feature-item set-bg" data-setbg="/3.jpg" style={{ backgroundImage: 'url("/3.jpg")' }}>
                                <span className="cata new">strategy</span>
                                <div className="fi-content text-white">
                                    <h5><a href="#">Justo tempor, rutrum erat id, molestie</a></h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                    <a href="#" className="fi-comment">3 Comments</a>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default GameList;
