import  {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="" element={<NotFound />} />
  </Routes>
  </BrowserRouter>;
}

export default App;
