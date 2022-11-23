import kostya from '../../assets/about page/photo_2022-09-17_20-05-23.jpg';
import artem from '../../assets/about page/artem.jpg';
import dima from '../../assets/about page/dima.jpg';

const About = () => {
    return (
        <>
            <div className="form-background p-5 d-flex justify-content-around">
                <div id='kostya' className='c bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h1 className="text-center">Kostya</h1>
                    <img src={kostya} height={200} alt="kostya" />
                </div>
                <div id='artem' className=' bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h1 className="text-center">Artem</h1>
                    <img src={artem} height={200} alt="kostya" />
                </div>
                <div id='dima' className=' bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h1 className="text-center">Dima</h1>
                    <img src={dima} height={200} alt="kostya" />
                </div>

            </div>
        </>
    )
}


export default About;