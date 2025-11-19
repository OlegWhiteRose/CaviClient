interface MeasurementFormProps {
  systolic: number;
  diastolic: number;
  pwv: number;
}

export const MeasurementForm = ({ systolic, diastolic, pwv }: MeasurementFormProps) => (
  <div className="form-section">
    <h2>Данные измерений</h2>
    <div className="measurement-form">
      <div className="form-group">
        <label>Скорость распространения пульсовой волны (м/с)</label>
        <input type="number" value={pwv} readOnly />
      </div>
      <div className="form-group">
        <label>Систолическое артериальное давление (мм рт. ст.)</label>
        <input type="number" value={systolic} readOnly />
      </div>
      <div className="form-group">
        <label>Диастолическое артериальное давление (мм рт. ст.)</label>
        <input type="number" value={diastolic} readOnly />
      </div>
    </div>
  </div>
);
