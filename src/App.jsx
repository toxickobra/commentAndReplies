import bgImage from './assets/bgImage.jpg'; // Ensure the correct path is used
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div
      className='h-screen bg-black w-full '
      style={{
        backgroundImage: `url(${bgImage})`, // Set the background image using inline styles
      }}
    > 

      <LandingPage/>
    
    </div>
  );
}

export default App;
