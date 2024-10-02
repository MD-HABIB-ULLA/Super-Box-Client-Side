import { useState } from 'react';

const Settings = () => {
  // Fake settings data
  const initialSettings = {
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    paymentGateways: {
      stripe: true,
      paypal: false,
      bankTransfer: true,
    },
    appearance: {
      theme: "Light",
      customLogo: null,
    },
    security: {
      twoFactorAuth: false,
      passwordReset: true,
    },
  };

  const [settings, setSettings] = useState(initialSettings);

  // Handlers for changing settings
  const handleNotificationChange = (type) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: !settings.notifications[type],
      },
    });
  };

  const handlePaymentGatewayChange = (gateway) => {
    setSettings({
      ...settings,
      paymentGateways: {
        ...settings.paymentGateways,
        [gateway]: !settings.paymentGateways[gateway],
      },
    });
  };

  const handleAppearanceChange = (e) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        theme: e.target.value,
      },
    });
  };

  const handleSecurityChange = (type) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [type]: !settings.security[type],
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Notifications */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="flex space-x-4">
          {Object.keys(settings.notifications).map((type) => (
            <div key={type} className="flex items-center">
              <label className="mr-2 capitalize">{type}:</label>
              <input
                type="checkbox"
                checked={settings.notifications[type]}
                onChange={() => handleNotificationChange(type)}
                className="toggle-checkbox"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment Gateways */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Gateways</h2>
        <div className="flex space-x-4">
          {Object.keys(settings.paymentGateways).map((gateway) => (
            <div key={gateway} className="flex items-center">
              <label className="mr-2 capitalize">{gateway}:</label>
              <input
                type="checkbox"
                checked={settings.paymentGateways[gateway]}
                onChange={() => handlePaymentGatewayChange(gateway)}
                className="toggle-checkbox"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <label className="mr-2">Theme:</label>
        <select
          value={settings.appearance.theme}
          onChange={handleAppearanceChange}
          className="px-3 py-2 border rounded-lg">
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </div>

      {/* Security */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="flex space-x-4">
          {Object.keys(settings.security).map((type) => (
            <div key={type} className="flex items-center">
              <label className="mr-2 capitalize">{type.replace(/([A-Z])/g, ' $1')}:</label>
              <input
                type="checkbox"
                checked={settings.security[type]}
                onChange={() => handleSecurityChange(type)}
                className="toggle-checkbox"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
