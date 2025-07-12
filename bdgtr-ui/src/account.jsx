import { useEffect, useState } from 'react';
import './react-styles/account.css';
import './react-styles/navigation.css';
import './react-styles/main.css';
import './react-styles/reset.css';
import './react-styles/responsive.css';

function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('bdgtrUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('bdgtrUser');
    window.location.href = 'index.html';
  };

  return (
    <div className="account-content">
      {/* Sidebar */}
      <div className="account-sidebar">
        <p id="hi-user" className="sidebar-greeting">
          Hi, {user?.firstName || 'User'}
        </p>
        <button className="sidebar-button active">My Profile</button>
        <button className="sidebar-button">Security & Privacy</button>
        <button className="sidebar-button">Notifications</button>
        <button className="sidebar-button logout" onClick={logout}>Log Out</button>
        <button onClick={() => (window.location.href = 'index.html')} className="back-button">← Back</button>
      </div>

      {/* Main Info */}
      <div className="account-main">
        <div className="info-card">
          <div className="card-header">
            <h3>Personal Information</h3>
            <button className="edit-button">Edit</button>
          </div>
          <div className="info-grid">
            <div>
              <label>First Name</label>
              <p>{user?.firstName || '-'}</p>
            </div>
            <div>
              <label>Last Name</label>
              <p>{user?.lastName || '-'}</p>
            </div>
            <div>
              <label>Email Address</label>
              <p>{user?.email || '-'}</p>
            </div>
            <div>
              <label>Country</label>
              <p className="placeholder">-</p>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="card-header">
            <h3>Your Information</h3>
            <button className="edit-button">Edit</button>
          </div>
          <div className="info-grid">
            <div>
              <label>Yearly Income</label>
              <p>{user?.yearlyIncome ? `$${user.yearlyIncome}` : '-'}</p>
            </div>
            <div>
              <label>Net Worth</label>
              <p>{user?.netWorth ? `$${user.netWorth}` : '-'}</p>
            </div>
            <div>
              <label>Total Debt</label>
              <p>{user?.totalDebt ? `$${user.totalDebt}` : '-'}</p>
            </div>
            <div>
              <label>Monthly Debt Payments</label>
              <p>{user?.monthlyPayments ? `$${user.monthlyPayments}` : '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
