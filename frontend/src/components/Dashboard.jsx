import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>Bem-vindo ao Dashboard</h1>
      <p>Gerencie sua conta e planos aqui.</p>
      <a href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=c50f409cb01e49b191d85530bbcd7e73" className="btn btn-primary">
        Assinar Plano Pro
      </a>
    </div>
  );
};

export default Dashboard;