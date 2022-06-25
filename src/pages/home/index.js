import React from 'react';
import Image from 'next/image';
import VideoUp from '@/src/components/media-components/VideoUp';

const Home = () => {
  return (
    <>
      <section
        className=''
        data-setbg='img/normal-breadcrumb.jpg'
        style={{
          backgroundImage: 'url("https://wallpapercave.com/wp/wp6404430.png")',
          height: '450px',
          opacity: '0.9',
        }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <div className='showcase-content'>
                <h2 className='text-uppercase'>Work Hard</h2>
                <h1 className='text-uppercase'>Play Harder</h1>
                <p>Best choice for gaming platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='container dark-mode'>
        <div className='row mt-3'>
          <div className='card-columns'>
            <div className='card'>
              <Image
                src='https://wallpapercave.com/uwp/uwp2030753.jpeg'
                width='100%'
                height='60%'
                layout='responsive'
                objectFit='contain'
                className='card-img-top p-1'
                alt='...'
              />
              <div className='card-body'>
                <h5 className='card-title'>
                  Card title that wraps to a new line
                </h5>
                <p className='card-text'>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
            <div className='card p-3'>
              <blockquote className='blockquote mb-0 card-body'>
                <p>A well-known quote, contained in a blockquote element.</p>
                <footer className='blockquote-footer'>
                  <small className='text-muted'>
                    Someone famous in{' '}
                    <cite title='Source Title'>Source Title</cite>
                  </small>
                </footer>
              </blockquote>
            </div>
            <div className='card'>
              <Image
                src='https://wallpapercave.com/dwp2x/wp9751182.jpg'
                width='100%'
                height='60%'
                layout='responsive'
                objectFit='contain'
                className='card-img-top p-1'
                alt='...'
              />
              <div className='card-body'>
                <h5 className='card-title'>Card title</h5>
                <p className='card-text'>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </p>
                <p className='card-text'>
                  <small className='text-muted'>Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
            <div className='card text-center'>
              <div className='card-body'>
                <h5 className='card-title'>Card title</h5>
                <p className='card-text'>
                  This card has a regular title and short paragraphy of text
                  below it.
                </p>
                <p className='card-text'>
                  <small className='text-muted'>Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
            <div className='card'>
              <Image
                src='https://wallpapercave.com/dwp2x/wp11041121.jpg'
                width='100%'
                height='150%'
                layout='responsive'
                objectFit='contain'
                className='card-img p-1'
                alt='...'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='container dark-mode'>
        <div className='row mt-3'>
          <div className='card-columns'>
            <div className='card'>
              {/* <Image
                src='https://wallpapercave.com/uwp/uwp2030753.jpeg'
                width='100%'
                height='60%'
                layout='responsive'
                objectFit='contain'
                className='card-img-top p-1'
                alt='...'
              /> */}
              <div className='card-body'>
                {/* < VideoUp/> */}
                <h5 className='card-title'>
                  Card title that wraps to a new line
                </h5>
                <p className='card-text'>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
