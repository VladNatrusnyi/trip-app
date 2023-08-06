export const TemperatureDisplay = ({temp}) => {
  return (
    <div style={{ textAlign: 'right', fontSize: '38px' }}>
      <span>{temp}</span>
      <sup
        style={{
          fontWeight: 'lighter',
          fontSize: '24px'
        }}
      >&deg;</sup>
      <span style={{
        verticalAlign: 'super',
        fontSize: '24px',
        fontWeight: 'lighter'
      }}>C</span>
    </div>
  );
};
