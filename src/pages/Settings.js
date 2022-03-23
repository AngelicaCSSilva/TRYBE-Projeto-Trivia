import React from 'react';

class Settings extends React.Component {
  componentDidMount() {
    document.title = 'Trivia - Configurações';
  }

  render() {
    return (
      <section>
        <h1 data-testid="settings-title">Tela de configuração</h1>
      </section>
    );
  }
}

export default Settings;
