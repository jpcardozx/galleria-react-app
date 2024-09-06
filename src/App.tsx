import Header from './components/Header';
import Gallery from './components/Gallery';

const App = () => {
  const onStartSlideshow = () => {
    // A lógica do slideshow seria implementada aqui
    console.log('Slideshow started');
  };

  return (
    <div>
      <Header onStartSlideshow={onStartSlideshow} />
      <Gallery />
    </div>
  );
};

export default App;
