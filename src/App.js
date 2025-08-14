import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

function Header() {
  return <h1>QuickBooks to NetSuite Data Utility</h1>;
}

function Dashboard() {
  // State to track connections
  const [quickBooksConnected, setQuickBooksConnected] = useState(false);
  const [netSuiteConnected, setNetSuiteConnected] = useState(false);

  // Mock function to simulate connecting
  const handleConnectQuickBooks = () => {
    // In a real app, this would trigger the OAuth flow
    setQuickBooksConnected(true);
  };

  const handleConnectNetSuite = () => {
    // In a real app, this would trigger the OAuth flow
    setNetSuiteConnected(true);
  };

  const bothConnected = quickBooksConnected && netSuiteConnected;

  return (
    <div className="dashboard">
      <div className="step">
        <h2>Step 1: Connect Your Accounts</h2>
        <ConnectButton
          isConnected={quickBooksConnected}
          onClick={handleConnectQuickBooks}
          serviceName="QuickBooks"
        />
        <ConnectButton
          isConnected={netSuiteConnected}
          onClick={handleConnectNetSuite}
          serviceName="NetSuite"
        />
      </div>

      <div className="step">
        <h2>Step 2: Map Accounts</h2>
        <StartMappingButton enabled={bothConnected} />
      </div>

      <div className="step">
        <h2>Step 3: Sync Data</h2>
        <GenerateCSVButton enabled={bothConnected} />
      </div>
    </div>
  );
}

function ConnectButton({ isConnected, onClick, serviceName }) {
  if (isConnected) {
    return (
      <button className="button-connected" disabled>
        &#10004; {serviceName} Connected
      </button>
    );
  }
  return <button onClick={onClick}>Connect to {serviceName}</button>;
}

function StartMappingButton({ enabled }) {
  const button = <button disabled={!enabled}>Start Mapping</button>;

  if (enabled) {
    return button;
  }

  return (
    <div className="tooltip">
      {button}
      <span className="tooltiptext">
        Please connect both QuickBooks and NetSuite accounts to enable mapping.
      </span>
    </div>
  );
}

function GenerateCSVButton({ enabled }) {
  const [downloadMessage, setDownloadMessage] = useState('');

  const handleGenerate = () => {
    // In a real app, this would trigger the data sync and CSV generation
    setDownloadMessage('Your NetSuite-ready CSV has been downloaded successfully!');
    // Hide the message after a few seconds
    setTimeout(() => setDownloadMessage(''), 5000);
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={!enabled}>
        Generate & Download CSV
      </button>
      {downloadMessage && <p>{downloadMessage}</p>}
    </div>
  );
}

export default App;
