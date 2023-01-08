import Encuesta from './components/Form';
import { Respuestas } from './components/Respuestas/Respuestas';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    
<Routes>
              <Route path='/' element={<Encuesta />} />
              <Route path='/respuestas' element={<Respuestas />} />
            </Routes>
    </BrowserRouter>
  
 
  );
}

export default App;
