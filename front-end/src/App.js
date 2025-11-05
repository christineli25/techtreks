import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import ProfileCreation from './components/profile/ProfileCreation';
import Dashboard from './components/dashboard/Dashboard';
import ChoresManager from './components/chores/ChoresManager';
import GroceryList from './components/grocery/GroceryList';
import GroceryDetail from './components/grocery/GroceryDetail';
import PaymentsCalculator from './components/payments/PaymentsCalculator';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-profile" element={<ProfileCreation />} />
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/chores" element={<MainLayout><ChoresManager /></MainLayout>} />
          <Route path="/grocery" element={<MainLayout><GroceryList /></MainLayout>} />
          <Route path="/grocery/detail" element={<MainLayout><GroceryDetail /></MainLayout>} />
          <Route path="/payments" element={<MainLayout><PaymentsCalculator /></MainLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
